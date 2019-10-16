import { Injectable, Injector } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RPCClientSettings {
  static injector: Injector;

  url = 'localhost:3434';
  secure = false;
  password = false;

  getHttpURL(): string {
    return (this.secure ? 'https' : 'http') + '://' + this.url + '/jsonrpc';
  }
  getWsURL(): string {
    return (this.secure ? 'wss' : 'ws') + '://' + this.url + '/jsonrpc';
  }
}
