declare module "react-native-ssdp" {
  export class Client {
    constructor(options?: any);
    search(serviceType: string): void;
    stop(): void;
    on(event: "response", callback: (headers: any, statusCode: number, rinfo: any) => void): void;
  }
}
