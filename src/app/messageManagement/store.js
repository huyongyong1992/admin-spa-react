/* eslint-disable import/no-extraneous-dependencies */
import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../common/js/fetch';
import { errorHandler } from '../../common/js/util';

export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      data: [],
      total: [],
    };
  },
  onGetAllMsgList(params) {
    fetch.mtop.mc.getAllMsgList(params).then((data) => {
      this.state.list = data.list;
      this.state.total = data.page.totalCount;
      this.trigger(this.state);
    }).catch(errorHandler);
  },
});
