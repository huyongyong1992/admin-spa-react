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
      data:[],
    };
  },
  onInfo(params, scb) {
    fetch.mtop.order.subject.bid.info(params).then((data) => {
      this.state.data = data.list ; 
      this.state.total = data.page.totalCount;
      if (scb) scb();
      this.trigger(this.state);
      
    }).catch(errorHandler);
  },

 
});
