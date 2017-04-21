/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
import React from 'react';
import Reflux from 'reflux';
import { Tabs,Button,Table} from 'antd';
import store from './store';
import Actions from './Actions';
import getQuery from '../../../common/js/getQuery';
import './assets/css/shopDetail.less';
import Popover from'../../../components/popover';
import {onConvertDate} from '../../../common/js/date.js';
const TabPane = Tabs.TabPane;

class Component extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordDirty: false,
      data:{},
      total:'',
      filter:{
        shopId:'',
        pageNo:'',
        pageSize:'',
      }      
    };
    this.store = store;
  }

  componentDidMount(){
    const id = getQuery('id');
    this.setState((state) => {
      const {filter} = state;
      filter.shopId = id;
      state.filter = filter;
      return state;
    },() =>{
      Actions.homePage();
      Actions.getShopDetail({
        data:{
          shopId:this.state.filter.shopId,
        }
      })
      Actions.getShopNotesAdmin({
        data:this.state.filter,
      })
    })
  
  }
  // 分页
  onPageChange(pageNo) {
    this.setState((state) => {
      const {filter} = state;
      filter.pageNo = pageNo;
      state.filter = filter;
      return state;
    },() => {
      Actions.getShopNotesAdmin({
        data:this.state.filter,
      })
    })
  }
  onShowSizeChange(pageNo,pageSize) {
    this.setState((state) => {
      const {filter} = state;
      filter.pageNo = pageNo;
      filter.pageSize = pageSize;
      state.filter = filter;
      return state;
    },() =>{
      Actions.getShopNotesAdmin({
        data:this.state.filter,
      })
    })
  }
  onShowTotal(total) {
    return `共${total}条`
  }
  //添加备注
  onConfirm(id,value) {
    Actions.addShopNotesAdmin({
      data:{
        shopId:id,
        content:value,
        userId:this.state.userId
      }
    },() => {
      Actions.getShopNotesAdmin({
        data:this.state.filter,
      })
    })
  }
  onBack() {
    Actions.back();
    
  }
  render() {
    const { className } = this.props;
    const { data ,sellMenu ,remarkList ,filter ,total } = this.state;
    //银行卡信息
    const bankList = data.banks&&data.banks.map((data,i) =>{
      return (
        <div key={i}>
          <span>银行及支行信息:{data.bankValue}{data.bankPlace}</span> 
          <span>户名:{data.acctName}</span>
          <span>卡号:{data.bankNo}</span>
        </div>
      )
    });
    //时间转化
    const userCreateTime = onConvertDate(data.userCreateTime)
    const createTime = onConvertDate(data.createTime)
    //商铺实景图其他图片,后端传string,以逗号分隔
    const piclaOthersArgument = data.shopLAPic && data.shopLAPic.piclaOthers && data.shopLAPic.piclaOthers.split(',') || [];
    const piclaOthers = piclaOthersArgument.map((img,i) =>(
      <img src={img} key={i}/>
    ));

    const factoryPicsArgument = data.shopManager && data.shopManager.factoryPics && data.shopManager.factoryPics.split(',') || [];
    const factoryPics = factoryPicsArgument.map((factory,i) =>(
      <img src={factory} key={i}/>
    ));
    
    const columns = [{
      title: '添加备注时间',
      dataIndex: 'createTime',
      className:'createTime',
      render:(text,record) => {
        const time = onConvertDate(text)
        return (
          <div>{time}</div>
        )
      }
    },{
      title: '反馈内容',
      dataIndex: 'content',
    },{
      title: '管理员姓名',
      dataIndex: 'userName',
      className: 'userName',
    }]
    const sellChannel = data.shopManager && data.shopManager.sellChannel;
    const sellChannelValue = {
      0: '内销',
      2: '外贸',
      3: '内销、外贸',
    };
    return (
      <div className={`${className}`}>
        <div className={`${className}-title`}>
          <span>商铺详情</span><Button onClick={this.onBack.bind(this)}>返回</Button>
        </div>
        <div className={`${className}-header`}>
          <div className={`${className}-header-left`}>
            <img src={data.iconUrl}/>
          </div>
          <div className={`${className}-header-right`}>
            <div>
              <span>商铺名称:{data.name}({data.shopManager&&data.shopManager.mgrPeriod ? (data.shopManager.mgrPeriod >10 ? '10+年,':(data.shopManager.mgrPeriod+"年,")) : ''}{sellChannelValue[sellChannel]})</span>
              <span>{data.supplierSig === 0 ? '' : '金牌供应商'}</span>
              <span>{data.authMarket === 0 ? '' : '市场认证'}</span>
            </div>
          
            <div>商铺地址:{data.addressVO}</div>
            <div>
              <span>注册手机:{data.shopContact&&data.shopContact.sellerPhone}</span>
              <span>联系手机:{data.mobile}</span>
              <span>商铺联系人:{data.shopContact&&data.shopContact.sellerName}</span>
            </div>
            <div>
              <span>商铺Id:{data.id}</span>
              <span>商户注册时间:{userCreateTime}</span>
              <span>商铺开通时间:{createTime}</span>
            </div>

          </div>
           <Popover
              title="请输入备注信息"
              trigger="click"
              handleConfirm={this.onConfirm.bind(this,data.id)}
            >
              <Button className="remark">添加备注</Button>
            </Popover>
        </div>
        <hr />
        <div className={`${className}-tab`}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="商铺信息" key="1">
              {
                data.announcement ? <div>商铺公告:{data.announcement}</div> : null
              }
              
                <div>主营类目:{sellMenu}</div>
              
              {
                data.shopManager&&data.shopManager.mainSell ? <div>主营产品:{data.shopManager.mainSell}</div> : null
              }
              {
                data.outline ? <div>商铺简介:{data.outline}</div> :null
              }
              
              {
                data.shopManager&&data.shopManager.mainBrand ? <div>经营品牌:{data.shopManager.mainBrand}</div> :null
              }
              
              <div className={`${className}-tab-img`}>
                <span>经营模式:{data.shopManager&&data.shopManager.mgrType === 0 ? '自有工厂' : '经销批发'}</span>
                <div className={`${className}-tab-img-detail`}>

                  {factoryPics}

                </div>
              </div>
              <div className={`${className}-tab-img`}>
                <span>商铺实景</span>
                <div className={`${className}-tab-img-detail`}>
                  {
                    data.shopLAPic&&data.shopLAPic.piclaLeft ? <img src={data.shopLAPic.piclaLeft}/> :null
                  }
                  {
                    data.shopLAPic&&data.shopLAPic.piclaCenter ? <img src={data.shopLAPic.piclaCenter}/> :null
                  }
                  {
                    data.shopLAPic&&data.shopLAPic.piclaRight ? <img src={data.shopLAPic.piclaRight}/> :null
                  }
                  {
                    piclaOthers
                  }
                </div>
              </div>
            </TabPane>
            <TabPane tab="联系信息" key="2">
              <div className={`${className}-tab-info`}>
                {
                  data.shopContact&& data.shopContact.tel ? 
                  <div>座机:{data.shopContact.tel}</div> :null
                }
                {
                  data.shopContact&& data.shopContact.wechat ? 
                  <div>微信号:{data.shopContact.wechat}</div> :null
                }
                {
                  data.shopContact&& data.shopContact.fax ?
                  <div>传真:{data.shopContact.fax}</div> :null
                }
                {
                  data.shopContact&& data.shopContact.email ?
                  <div>E-mail:{data.shopContact.email}</div> :null
                }
                {
                  data.shopContact&& data.shopContact.qq ?
                  <div>QQ:{data.shopContact.qq}</div> :null
                }
              </div>
            </TabPane>
            <TabPane tab="银行卡信息" key="3">
              <div className={`${className}-tab-card`}>
                {
                  bankList
                }
              </div>
            </TabPane>
            <TabPane tab={`备注信息(${total})`} key={`{Math.random()*100}`}>
              <div className={`${className}-mark`}>
                <Table 
                  dataSource={remarkList} 
                  columns={columns}
                  pagination={{
                    total:total,
                    onChange: this.onPageChange.bind(this),
                    current: filter.pageNo,
                    showQuickJumper: true,
                    showSizeChanger:true,
                    onShowSizeChange:this.onShowSizeChange.bind(this),
                    showTotal:this.onShowTotal.bind(this),
                  }}
                  bordered
                />
              </div>

            </TabPane>
          </Tabs>
          </div>
      </div>
      
    );
  }
}

Component.defaultProps = {
  className: 'shopDetail',
};

Component.propTypes = {
  className: React.PropTypes.string,
};


export default Component;
