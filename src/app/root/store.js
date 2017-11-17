/* eslint-disable import/no-extraneous-dependencies */
import Reflux from 'reflux';
import Actions from './Actions';
import { errorHandler } from '../../common/js/util';
import fetch from '../../common/js/fetch';
import {message} from 'antd';

// import socket from '../../common/js/msgsocket';
export default Reflux.createStore({
  listenables: Actions,
  init() {
    this.state = {
      data: [],
      id:'',
      iconUrl:'',
      nickname:'',
      idConnected:false,
    };
    /*
    const websocket = new WebSocket("ws://api.m-internal.s-ant.cn/websocket");
    websocket.onopen = this.onOpen();
    websocket.onmessage = this.onMessage();
    websocket.onclose = this.onClose();
    websocket.onerror = this.onError();
    */
  },
  
    
 
//   onOpen(evt) {
//     tihs.state.isConnected = true;
//     // console.log(evt);
//     //发送token
//     const token = localStorage.getItem('mat');
//  //   websoket.send(data:{})
//   },
//   onMessage(evt) {
//     console.log(evt);
//   },
//   onClose(evt) {
//     message.error("已经断开连接");
//     this.state.isConnected = false;
//   },
//   onError(evt) {
//     message("连接异常,正尝试重新连接");
//     this.state.isConnected = false;
//   },
  // if(!this.state.isConnected) {
  //   this.onWebsocket();  //断线重连
  // },

  onLogout(params) {
    fetch.mtop.admin.logout(params).then((data) => {
      socket.close();
      window.location.href = '/admin/';
      this.trigger(this.state);  
    }).catch(errorHandler);
  }
});
