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
      sellMenu:'',
      remarkList:[],
      factoryPics:[],
    };
  },
  onHomePage(params) {
    fetch.mtop.admin.homepage().then((data) => {
      this.state.userId = data.phone
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onGetShopDetail(params) {
    fetch.mtop.shop.store.getShopDetail(params).then((data) => {
      this.state.data = data ;
      this.state.sellMenu = '';
      data.shopManager.sysCates.map(menu =>{
        //后端传回数组,前端转回字符串输出
        this.state.sellMenu =menu.n +'/'+ this.state.sellMenu ;
      });
      // this.state.factoryPics = data.shopManager.factoryPics.split(",");
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  //获取备注列表
  onGetShopNotesAdmin(params) {
    fetch.mtop.shop.admin.store.getShopNotesAdmin(params).then((data) => {
      this.state.remarkList = data&&data.list;
      this.state.total = data&&data.page.totalCount;
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  // 添加备注
  onAddShopNotesAdmin(params,scb) {
    fetch.mtop.shop.admin.store.addShopNotesAdmin(params).then((data) => {
      if(scb) scb();
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onBack() {
    this.state.data = {};
    this.state.remarkList = [];
    this.state.total = '';
    history.go(-1);
  }
});
