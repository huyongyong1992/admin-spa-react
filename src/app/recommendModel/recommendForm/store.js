import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../../common/js/fetch';
import { errorHandler } from '../../../common/js/util';
import getQuery from '../../../common/js/getQuery'
export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      data: {},
      filter:{
        title:'',
        description:'',
        sort:'',
        shops:'',
      },
    };
  },
  onModifyRecmdAdmin(params,scb) {
    fetch.mtop.shop.admin.store.modifyRecmdAdmin(params).then((data) => {  
      if(scb) scb();   
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onCreateRecmdDetailAdmin(params,scb) {
    fetch.mtop.shop.admin.store.createRecmdDetailAdmin(params).then((data) => {
      if(scb) scb();
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onGetRecmdDetailAdmin(params,scb,fcb) {
    if (scb) scb()
    fetch.mtop.shop.admin.store.getRecmdDetailAdmin(params).then((data) => {
      this.state.data = data ;
      this.state.filter.title = data.title ;
      this.state.filter.description = data.description ;
      this.state.filter.sort = data.sort ;
      this.state.filter.shops = data.shops ;
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  
});
