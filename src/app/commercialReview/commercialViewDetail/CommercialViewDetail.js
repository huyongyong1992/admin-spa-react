/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';
import { message, Input, Button, Table, Select } from 'antd';
// import moment from 'moment';
import Actions from './Actions';
import store from './store';
import './assets/css/commercialViewDetail.less';


class Component extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      data:{},
      list: [],
      pn:1,
      pageSize:10,
      showPic:false,
      bigPicture:'',
    };
    this.store = store;
  }
  componentDidMount() {
    const sid = window.location.href.split('?')[1].split('=')[1];
    Actions.sda({
      data:{
        sid:sid,
      }
    })
  }
  //看大图
  onShowBigPicture(img) {
    this.setState({
      showPic:!this.state.showPic,
      bigPicture:img,
    })
  }
  onHideBigPic() {
    this.setState({
      showPic:false,
    })
  }
  render() {
    const {data ,list,total,pn,pageSize,showPic ,bigPicture} = this.state;
    
    const columnReply = [{
      title: '头像',
      dataIndex: 'tx',
      render: (text,record) =>(
        <img src={text} />
      )
    }, {
      title: '店铺名称',
      dataIndex: 'sn',
      
    }, {
      title: '认证标识',
      dataIndex: 'at',
      render:(text,record) =>(
        text ===1 ? <div>市场认证</div> : <div>未认证</div>
      )
    }, {
      title: '货源类型',
      dataIndex: 'st',
    }, {
      title: '价格',
      dataIndex: 'pr',
    }, {
      title: '描述信息',
      dataIndex: 'ds',
    }, {
      title: '报价时间',
      dataIndex: 'dt',
      
    }, {
      title: '图片',
      dataIndex: 'ps',
      render:(text,record) =>(
        text.map((imgs,i) =>(
          <img src={imgs.p} onClick={this.onShowBigPicture.bind(this,imgs.p)} key={i+100}/>
        ))
      )
    }];
    const ps = data.ps || [];
    const images = ps.map( (imgs,i) =>(
      <img src={imgs.p} onClick={this.onShowBigPicture.bind(this,imgs.p)} key={i}/>
    ))  
    return (
      <div className="commercialViewDetail">
        <h1>商机查看详情页面</h1>
        <h2>发布求购者详细信息:</h2>
        <div className="detailTop">
          <img className="headPic" src={data&&data.tx} />
          <div className="detailPersonInfo">
            <div>求购ID:{data.id}</div>
            <div>账号:{data.uid}</div>
          </div>
          <div className="detailPersonInfo">
            <div>认证类型:{data.at ===0 ? '未认证' : (data.at ===1 ? '个人认证':(data.at ===2 ? '企业认证': '特邀采购员'))}</div>  
            <div>发布时间:{data.ts}</div>
          </div>
          <div className="detailPersonInfo">
            <div>昵称:{data.nn}</div>
            <div>手机:{data.mb}</div>
          </div>
        </div>
        
         <div className="detailTitle">
          <div>状态:{data.st ===0 ? '待审核' :(data.st ===1 ? '求购中' :'已完成')}</div>
          {data.sr ? <div>完成原因:{data.sr}</div> : null }
        </div>
        <div className="detailTitle">详情:{data.ds}</div>
        <div className="detailTitle">产品名称:{data.pn}</div>
        <div className="detailTitle">
          <div>分类:{data.ct}</div><div>数量:{data.no}</div><div>交货日期:{data.ed}</div>
        </div>
        
        <div className="active">
          <div>图片:</div>
          <div className="detailImage">
            {
              images
            }
          </div>
        </div>
        
        <hr />
        <h2>消息回复列表:</h2>
        <Table
          columns={columnReply}
          dataSource={list}    
          bordered
        />
          <div className={`showBigPic ${showPic ? 'showActive' : null}`} onClick={this.onHideBigPic.bind(this)}><img src={bigPicture} className="bigPicture"/></div>
      </div>
    );
  }
}

Component.displayName = 'CommercialViewDetail';

Component.defaultProps = {
  className: 'commercialViewDetail',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

export default Component;
