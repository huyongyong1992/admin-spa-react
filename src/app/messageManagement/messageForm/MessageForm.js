/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Reflux from 'reflux';
import { Icon, DatePicker, Button, Form,message, Tooltip,Input, Checkbox, Upload, Select ,Switch ,Radio,Modal} from 'antd';
import store from './store';
import Actions from './Actions';
// import getValue from 'get-value';
import getQuery from '../../../common/js/getQuery';
import './assets/css/messageForm.less';
import moment from 'moment';
// 服务端签名上传
import UploadPic from '../../../common/js/upload'; 
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class Component extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      checked:true,
      files:[],
      filter:{
        type:2,
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
  /*
    
   */
  componentDidMount() {
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
        filter.pushStatus = 0;
        state.filter = filter;
        return state;
      },() =>{
        Actions.getMsgById({
          data:{
            msgId:this.state.filter.msgId,
          }
        })
      })    
    }else{
      this.setState((state) => {
        const { filter } = state;
        state.checked = true;
        filter.msgId = '',
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
  //是否发送通知,展开
  onSwitchChange(checked) {
    Actions.switchChange(checked)
  }
  //客户端通知标题
  onPushTitle(val){
    const value = val.target.value;
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
      state.filter = filter;
      return state;
    })
  }
  // 发布时间切换
  onRadioChange(val) {
    const value = val.target.value;
    Actions.radioChange(value);
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
// 上传照片
  successCallBack(fileUrl) {
    Actions.imageSelected(fileUrl)
  }
// 限制时间
  disabledDate(current) {
    return current && current.valueOf() < Date.now();
  }
  // 提交表单
  onSubmitMessageForm(e) {
    const {filter} = this.state;
    const {image} = filter;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      
      if (!err) {
        if(!image){
          message.error("请上传封面");
          return ;
        }
        Actions.saveAndUpdateMsg({
          data:this.state.filter
        })
      }
    });  
  }
  // 返回
  onBackHistory() {
    history.go(-1);
  }
  render() {
    const { className, form } = this.props;
    const { getFieldDecorator } = form;
    const { data ,checked,filter, previewImage,files} = this.state;
    const {push,pushStatus,title,image,abbr,url,pushTitle,pushAbbr,pushDate,msgId} =filter;
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
        <Form> 
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
                disabled={(pushStatus =="2" ||pushStatus=="3")? true :false}
                maxLength="50"
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
                disabled={(pushStatus =="2" || pushStatus=="3")? true :false}
                maxLength="50"
                value = {pushAbbr}
              />
            )}
          </FormItem>
        </Form>
      :null
    )
    return (
    <div className="crimeForm">
      <Form  onSubmit={this.onSubmitMessageForm.bind(this)}>
      {
        (pushStatus =="2" || pushStatus =="3" ) ? null  :
        <FormItem
          {...formItemLayout}
          label="类型"
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [{
              required: true,
              message: '请选择消息类型',
            }],
          })(
            <Select placeholder="请选择消息类型">
              
              <Option value="2">微蚁团队</Option>
            </Select>
          )}
        </FormItem>
      }
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
              <Input onChange={this.onTitleChange.bind(this)} disabled={((pushStatus =="2" ||pushStatus=="3")? true :false)} maxLength="50" />
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
            <Input onChange={this.onAbbrChange.bind(this)} disabled={((pushStatus =="2" ||pushStatus=="3")? true :false)} maxLength="50" />
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
                <div id="container" className={`${className}-wrapper`}>
                  <div id="selectfiles" className={`${className}-input`} />
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
              pattern: /^[http|microants]/,
              message: '请输入合法的url',
            }, {
              required: true,
              message: '请输入地址',
            }],
            initialValue: (msgId ? data.url : ''),
          })(
            <Input onChange={this.onUrlChange.bind(this)} disabled={((pushStatus =="2" ||pushStatus=="3")? true :false)} maxLength="128" />
          )}
        </FormItem>
      {
        (data.pushStatus =="2" || data.pushStatus =="3" ) ? null :
        <FormItem
          {...formItemLayout}
          label="发布时间"
          hasFeedback
        >
          {getFieldDecorator('发布时间', {
            
          })(
          <div>
            <RadioGroup onChange={this.onRadioChange.bind(this)} value={push} >
              <Radio  value={1}>
                立即发布
              </Radio>
              <Radio value={0}>
                
              </Radio>      
            </RadioGroup>  
            <DatePicker 
              showTime={{hideDisabledOptions: true}}  
              format="YYYY-MM-DD HH:mm:ss" 
              placeholder="选择时间" 
              disabledDate={this.disabledDate}
              onChange={this.onPushDate.bind(this)}
              value={this.state.filter.pushDate ? moment(this.state.filter.pushDate) : null}
            /> 
          </div>   
          )}
        </FormItem>
      }
      {
        (data.pushStatus =="2" || data.pushStatus =="3" ) ? null  :
        <FormItem
          {...formItemLayout}
          label="发送通知"
        >
          {getFieldDecorator('发送通知', { })(
            <Switch checked={checked} onChange={this.onSwitchChange.bind(this)} checkedChildren={'开'} unCheckedChildren={'关'}/>
          )}
        </FormItem>
      }
        {pushMsg}

        <FormItem {...tailFormItemLayout}>
          {  
            (pushStatus =="0" ||pushStatus=="1") ?
              <Button htmlType="submit" size="large">提交</Button>
            :null
          }
          
        </FormItem>
      </Form>
      <Button size="large" onClick={this.onBackHistory.bind(this)} className="goBack">返回</Button> 
    </div>
    );
  }
}

Component.defaultProps = {
  className: 'messageForm',
  form: {},
};

Component.propTypes = {
  className: React.PropTypes.string,
  form: React.PropTypes.objectOf(React.PropTypes.any),
};

export default Form.create()(Component);
