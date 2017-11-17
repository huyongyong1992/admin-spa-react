// const urls = {
//   development: '',
//   dev: 'ws://api.m-internal.s-ant.cn/websocket',
//   stable: 'ws://api.m-internal.microants.com.cn/websocket',
//   online: 'wss://api.m.microants.cn/websocket',
// };
// const localStorage = window.localStorage;
// const mat = localStorage.getItem('mat');

// class Socket {
//   constructor() {
//     this.timer = 0;
//     this.maxTryTimes = 5;
//     this.token = '';
//   }

//   init(token) {
//     if (!token) {
//       console.log('websocket 无法初始化，因为token为空');
//       return;
//     };

//     if (this.socket) {
//       if (this.token === token) return;

//       this.send({
//         token,
//       });
//       return;
//     } 

//     this.token = token;
//     const socket = this.socket = new WebSocket(urls[process.env.NODE_ENV]);
//     console.log(socket);
//     socket.addEventListener('open', (event) => {
//       console.log('websocket open');
//       console.log(event);
//       this.timer = 0;
//       this.send({
//         token,
//       });
//     });

//     socket.addEventListener('error', (e) => {
//       console.log('websocket error');
//       console.log(e);
//       if (this.socket) {
//         this.tryagain();
//       }
//     });

//     socket.addEventListener('close', (e) => {
//       console.log('websocket close');
//       console.log(e);
//       if (this.socket) {
//         this.tryagain();
//       }
//     });
//   }

//   addEventListener(e, fn) {
//     if (this.socket) {
//       this.socket.addEventListener(e, fn);
//     } else {
//       console.log('socket无法添加事件监听器，因为还未初始化');
//     }
//   }
  
  tryagain() {
    this.close(); 
    if (this.timer > this.maxTryTimes) return;
    this.timer += 1;
    this.init(this.token);
  }

  send(msg) {
    const socket = this.socket;
    if (socket) {
      this.socket.send(JSON.stringify(msg));
    } else {
      console.log('socket not init yet');
    }
  }

  close() {
    if (this.socket) {
      let socket = this.socket;
      this.socket = null;
      socket.close();
      socket = null;
    }
  }
}

const sc = new Socket();

if (mat) {
  sc.init(mat);
}

export default sc;
