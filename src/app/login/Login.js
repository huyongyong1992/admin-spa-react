/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
import React from 'react';
import Reflux from 'reflux';
import { Icon, Button, Form, Input ,message} from 'antd';
import store from './store';
import Actions from './Actions';
import './assets/css/login.less';

const FormItem = Form.Item;

class Component extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile:'',
      pwd:'',
    }
    this.store = store;
  }
  onLogIn() {
    Actions.login({
      data:{
        mobile:this.state.mobile,
        pwd:this.state.pwd,
      }
    },() =>{
    })
  }
  onPwdChange(val){
    const value = val.target.value;
    this.setState({
      pwd:value
    })
  }
  onIdChange(val){
     const value = val.target.value;
    this.setState({
      mobile:value
    })
  }
  render() {
    const { className, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={className}>
        <h1 className={`${className}-title`}>后台管理系统</h1>
        <Form
          className={`${className}-form`}
          
        >
          <FormItem>
            {getFieldDecorator('mobile', {
              rules: [{
                required: true,
                message: '请输入手机号',
              }],
            })(
              <Input addonBefore={<Icon type="user" />} placeholder="请输入手机号" onChange={this.onIdChange.bind(this)}/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('pwd', {
              rules: [{
                required: true,
                message: '请输入密码',
              }],
            })(
              <Input addonBefore={<Icon type="lock" />} type="password" placeholder="请输入密码" onChange={this.onPwdChange.bind(this)}/>
            )}
          </FormItem>
          <FormItem className={`${className}-form-submit`}>
            <Button type="primary" htmlType="submit" onClick={this.onLogIn.bind(this)}>登录</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'login',
  form: {},
};

Component.propTypes = {
  className: React.PropTypes.string,
  form: React.PropTypes.objectOf(React.PropTypes.any),
};

export default Form.create()(Component);
