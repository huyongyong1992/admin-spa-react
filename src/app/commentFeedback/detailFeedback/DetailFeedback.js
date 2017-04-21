/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Reflux from 'reflux';
import store from './store';
import Actions from './Actions';
import { Button,Table} from 'antd';

import './assets/css/detailFeedback.less';

const { Column, ColumnGroup } = Table;

class Component extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {},
      list:[],
      
    }
    this.store = store;
  }
  componentDidMount(){
    const type = window.location.href.split('?')[1].split('=')[0];
    const id = window.location.href.split('?')[1].split('=')[1];
    if(type ==="unionid"){
      Actions.getReplyedFeedbackList({
        data:{
          utype: 1,
          unionid:id,
        }
      })
    }else{
      Actions.getReplyedFeedbackList({
        data:{
          utype: 2,
          idString:id,
        }
      })
    }
  }
  onGoBack() {
    history.go(-1);
  }
  render() {
    const { data ,list} = this.state;
    console.log(list)
    return (
      <div>
        <div className="goback">
          {
            data.phone ?
            <div className="personTitle">
              <div className="userInfo">手机: {data.phone}</div>
            </div>
            :null
          }
          <Button onClick={this.onGoBack.bind(this)}>返回上一页</Button>
        </div>
        <Table  dataSource={list} pagination={false} bordered>
          <ColumnGroup title="反馈信息" >

            <Column title="反馈时间" dataIndex="createTimeString" className="fbTimes" key='createTimeString'/>
            <Column title="反馈内容" dataIndex="feedbackContent" key='feedbackContent' />
          </ColumnGroup>
          <ColumnGroup title="回复信息" >

            <Column title="回复时间" dataIndex="replyTimeString" key='replyTime'  className="fbTimes" />
            <Column title="回复内容" dataIndex="replyContent" key='replyContent' />
          </ColumnGroup>
        </Table>
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'DetailFeedback',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

export default Component;
