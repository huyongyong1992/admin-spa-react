/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Popover, Button ,Select} from 'antd';
import './assets/popoverMenu.less';
import Actions from './Actions';
import Reflux from 'reflux';
import store from './store';

const Option = Select.Option;
class Component extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      visible: false,
      popoverSup:'',
      popoverSub:'',
      cid:'',
    };
    this.store = store;
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    
    this.onVisibleChange = this.onVisibleChange.bind(this);
  }

  onCancel() {
    this.setState({
      visible: false,
    });
  }

  onConfirm() {
    const { cid } = this.state;
    const { handleConfirm } = this.props;
    this.setState({
      visible: false,
    },() =>{
      handleConfirm(cid);
    
    });

  }

 

  onVisibleChange(visible) {
    this.setState({
      visible,
    });
  }
  onSupModifyChange(val){
    const { popoverSup , visible} = this.state;
    this.setState({
      popoverSup:val,
      visible:true,
     
    });
  }
  onSubModifyChange(val){
    const { popoverSub , visible} = this.state;
    this.setState({
      popoverSub:val,
      visible:true,
      cid:val,
    });
  }

  render() {
    const {supCates, subCates,visible,popoverSup } = this.state;

    const { children, className, ...otherProps } = this.props;
    const firstLevel = data.map(firstLevel =>(
      <Option key={firstLevel.v} value={firstLevel.v}>{firstLevel.n}</Option>
    ))
    const content = (
      <div className={`${className}-content`}>
        <div className="menuLevel">
          <div className="firstLeveMenu">
            <div>选择一级分类:</div>
            <Select 
              placeholder="选择一级分类"
              style={{ width: 150 }}
              onChange={this.onSupModifyChange.bind(this)}
            >
              { firstLevel }
            </Select>       
          </div>
          <div className="secondLevelMenu">
            <div>选择二级分类:</div>
            <Select 
              placeholder="选择二级分类"
              style={{ width: 150 }}
              onChange={this.onSubModifyChange.bind(this)}
            >
              { firstLevel }
            </Select>
          </div>
        </div>
        
        <div className={`${className}-content-btns`}>
          <Button className={`${className}-content-btns-confirm`} onClick={this.onConfirm}>确认修改</Button>
          <Button className={`${className}-content-btns-cancel`} onClick={this.onCancel}>取消</Button>
        </div>
      </div>
    );

    return (
      <Popover
        className={className}
        content={content}
        visible={visible}
        onVisibleChange={this.onVisibleChange}
        {...otherProps}
      >
        {children}
      </Popover>
    );
  }
}

Component.displayName = 'PopoverMenu';

Component.defaultProps = {
  className: 'popoverMenu',
  children: null,
  handleConfirm: () => {},
};

Component.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.element,
  handleConfirm: React.PropTypes.func,
};

export default Component;
