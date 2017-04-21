/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
import React from 'react';
import {Link} from 'react-router';
import Reflux from 'reflux';
import { Form, Input, DatePicker,message,Tooltip, Upload, Cascader, Row, Col,Icon, Checkbox, Button ,Switch,Radio} from 'antd';
import store from './store';
import Actions from './Actions';
import moment from 'moment';
import getQuery from '../../../common/js/getQuery';
import './assets/css/crimeForm.less';
import UploadPic from '../../../common/js/upload'; 
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class Component extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordDirty: false,
      data:{},
      checked:true,
      filter:{
        type:4,
        msgId:'',
        push:'',
        pushStatus:'',
        title:'',
        abbr:'',
        url:'',
        pushTitle:'',
        pushAbbr:'',
        pushDate:'',
        image:''
      }
    };
    this.store = store;
  }
  componentDidMount(){
    const id = getQuery('id');
    new UploadPic({
      dir: '4/me/',
      bucket: 'public-read-bkt-oss',
      successCallBack: this.successCallBack.bind(this),
    });
   
    
  // 如果id存在,则是编辑或查看状态,若不存在,则是发布诈骗信息
    if(id) {
      this.setState((state) => {
        const { filter } = state;
        filter.msgId = id;
        state.filter = filter;
        return state;
      },() =>{
        Actions.getMsgById({
          data:{
            msgId:this.state.filter.msgId,
          }
        })
      })    
    }else{//发布
      this.setState((state) => {
        const { filter } = state;
        state.checked = true;
        filter.msgId = '';
        filter.push = 1;
        filter.pushStatus = 1;
        filter.abbr = '';
        filter.title = '';
        filter.image = '';
        filter.url = '';
        filter.pushTitle = '';
        filter.pushAbbr = '';
        state.filter = filter;
        return state;
      })    
    }
  }
  // 上传照片
  successCallBack(fileUrl) {
    Actions.imageSelected(fileUrl)
  }
  //是否发送通知,展开,关闭则清除通知标题和通知文案
  onSwitchChange(checked) {
    // const {pushTitle,pushAbbr} = this.state;
    // this.setState({
    //   checked:checked,
    //   pushTitle:checked ? pushTitle : '',
    //   pushAbbr:checked ? pushAbbr :'',
    // })
    Actions.switchChange(checked);
  }
  //客户端通知标题
  onPushTitle(val){
    const value = val.target.value;
    console.log(value);
    this.setState((state) => {
      const { filter } = state;
      filter.pushTitle = value;
      state.filter = filter;
      return state;
    })
  }
  //客户端通知摘要
  onPushAbbr(val){
    const value = val.target.value;
    this.setState((state) => {
      const { filter } = state;
      filter.pushAbbr = value;
      state.filter = filter;
      return state;
    })
  }
  // 选择日期
  onPushDate(value,dateString){
   
    this.setState((state) => {
      const { filter } = state;
      filter.pushDate = dateString;
      filter.push = 0;
      state.filter = filter;
      return state;
    })
  }
  // 发布时间切换
  onRadioChange(val) {
    const value = val.target.value;
    Actions.radioChange(value);
  }
  // 限制时间
  disabledDate(current) {
    return current && current.valueOf() < Date.now();
  }

  // 保存标题
  onTitleChange(val){
    const value = val.target.value;
    this.setState((state) => {
      const { filter } = state;
      filter.title = value;
      state.filter = filter;
      return state;
    })
  }
  // 地址变化
  onUrlChange(val){
    const value = val.target.value;
    this.setState((state) => {
      const { filter } = state;
      filter.url = value;
      state.filter = filter;
      return state;
    })
  }
// 简介
  onAbbrChange(val) {
    const value = val.target.value;
    this.setState((state) => {
      const { filter } = state;
      filter.abbr = value;
      state.filter = filter;
      return state;
    })
  }

// 提交发布案例
  onSubmitCrimeForm(e) {
    const {filter} = this.state;
    const {image,push,pushDate} = filter;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if(!image){
          message.error("请上传封面");
          return ;
        }
        if((!push) && (!pushDate)) {
          message.error("请选择发布时间");
          return ;
        }
        Actions.saveAndUpdateMsg({
          data:this.state.filter
        })
      }
    });
    
  }
  
  onBackHistory() {
    this.setState({
      checked: true,
    })
    history.go(-1);
  }

  render() {
    const { data ,checked ,filter} =this.state;
    const {push,pushStatus,title,image,abbr,url,pushTitle,pushAbbr,pushDate,msgId} = filter;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 16,
        offset: 4,
      },
    };
    const pushMsg = (
      checked ? 
        <div>
            <FormItem
              {...formItemLayout}
              label="通知标题"
              hasFeedback
            >
              {getFieldDecorator('通知标题', {
                rules: [{
                  range: {
                    min: 0,
                    max: 20,
                  },
                  required: true,
                  message: '请输入通知标题',
                }],
                initialValue:pushTitle,
              })(
                <Input 
                  placeholder="通知标题，仅安卓有效" 
                  onChange={this.onPushTitle.bind(this)} 
                  maxLength="50" 
                  disabled={((pushStatus =="2" ||pushStatus=="3")? true :false)}
                  
                  value = {pushTitle}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="通知文案"
              hasFeedback
            >
              {getFieldDecorator('通知文案', {
                rules: [{
                  range: {
                    min: 0,
                    max: 50,
                  },
                  required: true,
                  message: '请输入通知文案',
                }],
                initialValue:pushAbbr,
              })(
                <Input 
                  type="textarea" 
                  placeholder="不超过50字" 
                  onChange={this.onPushAbbr.bind(this)} 
                  maxLength="50" 
                  disabled={((pushStatus =="2" ||pushStatus=="3")? true :false)}

                  value={pushAbbr}
                />
              )}
            </FormItem>
          }
        </div>
        : null
    )
    return (
      <div className="crimeForm">
        <Form onSubmit={this.onSubmitCrimeForm.bind(this)}>
          <FormItem
            {...formItemLayout}
            label="标题"
            hasFeedback
          >
            {getFieldDecorator('标题', {
              rules: [{
                required: true,
                message: '请输入您的标题',
              }],
              initialValue: (msgId ? data.title : ''),
            })(
              <Input 
                onChange={this.onTitleChange.bind(this)} 
                disabled={((pushStatus =="2" ||pushStatus=="3")? true :false)} 
                maxLength="50"
              />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="简介"
            hasFeedback
          >
            {getFieldDecorator('简介', {
              rules: [{
                required: true,
                message: '请输入简介',
              }],
              initialValue: (msgId ? data.abbr : ''),
            })(
              <Input onChange={this.onAbbrChange.bind(this)} disabled={((pushStatus =="2" ||pushStatus=="3")? true :false)} maxLength="50"/>
            )}
          </FormItem>

          <FormItem
              {...formItemLayout}
              label="*封面"
              hasFeedback
            >
              {getFieldDecorator('*封面', {
                
                initialValue: (msgId ? data.image : ''),
              })(
                <div className="clearfix">
                  {
                    (pushStatus =="0" ||pushStatus=="1") ? 
                    
                    <div className="clearfixCont">
                      <img alt="要上传的图片"  src={image} className="img"/>
                      <div id="container" >
                        <div id="selectfiles"  />
                      </div>
                    </div>
                    :
                    <img alt="要上传的图片"  src={image} className="img"/>
                  } 
              </div>
              )}
          </FormItem>

            <FormItem
              {...formItemLayout}
              label="地址"
              hasFeedback
            >
              {getFieldDecorator('地址', {
                rules: [{
                  type: 'url',
                  message: '请输入合法的url',
                }, {
                  required: true,
                  message: '请输入地址',
                }],
                initialValue: (msgId ? data.url : ''),
              })(
                <Input onChange={this.onUrlChange.bind(this)} disabled={((pushStatus =="2" || pushStatus=="3")? true :false)} maxLength="128"/>
              )}
            </FormItem>
          { 
            (pushStatus =="2" || pushStatus =="3" ) ? null :
            <FormItem
              {...formItemLayout}
              label="发布时间"
              hasFeedback
            >
              {getFieldDecorator('发布时间', {
                
              })(
              <div>
                <RadioGroup onChange={this.onRadioChange.bind(this)} value={push}>
                  <Radio  value={1}>
                    立即发布
                  </Radio>
                  <Radio value={0}>
                  </Radio>      
                </RadioGroup>
                <DatePicker 
                  disabledDate={this.disabledDate}
                  showTime={{hideDisabledOptions: true}} 
                  format="YYYY-MM-DD HH:mm:ss" 
                  placeholder="选择时间" 
                  onChange={this.onPushDate.bind(this)}
                  value={this.state.filter.pushDate ? moment(this.state.filter.pushDate) : null}
                />
              </div>
              )}
            </FormItem>
          }
          {
            (pushStatus =="2" || pushStatus =="3" ) ? null  :
            <FormItem
              {...formItemLayout}
              label="发送通知"
            >
              {getFieldDecorator('发送通知', {  })(
                <Switch checked={checked} onChange={this.onSwitchChange.bind(this)} checkedChildren={'开'} unCheckedChildren={'关'}/>
              )}
            </FormItem>
          }
           {
            pushMsg
           }
            <FormItem {...tailFormItemLayout}>
              
              {
                (pushStatus =="2" || pushStatus =="3" ) ? null : <Button htmlType="submit" size="large">提交</Button>
              }
              
            </FormItem>
         </Form> 
         <Button  size="large" onClick={this.onBackHistory.bind(this)} className="goBack">返回</Button>
       </div>
    );
  }
}

Component.defaultProps = {
  className: 'crimeForm',
};

Component.propTypes = {
  className: React.PropTypes.string,
};


export default Form.create()(Component);
