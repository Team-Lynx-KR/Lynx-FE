import { useEffect, useRef } from 'react';
import WebSocketClient from '../utils/websocket';

export const useWebSocket = (url: string) => {
  const wsClientRef = useRef<WebSocketClient | null>(null);

  useEffect(() => {
    const client = new WebSocketClient(url);
    wsClientRef.current = client;

    client.connect().catch(console.error);

    return () => {
      client.disconnect();
    };
  }, [url]);

  const send = (type: string, payload: any) => {
    wsClientRef.current?.send(type, payload);
  };

  const on = (type: string, handler: (data: any) => void) => {
    wsClientRef.current?.on(type, handler);
  };

  const off = (type: string, handler: (data: any) => void) => {
    wsClientRef.current?.off(type, handler);
  };

  return { send, on, off };
};

