/* eslint-disable import/no-extraneous-dependencies */
import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../common/js/fetch';

export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      data:[],
    };
  },


  onSysCates(params, fcb, scb) {
    fetch.mtop.app.sysCates(params).then((data) => {
      this.state.data = data;
      
      this.trigger(this.state);
      
    }).catch((e) => {
      if (fcb) fcb(e);
    });
  }
})

 