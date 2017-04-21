/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Reflux from 'reflux'; 
import store from './store';
import Actions from './Actions';
import { Alert ,Modal ,Button,message } from 'antd';
import './assets/css/feedbackSetting.less';
import Popover from '../../../components/popover';
const confirm =Modal.confirm;
class Component extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyData : [],
      sellData: [],
      active:'',
      visible: false,
      buyVisible:false,
      ModalText:"删除后不可恢复...",
      selected:[],
    }
    this.store = store;
  }
  componentDidMount(){
    Actions.loadlabels({
      data:{
        roletype:2
      }
    })
    Actions.loadlabels({
      data:{
        roletype:4
      }
    })
  }
  // 添加标签
  onManageLabel(optype,roletype,cont) {  
    Actions.manageLabel(optype,roletype,cont);
  }
  // 删除标签
  onDelLabel(optype,roletype,cont) {
    this.setState({
      ModalText: '数据处理中...',
      confirmLoading: true,
      buyVisible:false,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        buyVisible:false,
        confirmLoading: false,
      });

    }, 1000);
    
    // window.location.reload();
    // 删除标签
    Actions.labelmgr({
      data:{
        optype:optype,
        roletype:roletype,
        content:cont,
      }
    },() =>{
      // 删除成功后调用刷新标签
      Actions.loadlabels({
        data:{
          roletype:roletype
        }
      })
      this.setState({
        ModalText: '删除后不可恢复...',
        confirmLoading: true,
        buyVisible:false
      });
    });    
  }
  
  handleCancel() {
    this.setState({
      visible: false,
      buyVisible:false,
    });
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  showBuyModal(v) {
    const { selected } = this.state;
    const value = this.isActive(v) ? selected.filter(item => item !== v) : [...selected, v];
    console.log(value)
    this.setState({
      selected:value,
    })
  }

  isActive(id) { 
    const { selected } = this.state;
    return selected.some(v => v === id);
  }
  render() {
    const { buyData,sellData } = this.state;
    // 买家标签
    const buyLabels = buyData.map((buyData,i) =>(
      <div className={`label ${buyData.id}`} key={i}>
        <span>{buyData.name}</span>
        <span className="delete" onClick={this.showBuyModal.bind(this,buyData.id)}>X</span>
        <Modal title="你确定要删除这个标签吗"
          visible={this.isActive(buyData.id) ? true : false}
          onOk={this.onDelLabel.bind(this,"-1","2",buyData.id)}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel.bind(this)}
          
        >
          <p>{this.state.ModalText}</p>
        </Modal>
      </div>
    ));
    // 卖家标签
    const sellLabels = sellData.map((sellData,i) =>(
      <div className="label" key={i}>
        <span>{sellData.name}</span>
        <span className="delete" onClick={this.showBuyModal.bind(this,sellData.id)}>X</span>
        <Modal title="你确定要删除这个标签吗"
          visible={this.isActive(sellData.id) ? true : false}
          onOk={this.onDelLabel.bind(this,"-1","4",sellData.id)}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel.bind(this)}
        >
          <p>{this.state.ModalText}</p>
        </Modal>
      </div>
    ));
    return (
      <div className="header">
        <div className="setting">
          <h1>采购商端设置</h1>
          <div className="setLabel">
            <div className="labelHead">求购评价标签设置:</div>
              {buyLabels}

            <div className="addLabel" >
              <Popover
                title="请填写标签名"
                placeholder="最多输入8个字"
                trigger="click"
                handleConfirm={this.onManageLabel.bind(this,"1","2")}
              >
                <Button size="small" >添加标签</Button>
              </Popover>
            </div>
          </div>
          
          <div className="ansWord">反馈自动回复文字:</div>
          <div className="setAnswer">
            <textarea placeholder="用户在提交反馈时,自动回复的文字信息"></textarea>
            <button>保存</button>
          </div>
        </div>  

        <div className="setting">
          <h1>供应商端设置</h1>
          <div className="setLabel">
            <div className="labelHead">商机评价标签设置:</div>
              {sellLabels}

            <div className="addLabel" >
              <Popover
                title="请填写标签名"
                trigger="click"
                placeholder="最多输入8个字"
                handleConfirm={this.onManageLabel.bind(this,"1","4")}
              >
                <Button size="small">添加标签</Button>
              </Popover>
            </div>
          </div>
          
          <div className="ansWord">反馈自动回复文字:</div>
          <div className="setAnswer">
            <textarea placeholder="用户在提交反馈时,自动回复的文字信息"></textarea>
            <button>保存</button>
          </div>
        </div>  
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'feedbackSetting',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

export default Component;
