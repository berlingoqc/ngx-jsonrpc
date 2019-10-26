import { RPCClient } from './jsonrpc-client';
import { RPCClientSettings } from './jsonrpc-settings';
import { RPCClientSocket } from './jsonrpc-client-ws';
import { getAllMethods } from './utility-reflection';

export function Rpcimplement(namespace: string, subnamespace: string, noEmptyArray = true) {
  return cls => {
    const methods = getAllMethods(cls.prototype) as string[];
    methods.forEach(value => {
      console.log('DEFINING ', value);
      Object.defineProperty(cls.prototype, value, {
        value(...arg: any[]) {
          const client = RPCClientSettings.injector.get(RPCClient);
          if (arg.length === 1) {
            console.log('1 size item');
            arg = arg[0];
          }
          client.SetNamespace(namespace);
          return client.ExecuteCall(subnamespace + '.' + value, arg);
        }
      });
    });
  };
}

export function WSRPC(namespace: string, subnamespace: string) {
  return cls => {
    const methods = getAllMethods(cls.prototype) as string[];
    let client = null;
    methods.forEach(value => {
      Object.defineProperty(cls.prototype, value, {
        value() {
          if (client === null) {
            client = RPCClientSettings.injector.get(RPCClientSocket);
          }
          return client.getEventSubject(
            namespace + '.' + subnamespace + '.' + value
          );
        }
      });
    });
  };
}
