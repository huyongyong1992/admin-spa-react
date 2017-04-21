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

  onGetBgFeedbackList(params) {
    fetch.mtop.app.getBgFeedbackList(params).then((data,scb,fcb) => {
       this.state.data = data.list;
       this.state.total = data.page.total;
      if(scb) scb();
      
      this.trigger(this.state);
    }).catch(errorHandler);
  }
});
