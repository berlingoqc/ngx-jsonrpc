import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RPCCall } from './rpc-call';
import { RPCClientSettings } from './jsonrpc-settings';
import { map } from 'rxjs/operators';

@Injectable()
export class RPCClient {
  namespace: string;

  headers = new HttpHeaders();

  lastCall: RPCCall;
  lastOutput: RPCCall;

  constructor(private http: HttpClient, public settings: RPCClientSettings) {
    this.SetNamespace('system');
  }

  SetNamespace(ns: string) {
    this.namespace = ns;
    this.headers = new HttpHeaders({ 'X-dm-namespace': ns });
  }

  ExecuteCall(method: string, arg: any): Observable<any> {
    const rpcCall = {
      jsonrpc: '2.0',
      id: 'qwer',
      method,
      params: arg
    } as RPCCall;
    this.lastCall = rpcCall;
    console.log(this.lastCall);
    return this.http.post<RPCCall>(this.getRPCEndpoint(), rpcCall, { headers: this.headers }).pipe(
      map(x => {
        if (x.error) {
          throw new Error(JSON.stringify(x.error));
        }
        return x.result;
      })
    );
  }

  private getRPCEndpoint(): string {
    return this.settings.getHttpURL();
  }
}
