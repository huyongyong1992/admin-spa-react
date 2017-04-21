/* eslint-disable import/no-extraneous-dependencies */
import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../../common/js/fetch';
import { errorHandler } from '../../../common/js/util';

export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      total: '',
      list: [],
      
    };
  },

  onGetBgFeedbackList(params,scb) {
    fetch.mtop.app.getBgFeedbackList(params,scb).then((data,scb) => {
      if (scb) {
        scb();
      }
      this.state.list = data.list;
      this.state.total = data.page.total;
      this.trigger(this.state);
    }).catch(errorHandler);
  },

  
});
