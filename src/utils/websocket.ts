/* eslint-disable @typescript-eslint/no-explicit-any */
type WebSocketMessageHandler = (data: any) => void;
type WebSocketRawMessageHandler = (data: any) => void;

class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private handlers: Map<string, WebSocketMessageHandler[]> = new Map();
  private rawMessageHandlers: WebSocketRawMessageHandler[] = [];
  private messageLog: Array<{ timestamp: Date; data: any }> = [];
  private maxLogSize = 1000; // 최대 로그 개수

  constructor(url: string) {
    this.url = url;
  }

  connect(approvalKey?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // KIS WebSocket URL에 approval key가 포함되어야 할 수 있음
        const wsUrl = approvalKey ? `${this.url}?approval_key=${approvalKey}` : this.url;
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          console.log('[WebSocket] 연결됨:', wsUrl);
          this.reconnectAttempts = 0;

          // KIS WebSocket은 URL 파라미터로 approval_key를 전달하므로
          // 별도의 인증 메시지는 필요 없을 수 있음
          // 필요시 구독 메시지에서 approval_key를 포함하여 전송
          // if (approvalKey) {
          //   this.sendAuthMessage(approvalKey);
          // }

          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const timestamp = new Date();
            let data: any;

            // 텍스트 데이터인 경우 JSON 파싱 시도
            if (typeof event.data === 'string') {
              data = JSON.parse(event.data);
            } else {
              data = event.data;
            }

            // 원시 메시지 로그 추가
            this.addToLog(timestamp, data);

            // 모든 원시 메시지 핸들러 호출
            this.rawMessageHandlers.forEach((handler) => handler(data));

            // 타입 기반 핸들러 처리 (KIS WebSocket 프로토콜에 맞게)
            if (data.tr_id || data.tr_cd) {
              // KIS WebSocket 응답 형식: tr_id 또는 tr_cd로 구분
              const trId = data.tr_id || data.tr_cd;
              const handlers = this.handlers.get(trId) || [];
              handlers.forEach((handler) => handler(data));
            } else if (data.type) {
              // 커스텀 프로토콜 형식
              const handlers = this.handlers.get(data.type) || [];
              handlers.forEach((handler) => handler(data.payload || data));
            } else {
              // 전체 메시지 핸들러에 전달
              const handlers = this.handlers.get('*') || [];
              handlers.forEach((handler) => handler(data));
            }
          } catch (error) {
            console.error('[WebSocket] 메시지 파싱 실패:', error, event.data);
            // 파싱 실패해도 로그에는 기록
            this.addToLog(new Date(), { raw: event.data, error: String(error) });
          }
        };

        this.ws.onerror = (error) => {
          console.error('[WebSocket] 에러:', error);
          reject(error);
        };

        this.ws.onclose = (event) => {
          console.log('[WebSocket] 연결 종료:', {
            code: event.code,
            reason: event.reason,
            wasClean: event.wasClean,
          });
          this.attemptReconnect();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  private sendAuthMessage(approvalKey: string) {
    // KIS WebSocket 인증 메시지 형식에 맞게 전송
    // 실제 프로토콜에 맞게 조정 필요
    const authMessage = {
      header: {
        approval_key: approvalKey,
        custtype: 'P',
        tr_type: '1',
        'content-type': 'utf-8',
      },
      body: {
        input: {
          tr_id: '',
          tr_key: '',
        },
      },
    };

    this.sendRaw(JSON.stringify(authMessage));
  }

  private addToLog(timestamp: Date, data: any) {
    this.messageLog.push({ timestamp, data });

    // 최대 개수 초과 시 오래된 로그 삭제
    if (this.messageLog.length > this.maxLogSize) {
      this.messageLog.shift();
    }
  }

  getMessageLog(): Array<{ timestamp: Date; data: any }> {
    return [...this.messageLog];
  }

  clearLog() {
    this.messageLog = [];
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(
          `[WebSocket] 재연결 시도 (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
        );
        this.connect().catch(console.error);
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  send(type: string, payload: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('[WebSocket] 연결되지 않음');
    }
  }

  sendRaw(message: string | ArrayBuffer | Blob) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.warn('[WebSocket] 연결되지 않음');
    }
  }

  // KIS WebSocket 형식으로 메시지 전송
  sendKISMessage(trId: string, trKey: string, approvalKey?: string) {
    const message = {
      header: {
        approval_key: approvalKey || '',
        custtype: 'P',
        tr_type: '1',
        'content-type': 'utf-8',
      },
      body: {
        input: {
          tr_id: trId,
          tr_key: trKey,
        },
      },
    };

    this.sendRaw(JSON.stringify(message));
  }

  on(type: string, handler: WebSocketMessageHandler) {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, []);
    }
    this.handlers.get(type)!.push(handler);
  }

  off(type: string, handler: WebSocketMessageHandler) {
    const handlers = this.handlers.get(type);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  // 원시 메시지 핸들러 추가 (모든 메시지)
  onRawMessage(handler: WebSocketRawMessageHandler) {
    this.rawMessageHandlers.push(handler);
  }

  // 원시 메시지 핸들러 제거
  offRawMessage(handler: WebSocketRawMessageHandler) {
    const index = this.rawMessageHandlers.indexOf(handler);
    if (index > -1) {
      this.rawMessageHandlers.splice(index, 1);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.handlers.clear();
    this.rawMessageHandlers = [];
  }

  getReadyState(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED;
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export default WebSocketClient;
