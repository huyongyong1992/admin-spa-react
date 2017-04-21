/* eslint-disable import/no-extraneous-dependencies */
import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../common/js/fetch';
import { errorHandler } from '../../common/js/util.js';

export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      data: [],
      total: 0,
      filter:{
        pageNo:'',
        pageSize:'',
      }
    };
  },

  onGetGoldSupper(params,scb) {
    fetch.mtop.user.getGoldSupper(params).then((data) => {
      if (scb) scb();
      this.state.data = data.list;
      this.state.filter.pageNo = data.page.currentPage;
      this.state.filter.pageSize = data.page.pageSize;
      this.state.total = data.page.totalCount;
      this.trigger(this.state);
    }).catch(errorHandler);
  },
   onDeleteGoldSupper(params,scb) {
    fetch.mtop.user.deleteGoldSupper(params).then((data) => {
      if (scb) scb();
      this.trigger(this.state);
    }).catch(errorHandler);
  },
});
