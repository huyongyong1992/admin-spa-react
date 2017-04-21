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
      data: {},
      
    };
  },

  onGetAppFeedbackList(params, fcb, scb) {
    fetch.mtop.app.getAppFeedbackList(params).then((data,scb,fcb) => {
      if(scb) scb();
      this.state.data = data;
      this.state.total = data.ts;
      this.trigger(this.state);
      if (scb) scb();
    }).catch(errorHandler);
  },

});
