import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RPCCall } from './rpc-call';
import { RPCClientSettings } from './jsonrpc-settings';

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

  ExecuteCall(method: string, args: any[]): Observable<any> {
    const rpcCall = {
      jsonrpc: '2.0',
      id: 'qwer',
      method,
      params: args == null || args === undefined ? [] : args
    } as RPCCall;
    this.lastCall = rpcCall;
    return this.http.post<RPCCall>(this.getRPCEndpoint(), rpcCall, { headers: this.headers }).pipe(
      map(x => {
        if (x.error != null || x.error !== undefined) {
          console.log('THERE IS AN ERROR ', x.error);
          throw new Error(x.error);
        }
        return x.result;
      })
    );
  }

  private getRPCEndpoint(): string {
    return this.settings.getHttpURL();
  }
}
