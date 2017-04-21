/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Reflux from 'reflux';
import store from './store';
import Actions from './Actions';
import { Button,Table,Input } from 'antd';
import getQuery from '../../../common/js/getQuery';
import './assets/css/answerFeedback.less';

const { Column, ColumnGroup } = Table;
class Component extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {}, 
      replyContent:'',  
      list:[],  
      type:'', 
    }
    this.store = store;
  }
  componentDidMount(){
    const type = window.location.href.split('?')[1].split('=')[0];
    const id = window.location.href.split('?')[1].split('=')[1];
    if(type ==="unionid"){
      this.setState({
        utype:1,
        type:'unionid',
        msgId:id,
      },() =>{
        Actions.getBgReplyFeedbackList({
          data:{
            utype: this.state.utype,
            unionid:this.state.msgId,
          }
        })
      })
      
    }else{
      this.setState({
        utype:2,
        type:'uid',
        msgId:id,
      },() =>{
        Actions.getBgReplyFeedbackList({
          data:{
            utype: this.state.utype,
            idString:this.state.msgId,
          }
        })
      })
      
    }   
  }
  onConfirm(id,channel){
    const { replyContent ,type ,msgId} = this.state;
    if(type === 'unionid') {
      Actions.replyFeedback({
        data:{
          utype:this.state.utype,
          unionid:msgId,
          replyContent:replyContent,
          maxId:id,
          channel:channel,
        }      
      },() => {
        history.go(-1);
      })
    }else{
      Actions.replyFeedback({
        data:{
          utype:this.state.utype,
          uid:msgId,
          replyContent:replyContent,
          maxId:id,
          channel:channel,
        }      
      },() => {
        history.go(-1);
      })
    }
    
  }
  onTextChange(val) {
    const value = val.target.value;
    this.setState({
      replyContent:value,
    })
  }
  onGoBack() {
    history.go(-1);
  }
  render() {
  
    const { data ,list} = this.state; 
    const id =list[0]&&list[0].id ;
    const channel = list[0]&&list[0].channel;
    const columns = [{
      title: '反馈时间',
      dataIndex: 'createTimeString',
      
    }, {
      title: '反馈内容',
      dataIndex: 'feedbackContent',
    }];
    return (
      <div className="feedbackClearfix">
        <div className="goback">
          {
          data.phone ?
          <div className="personTitle">      
            <div className="userInfo">手机: {data.phone}</div>   
          </div>
          : null
          }
        <Button onClick={this.onGoBack.bind(this)}>返回上一页</Button>
        </div>
        <Table dataSource={list} columns={columns} pagination={false} bordered />
         
        <div className="answerFooter">
          <Input type="textarea" rows={4} onChange={this.onTextChange.bind(this)}/>
          <Button onClick={this.onConfirm.bind(this,id,channel)}>确认回复</Button>
        </div>
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'AnswerFeedback',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

export default Component;
