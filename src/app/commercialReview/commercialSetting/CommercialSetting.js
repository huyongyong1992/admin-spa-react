/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Reflux from 'reflux';
import Actions from './Actions';
import store from './store';
import './assets/commercialSetting.less';

class Component extends Reflux.Component {
  constructor(props) {
	  super(props);
	  this.state ={
	  	data:[],
	  	filter:{
	  		value:'',
	  	}
	  }
	  this.store = store ;
  }
  onSave(){
  	Actions.getAppFeedbackList({
  		data: this.state.filter,
		}, () =>{
			alert("恭喜您设置成功");
		}, () =>{
			alert("设置失败")
		})	
  }
  onValueChange(val){
  	const value = val.target.value;
  	this.setState((state) => {
      const { filter } = state;
      filter.value = value;
      state.filter = filter;
      return state;
    })
  }

  render() {
  	const { data } = this.state ;
  	const msgs = data.msgs || [];
  
  	console.log(msgs)
    return (
			<div className="commercialSetHead">
				<div>您当前设置的数量为{msgs&&msgs[0]}条</div>
				<div className="resetNum">
	        每条消息最多收到<input type="taxt" placeholder="50" onChange = {this.onValueChange.bind(this)}/>条求购
	        <button onClick={this.onSave.bind(this)}>保存</button>
	      </div>
			</div>
      
    );
  }
}

Component.displayName = 'CommercialSetting';

Component.defaultProps = {
};

Component.propTypes = {
};

export default Component;
