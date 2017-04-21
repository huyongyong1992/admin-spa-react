/* eslint-disable import/no-extraneous-dependencies */
import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../common/js/fetch';
import { errorHandler } from '../../common/js/util';
import { message } from 'antd';
export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      inputNo:'',
      btnState:false,
      data:{},
    };
  },

  onGetSceneQrUrl(params,scb) {
    fetch.mtop.qr.getSceneQrUrl(params).then((data) => {
      if (scb) scb(); 
      this.state.data = data;
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onInputChange(value) {
    this.state.inputNo = value;
    this.trigger(this.state);
  },
  onClicked() {
    const reg = /^3\d{3}$/
    if(!reg.test(this.state.inputNo)) {
      message.error("请输入正确的数字");
      return ;
    }
    this.state.btnState = !this.state.btnState;
    this.onGetSceneQrUrl({
      data:{
        type:0,
        sceneId:this.state.inputNo,
      }
    })
    this.trigger(this.state)
  }
});
