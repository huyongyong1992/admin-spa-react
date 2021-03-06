/* eslint-disable import/no-extraneous-dependencies */
import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../../common/js/fetch';
import { errorHandler } from '../../../common/js/util';

export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      data: [],
      total: 0,
    };
  },

  onGetReviewAuthList(params,scb) {
    fetch.mtop.user.getReviewAuthList(params).then((data) => {
      if(scb){
        scb();
      }
      this.state.data = data.list;
      this.state.total = data.total;
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onReviewAuth(params,scb) {
    fetch.mtop.user.reviewAuth(params).then((data) => {
      if(scb){
        scb();
      }
      this.state.data = data;
      this.trigger(this.state);
    }).catch(errorHandler);
  },
});
