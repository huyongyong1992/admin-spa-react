/* eslint-disable import/no-extraneous-dependencies */
import Reflux from 'reflux';
import Actions from './Actions';
import fetch from '../../../common/js/fetch';
import { errorHandler } from '../../../common/js/util';
export default Reflux.createStore({
  listenables: Actions,
  init() {
    this.state = {
      list: [],
      
    };
  },
  onGetBgReplyFeedbackList(params) {
    fetch.mtop.app.getBgReplyFeedbackList(params).then((data,scb) => {
      if(scb) scb();
      if(data.buyerFeedbacks&&data.buyerFeedbacks.length){
        this.state.list = data.buyerFeedbacks;
        this.state.data = data;
      }else{
        this.state.list = data.sellerFeedbacks;
        this.state.data = data;
      }
      this.trigger(this.state);
    }).catch(errorHandler);
  },
  onReplyFeedback(params,scb) {
    fetch.mtop.app.replyFeedback(params).then((data) => {
      if(scb) scb();
      // this.state.data = data.list;
      this.trigger(this.state);
    }).catch(errorHandler);
  },
 
});
