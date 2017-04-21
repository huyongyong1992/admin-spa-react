import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../common/js/fetch';
import { errorHandler } from '../../common/js/util';

export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      phone:'',
			filter:{
				shopName:'',
				sysCateId:'',
				pageNo:1,
				pageSize:10,
			},
			list:[],
			total:'', 
      supCates:[],
      subCates:[],  
    };
  },

  onGetShopsList(params,scb,fcb) {
    fetch.mtop.shop.store.getShopsList(params).then((data) => {
      this.state.list = data.list;
      this.state.total = data.page.totalCount;
      if(scb) scb();
      if(fcb) fcb();    
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onSysCates(params, type, fcb, scb) {
    fetch.mtop.cat.sysCates(params).then((data) => {
      this.state[type] = data;
      
      if (scb) scb();
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  // 修改搜索状态
  onModifyShopSearchStatus(params,scb) {
    fetch.mtop.shop.admin.store.modifyShopSearchStatus(params).then((data) =>{
      if (scb) scb();
      this.trigger(this.state);
    }).catch(errorHandler);
  }
});
