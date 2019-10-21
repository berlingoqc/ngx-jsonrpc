import { NgModule, Injector } from '@angular/core';
import { RPCClient, RPCClientSocket, RPCClientSettings } from './service';

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
