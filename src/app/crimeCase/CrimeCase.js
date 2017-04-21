/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';
import { Tabs, Table, Button } from 'antd';
import store from './store';
import Actions from './Actions';
import CrimeForm from './crimeForm';

import './assets/css/crimeCase.less';

const TabPane = Tabs.TabPane;

class Component extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      total: 0,
      filter:{
        type:4,
        pageNo:1,
        pageSize:10,
      }
      
    };
    this.store = store;
  }
  componentDidMount() {
    Actions.getAllMsgList({
      data:this.state.filter
    });
  }
// 分页
  onPageChange(pageNo) {
    this.setState((state) => {
      const { filter } = state;
      filter.pageNo = pageNo;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getAllMsgList({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  onShowTotal(total){
    return `共${total}条`
  }
  onShowSizeChange(pageNo,pageSize){
    this.setState((state) => {
      const { filter } = state;
      filter.pageSize = pageSize;
      filter.pageNo = pageNo;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getAllMsgList({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  render() {
    const { className } = this.props;
    const { data, total, pageNo ,pageSize} = this.state;
    const columns = [{
      title: '发布时间',
      dataIndex: 'pushDate',
    }, {
      title: '标题',
      dataIndex: 'title',
    }, {
      title: '链接地址',
      dataIndex: 'url',
      render: (text,record) => (
        <a href={text} target="_blank">{text}</a>
      )
    }, {
      title: '操作',
      dataIndex: 'pushStatus',
      render: (text, record) => {
        return (
          (text ==  "0" || text =="1" )? 
            <Link to={`crimeForm?id=${record.msgId}#${Math.random()*100}`}>
              <Button>编辑</Button>
            </Link>
          :
            <Link to={`crimeForm?id=${record.msgId}`}>
              <Button className="toCheck">查看</Button>
            </Link>       
        );
      },
    }];  
    const tabContent = (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            total,
            onChange: this.onPageChange.bind(this),
            current: this.state.filter.pageNo,
            showQuickJumper: true,
            showSizeChanger:true,
            onShowSizeChange:this.onShowSizeChange.bind(this),
            showTotal:this.onShowTotal.bind(this)
          }}
          bordered
        />
      </div>
    );

    return (
      <div className="crimeHead">
        <div className="crimePublish">
          <Link to="crimeForm#push" >
            <Button>发布诈骗案例</Button>
          </Link>
        </div>
        
        {tabContent}
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'crimeCase',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

Component.CrimeForm = CrimeForm;


export default Component;
