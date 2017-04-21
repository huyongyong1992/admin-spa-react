/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';
import { message, Table, Select } from 'antd';
// import moment from 'moment';
import Actions from './Actions';
import store from './store';
import './assets/css/commercialPushDetail.less';
import getQuery from '../../../common/js/getQuery'

const Option = Select.Option;
class Component extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      data:[],
      filter:{
        pageNum:1,
        pageSize:10,
        subjectId:'',
        status:-1,
      }
      
    };
    this.store = store;
  }

  onPageChange(pageNum) {
    this.setState((state) => {
      const { filter } = state;
      filter.pageNum = pageNum,
      state.filter = filter;
      return state;
    },() =>{
      Actions.info({
        data:this.state.filter
      })
    })
  }
  onShowSizeChange(pageNo,pageSize) {
    this.setState((state) => {
      const { filter } = state;
      filter.pageNum = pageNo;
      filter.pageSize = pageSize;
      state.filter = filter;
      return state;
    },() =>{
      Actions.info({
        data:this.state.filter,
      })
    })
  }
  onShowTotal(total){
    return `共${total}条`
  }

  componentDidMount() {
    const subjectId = getQuery("id");
    this.setState((state) => {
      const { filter } = state;
      filter.subjectId = subjectId;
      state.filter = filter;
      return state;
    },() =>{
      Actions.info({
        data:{
          subjectId:subjectId,
        }
      })
    })
    
  }
  onStatusChange(e) {
    this.setState((state) => {
      const { filter } = state;
      filter.status = e;
      state.filter = filter;
      return state;
    },() =>{
      Actions.info({
        data:this.state.filter
      })
    })
    
  }
  render() {
    const { className } = this.props;
    const {data,total,filter} = this.state;
    const { pageNum,pageSize,status,subjectId } = filter;
    const columnReply = [{
      title: '账号',
      dataIndex: 'acctNum',     
    }, {
      title: '店铺ID',
      dataIndex: 'shopId',
    },{
      title: '店铺头像',
      dataIndex: 'shopIcon',
      className: 'shopIcon',
      render: (text,record) =>(
        <img src={text} />
      )
    },{
      title: '店铺名称',
      dataIndex: 'shopName',
    }, {
      title: '联系人',
      dataIndex: 'contacts',
    }, {
      title: '联系方式',
      dataIndex: 'contactWay',
    }, {
      title: '商铺地址',
      dataIndex: 'shopAddr',
      
    }, {
      title: '接单状态',
      dataIndex: 'status',
      render:(text,record) =>{
        return(
          <div className={`${text === 1 ? '' : 'red'}`}>
            {
              text === 1 ? '已接单' : '未接单'
            }
          </div>
        )
      }
    }];
    
    return (
      <div className="commercialPushDetail">
        <h1>实际推送商家列表</h1>
        <div className="status">
          <span>接单状态:</span>
          <Select defaultValue="-1" style={{ width: 120 }} onChange={this.onStatusChange.bind(this)}>
            <Option value='-1'>全部</Option>
            <Option value='0'>未接单</Option>
            <Option value='1'>已接单</Option>
          </Select>
        </div>
        <Table
          columns={columnReply}
          dataSource={data}   
          pagination={{
            total,
            onChange: this.onPageChange.bind(this),
            current: pageNum,
            showQuickJumper: true,
            showSizeChanger:true,
            onShowSizeChange:this.onShowSizeChange.bind(this),
            showTotal:this.onShowTotal.bind(this),
          }}    
          bordered
        />
      </div>
    );
  }
}

Component.displayName = 'CommercialViewDetail';

Component.defaultProps = {
  className: 'commercialPushDetail',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

export default Component;
