export class Robot {
    ip: string;
    bridge?: string;
    name?: string;
    img?: string;
  
    setData(data:any) {
      this.setBridge(data);
      this.name = data.name;
      this.img = data.img || '/assets/dotbot.jpg';
    }
  
    private setBridge(data: any) {
      if (data.bridge) {
        this.bridge = data.bridge.replace('*', this.ip);
      }
    }
  }
  