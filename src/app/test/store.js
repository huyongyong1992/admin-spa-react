/* eslint-disable import/no-extraneous-dependencies */
import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../common/js/fetch';
import { errorHandler } from '../../common/js/util';
export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      data: [],
      total: 0,
      inputVal:'',
      textareaVal:'',
      dota:'bannong',
      list:{} ,
      dataa:[],
      datab:[],
      datac:[],
    };
  },

  onGetInfoTest(params,scb) {
    fetch.mtop.external.test.getInfoTest(params).then((data) => {
      if (scb) scb(); 
      this.state.list = data;
      this.trigger(this.state);
    }).catch(errorHandler);
  },

  onGetInfoTestData(params,type,scb) {
    fetch.mtop.external.test.getInfoTestData(params).then((data) => {
      // this.state.data= data;
      if (scb) scb();
      if(type=="2"){
        this.state.dataa= data;
      }else if(type=="3") {
        this.state.datab = data.interfaceList;
      }else if(type=="4") {
        this.state.datac = data;
      }else{
        this.state.data = data;
      }
     
      this.trigger(this.state);
    }).catch(errorHandler);
  },

  onInputChange(value) {
    this.state.inputVal = value;
    this.trigger(this.state);
  },
  onTextChange(value) {
    this.state.textareaVal = value;
    this.trigger(this.state);
  },
  onClear() {
    this.state.inputVal = '';
    this.state.textareaVal = '';
    this.state.list = '';
    this.trigger(this.state);
  },

  onFirstChange(type,code) {

    this.onGetInfoTestData({
      data:{
        dota:"bannong",
        code:code,
        type:type,
      }
      
    },"2")
  },

  onSecondChange(type,code) {
    this.onGetInfoTestData({
      data:{
        dota:"bannong",
        code:code,
        type:type,
      }
    },"3")
  },
  onThirdChange(type,code) {
    this.state.$test_api_ = code
    this.onGetInfoTestData({
      data:{
        dota:"bannong",
        code:code,
        type:type,
      }
     
    },"4")
  }
});
