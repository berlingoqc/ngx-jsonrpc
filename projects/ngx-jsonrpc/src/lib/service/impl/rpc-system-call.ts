import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rpcimplement } from '../dec';

@Rpcimplement('system', 'system')
@Injectable()
export class RPCSystemCall {
  ListMethods(): Observable<string[]> {
    return null;
  }
  ListNotifications(): Observable<string[]> {
    return null;
  }
  ListNamespace(): Observable<string[]> {
    return null;
  }
}
