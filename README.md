# NgxJsonrpc

This is a client for jsonrpc using HttpClient and WebSocket only.


### Create jsonrpc client with decorator

```
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
```


