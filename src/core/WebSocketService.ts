import Logger from "~/utils/Logger";

class WebSocketService {
  private _token: string | undefined;
  private _webSocket: WebSocket | undefined;

  private _onOpenListeners: Map<string, (e: Event) => void> = new Map();
  private _onOpen(event: Event): void {
    Logger.info('WebSocket Service doing onOpen');
    this._onOpenListeners.forEach((listener, _) => {
      listener(event);
    })
  }

  private _onMessageListeners: Map<string, (e: MessageEvent) => void> = new Map();
  private _onMessage(event: MessageEvent): void {
    this._onOpenListeners.forEach((listener, _) => {
      listener(event);
    })
  }

  private _onErrorListeners: Map<string, (e: Event) => void> = new Map();
  private _onError(event: Event): void {
    this._onErrorListeners.forEach((listener, _) => {
      listener(event);
    })
  }

  private _onCloseListeners: Map<string, (e: CloseEvent) => void> = new Map();
  private _onClose(event: CloseEvent): void {
    this._onCloseListeners.forEach((listener, _) => {
      listener(event);
    })
  }


  public addOnOpenListener(
    key: string,
    listener: (e: Event) => void,
  ): void {
    this._onOpenListeners.set(key, listener);
  }
  public removeOnOpenListener(key: string): void {
    this._onOpenListeners.delete(key);
  }

  public addOnMessageListener(
    key: string,
    listener: (e: MessageEvent) => void,
  ) {
    this._onMessageListeners.set(key, listener);
  }
  public removeOnMessageListener(key: string): void {
    this._onMessageListeners.delete(key);
  }

  public addOnCloseListener(
    key: string,
    listener: (e: CloseEvent) => void,
  ) {
    this._onCloseListeners.set(key, listener);
  }
  public removeOnCloseListener(key: string): void {
    this._onCloseListeners.delete(key);
  }

  public addOnErrorListener(
    key: string,
    listener: (e: Event) => void,
  ) {
    this._onErrorListeners.set(key, listener);
  }
  public removeOnErrorListener(key: string): void {
    this._onErrorListeners.delete(key);
  }


  public setToken(token: string) {
    this._token = token;
  }

  public connect(token: string = this._token!) {
    Logger.info(`connecting to WebSocket with token : ${token}`);
    if (!this._token) {
      this._token = token;
    }
    if (this._webSocket) {
      this.close()
    }

    this._webSocket = new WebSocket(`ws://${location.host}?token=${token}`)

    this._webSocket.addEventListener("open", this._onOpen.bind(this))
    this._webSocket.addEventListener("message", this._onMessage.bind(this))
    this._webSocket.addEventListener("close", this._onClose.bind(this))
    this._webSocket.addEventListener("error", this._onError.bind(this))
  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    this._webSocket?.send(data)
  }

  get readyState(): number | undefined {
    return this._webSocket?.readyState;
  }

  get url(): string | undefined {
    return this._webSocket?.url
  }

  public close(): void {
    Logger.info('Closing WebSocket');
    this._webSocket?.close();
    this._webSocket = undefined;
  }
}

export default WebSocketService
