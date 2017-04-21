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
      supCates: [],
      subCates: [],
    };
  },

  onListSubjects(params, fcb, scb) {
    fetch.mtop.order.business.listSubjects(params).then((data) => {
      data = data || {};
      this.state.list = data.list || [];
      this.state.total = data.page.totalCount;
      this.trigger(this.state);
      if (scb) scb();
    }).catch(errorHandler);
  },

  onSysCates(params, type, fcb, scb) {
    fetch.mtop.cat.sysCates(params).then((data) => {
      this.state[type] = data;
      this.trigger(this.state);
      if (scb) scb(data[0].v);
    }).catch(errorHandler);
  },

  onCheckSubject(params, fcb, scb) {
    fetch.mtop.order.business.checkSubject(params).then(() => {
      if (scb) scb();
    }).catch(errorHandler);
  },
});
