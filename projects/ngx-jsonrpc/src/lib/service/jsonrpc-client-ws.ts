import { Subject, Subscription } from 'rxjs';

import { Injectable } from '@angular/core';
import { RPCCall } from './rpc-call';
import { RPCClientSettings } from './jsonrpc-settings';
import { webSocket } from 'rxjs/webSocket';

export interface WSRPCMsg {
  domain: string;
  data: RPCCall;
}

@Injectable({
  providedIn: 'root'
})
export class RPCClientSocket {
  private subscription: Subscription;

  private subjects = new Map<string, Subject<any>>();
  private domainSubject = new Map<string, Subject<RPCCall>>();
  private allSubject = new Subject<WSRPCMsg>();

  connected = false;

  constructor(public settings: RPCClientSettings) {}

  init() {
    console.log(this.settings.getWsURL());
    const sub = webSocket<WSRPCMsg>(this.settings.getWsURL());
    this.subscription = sub.subscribe(
      d => this.handler(d),
      e => this.handlerError(e)
    );
  }

  getEventSubject(ressource: string): Subject<any> {
    let data = this.subjects.get(ressource);
    if (data === undefined) {
      data = new Subject();
      this.subjects.set(ressource, data);
    }
    return data;
  }

  getDomainSubject(domain: string): Subject<RPCCall> {
    let data = this.domainSubject.get(domain);
    if (data === undefined) {
      data = new Subject();
      this.subjects.set(domain, data);
    }
    return data;
  }

  getAllSubject(): Subject<WSRPCMsg> {
    return null;
  }

  private getSubject(
    map: Map<string, Subject<any>>,
    key: string
  ): Subject<any> {
    let data = map.get(key);
    if (data === undefined) {
      data = new Subject();
      map.set(key, data);
    }
    return data;
  }

  private handler(message: WSRPCMsg) {
    this.connected = true;
    this.sendRessource(message);
    this.sendDomain(message);
    this.sendAll(message);
  }

  private sendRessource(message: WSRPCMsg) {
    const ressource = message.domain + '.' + message.data.method;
    const subject = this.subjects.get(ressource);
    if (subject !== undefined) {
      this.sendRPCCall(subject, message.data);
    }
  }
  private sendDomain(msg: WSRPCMsg) {
    const subject = this.subjects.get(msg.domain);
    if (subject !== undefined) {
      subject.next(msg.data);
    }
  }
  private sendAll(msg: WSRPCMsg) {
    this.allSubject.next(msg);
  }

  private sendRPCCall(subject: Subject<any>, call: RPCCall) {
    if (call.error !== null) {
      subject.next(call.error);
      return;
    }
    if (call.result.length > 0) {
      subject.next(call.result[0]);
    }
  }

  private handlerError(error: any) {
    this.connected = false;
  }
}
