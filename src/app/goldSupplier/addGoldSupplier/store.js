/* eslint-disable import/no-extraneous-dependencies */
import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../../common/js/fetch';
import { errorHandler } from '../../../common/js/util.js';

export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      data: [],
      total: 0,
      phone:'',
    };
  },

  onAddGoldSupper(params,scb) {
    fetch.mtop.user.addGoldSupper(params).then((data) => {
      if (scb) scb();
      this.state.data = data.questionPhones;
      this.state.phone = '';
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onPhoneChange(value) {
    this.state.phone = value  ;
    console.log(this.state.phone)
    this.trigger(this.state);
  }
});
