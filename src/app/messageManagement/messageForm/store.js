/* eslint-disable import/no-extraneous-dependencies */
import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../../common/js/fetch';
import { errorHandler } from '../../../common/js/util';

export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      data: {},
      checked:false,
      filter:{
        push:'',
        pushStatus:'',
        title:'',
        image:'',
        abbr:'',
        url:'',
        pushTitle:'',
        pushAbbr:'',
        pushDate:'',
        image:'',
        type:2,
      }
    };
  },
  onSaveAndUpdateMsg(params,scb) {
    if (scb){
      scb()
    } 
    fetch.mtop.mc.saveAndUpdateMsg(params).then((data) => {
      history.go(-1)
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onGetMsgById(params) {
    fetch.mtop.mc.getMsgById(params).then((data) => {
      this.state.checked = data.pushAbbr ? true : false ;
      this.state.data = data;
      this.state.filter.title = data.title;
      this.state.filter.url = data.url;
      this.state.filter.pushStatus = data.pushStatus;
      this.state.filter.image = data.image;
      this.state.filter.push = data.push;
      this.state.filter.pushDate = data.pushDate;
      this.state.filter.abbr = data.abbr;
      this.state.filter.pushTitle = data.pushTitle;
      this.state.filter.pushAbbr = data.pushAbbr;
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onImageSelected(imageUrl){
    this.state.filter.image = imageUrl;
    this.trigger(this.state);
  },
  onSwitchChange(checked){
    this.state.checked = checked;
    this.state.filter.pushTitle = (checked ? this.state.filter.pushTitle : '');
    this.state.filter.pushAbbr = (checked ? this.state.filter.pushAbbr : '');
    this.trigger(this.state);
  },

   onRadioChange(value) {
    if(value =="1") {
      this.state.filter.pushDate = '';
    }
    this.state.filter.push = value;
    this.trigger(this.state);
  },
});
