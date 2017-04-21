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
      data:{},
    };
  },

  onSda(params, fcb, scb) {
    fetch.mtop.order.business.sda(params).then((data) => {
      this.state.data = data ;
     
      this.state.list = data.bvos;
      
      // this.state.total = data.page.totalCount;

      this.trigger(this.state);
      if (scb) scb();
    }).catch(errorHandler);
  },

 
});
