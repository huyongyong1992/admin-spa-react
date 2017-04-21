/* eslint-disable import/no-extraneous-dependencies */
import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../../common/js/fetch';
import { errorHandler } from '../../../common/js/util';

export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      total: 0,
      list: [],
      selectedRows: '',
      supCates: [],
      subCates: [],
      subChangeCates: [],
    };
  },

  onListSubjects(params, fcb, scb) {
    fetch.mtop.order.business.listSubjects(params).then((data) => {
      this.state.list = data.list; 
      this.state.total = data.page.totalCount;
      this.trigger(this.state);
      if (scb) scb();
    }).catch(errorHandler);
  },

  onChangeCate(params, scb) {
    fetch.mtop.order.business.changeCate(params).then((data) => {
      if (scb) scb();
      this.state.changeCate = data;
      this.trigger(this.state);
      
    }).catch(errorHandler);
  },

  onSysCates(params, type, fcb, scb) {
    fetch.mtop.cat.sysCates(params).then((data) => {
      if(type === 'subCates') {
        this.state.subCates = data;
      }else if(type === 'supCates') {
        this.state.supCates = data;
      }else if(type === "subChangeCates") {
        this.state.subChangeCates = data;
        console.log(this.state.subChangeCates)
      }
      // this.state[type] = data;
      this.trigger(this.state);
      if (scb) scb();
    }).catch(errorHandler);
  },

  onCheckSubject(params, fcb, scb) {
    fetch.mtop.order.business.checkSubject(params).then(() => {
      if (scb) scb();
    }).catch(errorHandler);
  },

  onBatchCheckSubject(params, fcb, scb) {
    fetch.mtop.order.business.batchCheckSubject(params).then(() => {
      this.state.selectedRows = '';
      this.trigger(this.state);
      if (scb) scb();
    }).catch(errorHandler);
  },

  onFreezeUser(params, fcb, scb) {
    fetch.mtop.user.freezeUser(params).then(() => {
      if (scb) scb();
    }).catch(errorHandler);
  },
});
