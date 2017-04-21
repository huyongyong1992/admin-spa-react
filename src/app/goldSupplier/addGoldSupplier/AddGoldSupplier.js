import React from 'react';
import Reflux from 'reflux';
import {  Button ,Table,Input} from 'antd';
import store from './store';
import Actions from './Actions';
import './assets/css/index.less';
class Component extends Reflux.Component {
	constructor(props) {
    super(props);
    this.state = {
      filter:{
      	phone:'',
      	shopLinkMan:'',
      	pageNo:1,
      	pageSize:10,
      }
    };
    this.store = store ;
  }
  onPhoneChange(val) {
    const value = val.target.value;
    Actions.phoneChange(value);
  }
  onAddGoldSupper() {
    Actions.addGoldSupper({
      data:{
        supperPhones: this.state.phone,
      }
    });
  }
  onBack() {
    window.history.go(-1);
  }
  render() {
  	const {phone,data} = this.state;
    
    const notVerifyList = data.map((data,i) =>(
      <li key={i}>{data}</li>
    ))
    return (
      <div className="addGoldSupplier">
        <header>添加金牌供应商</header> 
        <Input type="textarea" rows={10} onChange={this.onPhoneChange.bind(this)} value={phone} placeholder="批量输入手机号码,换行输入"/>
        
        { data.length ?
          <ul>
            <li className="warn">以下是未注册手机号:</li>
            { notVerifyList }
          </ul>
        :null
        }
        
        <div> 
    	    <Button onClick= {this.onBack.bind(this)} size="large">返回</Button>
          <Button onClick={this.onAddGoldSupper.bind(this)} size="large">添加</Button>
        </div>
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'addGoldSupplier'
};

Component.propTypes = {
};

export default Component;
