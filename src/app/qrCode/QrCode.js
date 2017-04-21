
import React from 'react';
import Reflux from 'reflux';
import { Input, Button,message } from 'antd';
import store from './store';
import Actions from './Actions';
import './assets/css/index.less';

const BUTTON_TYPE = {
  false: '生成',
  true: '解锁'
}

class Component extends Reflux.Component {
	 constructor(props) {
    super(props);
    this.state = {
      data:{},
    }
    this.store = store;
  }

  onInputChange(e) {
    const value = e.target.value;
    Actions.inputChange(value);
  }
  onClicked() {
    Actions.clicked();
  }

  render() {
    const { className } = this.props;
    const { btnState, data } = this.state;
    return(
      <div className={className}>
        <div className={`${className}-title`}>公众号二维码</div>
        <div className={`${className}-input`}>
          <span>请输入数字:</span>
          <Input placeholder="请输入3开头的四位数字" onChange={this.onInputChange.bind(this)} maxLength="4" />
          <Button onClick={this.onClicked.bind(this)} className={`${className}-button ${btnState ? 'active' : ''}`}>{BUTTON_TYPE[btnState]}</Button>
        </div>
        {
          data.qrUrl ?
            <div className={`${className}-url`}>
              <span>二维码地址</span><a href={data.qrUrl} target="_blank">{data.qrUrl}</a>
            </div>
          :null
        }
      </div>

    )
  }
}

Component.defaultProps = {
  className: 'qrCode',
};

Component.propTypes = {
};

export default Component;
