
import React from 'react';
import Reflux from 'reflux';
import { Input, Button,message } from 'antd';
import store from './store';
import Actions from './Actions';
import './assets/css/addBuyerVerify.less';

class Component extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      data:{},
      params:{
        usrName:'',
        idCard:'',
        phone:'',
        companyName:'',
      }
    };
    this.store = store;
    
  }
  onNameChange(val) {
    let value = val.target.value;
    this.setState((state) => {
      const { params } = state;
      params.usrName = value;
      state.params = params;
      return state;
    });

  }
  onCardChange(val) {
    let value = val.target.value;
    this.setState((state) => {
      const { params } = state;
      params.idCard = value;
      state.params = params;
      return state;
    });
  }
  onPhoneChange(val) {
    let value = val.target.value;
    this.setState((state) => {
      const { params } = state;
      params.phone = value;
      state.params = params;
      return state;
    });
  }
  onCompanyChange(val) {
    let value = val.target.value;
    this.setState((state) => {
      const { params } = state;
      params.companyName = value;
      state.params = params;
      return state;
    });
  }
  onAddInfo() {
    const { params } = this.state;
    const { usrName ,phone, companyName,idCard} = params;
    if(!params.usrName){
      message.error("请输入用户名");
    }else if(!params.phone){
      message.error("请输入手机号码");
    }else if (! params.companyName){
      message.error("请输入公司名称")
    }else{
      Actions.addGuestBuyer({
        data:params,
      }, () => {
        message.success("添加成功");  
        location.reload();
      })
    }
    
  }
  onHistory () {
    history.go(-1);
  }
  render() {
    const {params} = this.state;
    const {usrName,companyName,phone,idCard} = params;
    return (
      <div className="addBuyerVerify">
        <h1>添加特邀采购员</h1>
           
          <div className="buyerInfo">
            <div className="Info"><span>*</span>姓名:</div>
            <Input placeholder="请输入姓名" onChange={this.onNameChange.bind(this)} required="required" value={usrName} maxLength="12"/>
          </div>
          {/*
          <div className="buyerInfo">
            <div className="Info">身份证:</div>
            <Input placeholder="请输入身份证号码" onChange={this.onCardChange.bind(this)} value={idCard}/>
          </div>
        */}
          <div className="buyerInfo">
            <div className="Info"><span>*</span>手机:</div>
            <Input placeholder="请输入手机号码" type="nuumber" onChange={this.onPhoneChange.bind(this)} required="required" value={phone}/>
          </div>
          <div className="buyerInfo">
            <div className="Info"><span>*</span>公司名称:</div>
            <Input placeholder="请输入公司名称" onChange={this.onCompanyChange.bind(this)} required="required" value={companyName}/>
          </div>
        <Button  htmlType="submit" size="large" onClick={this.onHistory.bind(this)}>返回上一页</Button>
        <Button  htmlType="submit" size="large" onClick={this.onAddInfo.bind(this)}>确认添加</Button>
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'addBuyerVerify',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

export default Component;
