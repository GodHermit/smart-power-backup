declare module 'wifi' {
  interface ConnectInfo {
    ssid: string;
    bssid: string;
  }

  export class WiFi {
    reset(callback: (err: Error) => void): void;

    scan(
      callback: (
        err: Error,
        scanResults: {
          security: string;
          ssid: string;
          rssi: number;
          bssid: string;
          channel: number;
        }[]
      ) => void
    ): void;

    connect(
      connectInfo: {
        ssid: string;
        password: string;
        bssid?: string;
        security?: string;
        enforce?: boolean;
      },
      callback: (err: Error, connectInfo: ConnectInfo) => void
    ): void;

    connect(callback: (err: Error, connectInfo: ConnectInfo) => void): void;

    disconnect(callback: (err: Error) => void): void;

    getConnection(callback: (err: Error, connInfo: ConnectInfo) => void): void;
  }
}
