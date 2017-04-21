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
      data: [],
      
    };
  },

  onGetFreezeUserList(params, fcb, scb) {
    fetch.mtop.user.getFreezeUserList(params).then((data) => {
      if(scb) scb();
      this.state.data = data.data;
      this.trigger(this.state);
      if (scb) scb();
    }).catch(errorHandler);
  },
  onReactivateUser(params, fcb, scb) {
    fetch.mtop.user.reactivateUser(params).then((data) => {
      if(scb) scb();
      this.state.data = data;
      this.trigger(this.state);
      if (scb) scb();
    }).catch(errorHandler);
  },
});
