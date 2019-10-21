import { NgModule, Injector } from '@angular/core';
import { RPCClient } from './service/jsonrpc-client';
import { RPCClientSocket } from './service/jsonrpc-client-ws';
import { RPCClientSettings} from './service/jsonrpc-settings';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [RPCClient, RPCClientSocket, RPCClientSettings ]
})
export class NgxJsonrpcModule {

    constructor(injector: Injector) {
        RPCClientSettings.injector = injector;
    }
}
