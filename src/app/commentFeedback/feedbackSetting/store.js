/* eslint-disable import/no-extraneous-dependencies */
import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../../common/js/fetch';
import { message } from 'antd';
import { errorHandler } from '../../../common/js/util';

export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      buyData:[],
      sellData: [],
      
    };
  },
  onLoadlabels(params,scb,fcb) {
    fetch.mtop.order.business.loadlabels(params).then((data) => {
      if(scb) scb();
      if(params.data.roletype=="2"){
        this.state.buyData = data;
        console.log(this.state.buyData)
      }
      if(params.data.roletype=="4"){
        this.state.sellData = data; 
        console.log(this.state.sellData)
      }
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onLabelmgr(params,scb,fcb) {
    fetch.mtop.order.business.labelmgr(params).then((data) => {
      if(scb) scb();
      this.trigger(this.state)
    }).catch(errorHandler);
  },
  // 添加标签
  onManageLabel(optype,roletype,cont) {
    
    // 限制标签个数
    if((roletype=="2") && (this.state.buyData.length >=6)) {
      message.error("最多添加6个标签");
      return ;
    }
    if((roletype=="4") && (this.state.sellData.length >=6)) {
      message.error("最多添加6个标签");
      return ;
    }
    this.onLabelmgr({
      data:{
        optype:optype,
        roletype:roletype,
        content:cont,
      }
    },() => {
      // 更新标签列表
      this.onLoadlabels({
        data:{
          roletype:roletype
        }
      })
    })
    
  },
});
