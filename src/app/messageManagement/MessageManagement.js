/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';
import { Tabs, Table, Button } from 'antd';
import store from './store';
import Actions from './Actions';
import MessageForm from './messageForm';
import './assets/css/messageManagement.less';

const TabPane = Tabs.TabPane;

class Component extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      total: 0,
      pageNo: 1,
      type: 2,
      pageSize:10,
    };
    this.store = store;
    this.onTabClick = this.onTabClick.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    Actions.getAllMsgList({
      data:{
        type:2,
      }
    });
  }

  onTabClick(type) {
    const pageNo = 1;
    this.setState({
      type,
      pageNo,
    }, () => {
      Actions.getAllMsgList({
        data:{
          type:type,
          pageNo:pageNo,
        }
      });
    });
  }
  onShowTotal(total){
    return `共${total}条`
  }
  onPageChange(pageNo) {
    const { type } = this.state;
    this.setState({
      pageNo:pageNo
    }, () => {
      Actions.getAllMsgList({
        data:{
          pageNo:pageNo,
          type:type,
        }
      });
    });
  }
onShowSizeChange(pageNo,pageSize){
  const {type} =this.state;
    this.setState({   
      pageSize : pageSize,
      pageNo: pageNo,  
      type:type,
    }, () => {
      Actions.getAllMsgList({
        data: {
          pageNo:pageNo,
          pageSize:pageSize,
          type:type,
        }

      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  
  render() {
    const { className } = this.props;
    const { list, total, pageNo, type } = this.state;
    
    const columns = [{
      title: '发布时间',
      dataIndex: 'pushDate',
    },{
      title: '创建时间',
      dataIndex: 'createDate',
    },{
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
          record.type == '2' ?
          ((text =="0" || text=="1") ?
          <Link to={`messageForm?id=${record.msgId}`}>
            <Button >编辑</Button>
          </Link>
          :
           <Link to={`messageForm?id=${record.msgId}`}>
            <Button className="toCheck">查看</Button>
          </Link>
          ):
          null
        );
      },
    }];
    const footer = () => (

      type =='2' ?
      <Link to="messageForm#push">
        <Button>发布消息</Button>
      </Link>
      :null
    );
    const tabContent = (
      <div>
        <Table
          columns={columns}
          dataSource={list}
          footer={footer}
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
    );

    return (
      <div className={className}>
        <Tabs onTabClick={this.onTabClick} activeKey={String(type)} defaultActiveKey="2">
          <TabPane tab="微蚁团队" key="2">{tabContent}</TabPane>
          <TabPane tab="市场公告" key="1">{tabContent}</TabPane>
        </Tabs>
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'messageManagement',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

Component.Form = MessageForm;

export default Component;
