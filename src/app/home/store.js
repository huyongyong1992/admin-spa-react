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
    };
  },
  onHomepage(params) {
    fetch.mtop.admin.homepage(params).then((data) => {
      this.state.data = data;
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  
});
