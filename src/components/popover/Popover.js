/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Input, Popover, Button } from 'antd';
import './assets/css/popover.less';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: '',
    };
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onVisibleChange = this.onVisibleChange.bind(this);
  }

  onCancel() {
    this.setState({
      visible: false,
    });
  }

  onConfirm() {
    const { value } = this.state;
    const { handleConfirm } = this.props;

    // 驳回理由不能为空，且不超过200字
    if (value && value.length < 200) {
      this.setState({
        visible: false,
        value: '',
      }, () => {
        handleConfirm(value);
      });
    } else {
      alert('理由不能为空，且不超过200字');
    }
  }

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  onVisibleChange(visible) {
    this.setState({
      visible,
    });
  }

  render() {
    const { children,placeholder,defaultValue, className, ...otherProps } = this.props;
    const { visible, value } = this.state;
    const content = (
      <div className={`${className}-content`}>
        <Input className={`${className}-content-input`} onChange={this.onChange} value={value} type="textarea" size="small" placeholder={placeholder} defaultValue={defaultValue}/>
        <div className={`${className}-content-btns`}>
          <Button className={`${className}-content-btns-confirm`} onClick={this.onConfirm}>确定</Button>
          <Button className={`${className}-content-btns-cancel`} onClick={this.onCancel}>取消</Button>
        </div>
      </div>
    );

    return (
      <Popover
        className={className}
        placeholder={placeholder}
        content={content}
        visible={visible}
        defaultValue={defaultValue}
        onVisibleChange={this.onVisibleChange}
        {...otherProps}
      >
        {children}
      </Popover>
    );
  }
}

Component.displayName = 'Popover';

Component.defaultProps = {
  className: 'popover',
  placeholder:'',
  children: null,
  handleConfirm: () => {},
};

Component.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.element,
  handleConfirm: React.PropTypes.func,
};

export default Component;
