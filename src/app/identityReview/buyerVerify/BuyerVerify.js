/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';
import { Input, Table, Button,Select,message } from 'antd';
import store from './store';
import Actions from './Actions';
import './assets/css/buyerVerify.less';

const Search = Input.Search;

class Component extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      total: 0,
      pageNo: 1,
      isAuthGuest:1,
      pageSize:10,
      guestStatus:'1',
      searchName:'',
    };
    this.store = store;
    this.onPageChange = this.onPageChange.bind(this);
  }

  onPageChange(pageNo) {
    const {pageSize ,isAuthGuest,guestStatus} = this.state;
    this.setState({
      pageNo:pageNo,
    }, () => {
      Actions.getReviewAuthList({
        data:{
          isAuthGuest,
          guestStatus,
          pageNo,
          pageSize,
        }
      });
    });
  }
  onShowSizeChange(pageNo,pageSize){
    const { isAuthGuest,guestStatus} = this.state;
    this.setState({
      pageNo:pageNo,
      pageSize:pageSize,
    }, () => {
      Actions.getReviewAuthList({
        data: {
          isAuthGuest:1,
          pageSize,
          pageNo,
          guestStatus,
        }
      });
    });
  }
  onShowTotal(total){
    return `共${total}条`
  }
  componentDidMount() {
    Actions.getReviewAuthList({
      data:{
        guestStatus:1,
        pageNo:1,
        pageSize:10,
        isAuthGuest:1,

      }
    });
  }
  onSearch(key) {
    const { guestStatus,searchName } = this.state;
    
      this.setState({
        searchName:key,
      }, () => {
        Actions.getReviewAuthList({
          data: {
            isAuthGuest:1,
            pageSize:this.state.pageSize,
            pageNo:this.state.pageNo,
            guestStatus:this.state.guestStatus,
            searchName:this.state.searchName,
          }
        });
      })
    
  }
  onGuestStatusChange(val){
    const { guestStatus } = this.state;
    const value = val;
    this.setState({
      guestStatus:value,
    }, () => {
      Actions.getReviewAuthList({
        data: {
          guestStatus:value,
          isAuthGuest:1,
          pageNo:this.state.pageNo,
          pageSize:this.state.pageSize,
        }
      });
    });
  }
  onReview(idString, mobile, reviewStatus) {
    const {pageSize ,isAuthGuest,pageNo} = this.state;
    Actions.reviewAuth({
      data:{
        idString:idString,
        phone:mobile,
        isAuthGuest: 1,
        reviewStatus:reviewStatus,
      }     
    },() => { 
      message.success('解绑成功');    
      Actions.getReviewAuthList({
        data: {
          isAuthGuest: 1,
          guestStatus:this.state.guestStatus,
          pageNo: this.state.pageNo,
          pageSize:this.state.pageSize,
        },
      });
    });
  }
  render() {
    const { className } = this.props;
    const { data, pageNo, total,guestStatus } = this.state;

    const columns = [{
      title: '姓名',
      dataIndex: 'usrName',
    }, {
      title: '身份证',
      dataIndex: 'idNo',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
    }, {
      title: '公司名称',
      dataIndex: 'companyName',
    }, {
      title: '添加/解绑时间',
      dataIndex: 'bindGuestTimeString',
    }, {
      title: '操作',
      dataIndex: 'idString',
      render: (text, record) => {
        return (
          guestStatus == '1' ?
          <Button onClick={this.onReview.bind(this, record.idString, record.mobile, '2')}>解邀</Button>
          :null
        );
      },
    }];

    return (
      <div className={className}>
        <p className={`${className}-title`}>特邀采购员</p>
        <div className={`${className}-actions`}>
          <Search style={{ width: 250 }} placeholder="输入手机号、姓名、公司名等关键词" onSearch={this.onSearch.bind(this)}/>
          <Select size="large" defaultValue="1" style={{ width: 150 }} onChange={this.onGuestStatusChange.bind(this)}>
            <Option value="1">已绑定</Option>
            <Option value="2">已解绑</Option>
          </Select>
          <span className={`${className}-actions-btns`}>
            <Link to="/identityReview/addBuyerVerify">
              <Button style={{ marginRight: 16 }}>添加特邀采购员</Button>
            </Link>
            <Button>excel导入</Button>
          </span>
        </div>
        <div className={`${className}-table`}>
          <Table
            columns={columns}
            dataSource={data}
            locale={{emptyText: '暂无审核信息'}}
            pagination={{
              total,
              onChange: this.onPageChange,
              current: pageNo,
              showQuickJumper: true,
              showSizeChanger:true,
              onShowSizeChange:this.onShowSizeChange.bind(this),
              showTotal:this.onShowTotal.bind(this),
            }}
            bordered
          />
        </div>
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'buyerVerify',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

export default Component;
