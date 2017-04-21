import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../../common/js/fetch';
import { errorHandler } from '../../../common/js/util';
import getQuery from '../../../common/js/getQuery'
export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      data: {},
      checked: false,
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
        type:4,
      }
    };
  },
  onGetMsgById(params) {
    fetch.mtop.mc.getMsgById(params).then((data) => {
      // const id = params.data.msgId;
      this.state.checked = data.pushAbbr ? true : false ;
      this.state.data = data;
      this.state.filter.title = data.title;
      this.state.filter.url = data.url;
      this.state.filter.image = data.image;
      this.state.filter.abbr = data.abbr;
      this.state.filter.push = data.push;
      this.state.filter.pushDate = data.pushDate;
      this.state.filter.pushTitle = data.pushTitle;
      this.state.filter.pushAbbr = data.pushAbbr;
      this.state.filter.pushStatus = data.pushStatus;
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onSaveAndUpdateMsg(params,scb,fcb) {
    if (scb) scb()
    fetch.mtop.mc.saveAndUpdateMsg(params).then((data) => {
      history.go(-1);
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onImageSelected(image){
    this.state.filter.image = image;
    this.trigger(this.state);
  },
  onRadioChange(value) {
    if(value =="1") {
      this.state.filter.pushDate = '';
    }
    this.state.filter.push = value;
    this.trigger(this.state);
  },
  onSwitchChange(checked){
    this.state.checked = checked;
    this.state.filter.pushTitle = (checked ? this.state.filter.pushTitle : '');
    this.state.filter.pushAbbr = (checked ? this.state.filter.pushAbbr : '');
    this.trigger(this.state);
  }
});
