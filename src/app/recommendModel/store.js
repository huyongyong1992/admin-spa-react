import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../common/js/fetch';
import { errorHandler } from '../../common/js/util';
export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      data: [],
      total: '',
      status:0,
    };
  },
  onGetShopRecmdstAdmin(params) {
    fetch.mtop.shop.admin.store.getShopRecmdstAdmin(params).then((data) => {
      this.state.data = data.list;
      this.state.total = data.page.totalCount;
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onModifyRecmdOrderAdmin(params,scb) {//修改权重
    fetch.mtop.shop.admin.store.modifyRecmdOrderAdmin(params).then((data) => {
      if(scb) scb();
      this.trigger(this.state);
    }).catch(errorHandler);
  },

  onModifyRecmdStatusAdmin(params,scb) {//修改上架状态
    fetch.mtop.shop.admin.store.modifyRecmdStatusAdmin(params).then((data) => {
      if(scb) scb();
      this.trigger(this.state);
    }).catch(errorHandler);
  },
});
