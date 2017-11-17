/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Reflux from 'reflux';
import { Button, Input, message, Select, Table ,Popover} from 'antd';
import store from './store';
import Actions from './Actions';
import Popovers from '../../../components/popover';
// import PopoverMenu from '../../../components/popoverMenu';
import './assets/css/commercialCheck.less';

const Search = Input.Search;
const Option = Select.Option;

class Component extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      list: [],
      clicked:[],
      supCates: [],
      subCates: [],
      subChangeCates: [],
      selectedRows: '',
      selectedRowKeys:[],
      filter: {
        key: '',
        l1: '',
        l2: '',
        at: '',
        cs: 0,
        pn: 1,
        ps:10
      },
      l3:'',
      l4:'',
      visible:false,
      clickedId:[],
      showPic:false,
      bigPicture:'',
    };
    this.onSearch = this.onSearch.bind(this);
    this.onSupCatChange = this.onSupCatChange.bind(this);
    this.onSubCatChange = this.onSubCatChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onPass = this.onPass.bind(this);
    this.onReject = this.onReject.bind(this);
    this.onBatchPass = this.onBatchPass.bind(this);
    this.onBatchReject = this.onBatchReject.bind(this);
    this.store = store;
  }

  componentDidMount() {
    const { filter } = this.state;

    Actions.listSubjects({
      data: filter,
    }, (msg) => {
      message.error(msg.errorMsg || msg.message);
    });

    Actions.sysCates({
      data: {
        level:2
      },
    }, 'supCates', (msg) => {
      message.error(msg.errorMsg || msg.message);
    });
  }
  // 关键词搜索
  onSearch(key) {
    const reg = /^1\d{10}$/ ;
    if(!(reg.test(key))) {
      message.error("您输入的手机号码不正确");
      return ;
    }
    this.setState((state) => {
      const { filter } = state;
      filter.key = key;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      });
    });
  }
  onKeyChange(key) {
    const keyWord = key.target.value;
    this.setState((state) => {
      const { filter } = state;
      filter.key = keyWord;
      state.filter = filter;
      return state;
    })
  }

  onSupCatChange(value) {
    this.setState((state) => {
      const { filter } = state;
      filter.l1 = value;
      filter.l2 = '';
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
      // 选中一级类目后,筛选出改类目下产品并加载二级类目
      /*
      Actions.sysCates({
        data:{
          level:3,
          id:this.state.filter.l1,
        }
      },'subCates',(e) => {
        message.error(e.errorMsg || e.message);
      })
      */
    });
  }
// 选择二级分类
  onSubCatChange(value) {
    this.setState((state) => {
      const { filter } = state;
      filter.l2 = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
// 选择用户类型
  onUserChange(value) {
    this.setState((state) => {
      const { filter } = state;
      filter.at = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
// 分页
  onPageChange(value) {
    this.setState((state) => {
      const { filter } = state;
      filter.pn = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      });
    });
  }
  onShowSizeChange(pageNo,pageSize) {
    this.setState((state) => {
      const { filter } = state;
      filter.ps = pageSize;
      filter.pn = pageNo;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      });
    });
  }
  onShowTotal(total) {
    return `共${total}条`
  }

  onPass(id,bid) {
    Actions.checkSubject({
      data: {
        id:id,
        bid:bid,
        t: 0,
        r: '',
      },
    }, (msg) => {
      message.error(msg.errorMsg || msg.message);
    }, () => {
      message.success('批准求购成功');
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
// 批量通过
  onBatchPass() {
    const {selectedRows} = this.state;
    if(selectedRows){
      Actions.batchCheckSubject({
        data: {
          ids:selectedRows,
          t: 0,
          r: '',
        },
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      }, () => {
        Actions.listSubjects({
          data: this.state.filter,
        }, (msg) => {
          message.error(msg.errorMsg || msg.message);
        },() =>{
          message.success('批准求购成功');
          this.setState({
            selectedRows:'',
            selectedRowKeys:[],
          })
          
        });
      });
    }else{
      message.error("请选中要通过项")
    }  
  }
  onReject(params) {
    Actions.checkSubject({
      data: params,
    }, (msg) => {
      message.error(msg.errorMsg || msg.message);
    }, () => {
      message.success('驳回求购成功');
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
// 批量驳回
  onBatchReject(r) {
    const {selectedRows} = this.state;
    if(selectedRows){
      Actions.batchCheckSubject({
        data: {
          ids: selectedRows,
          t: 1,
          r,
        },
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      }, () => {   
        Actions.listSubjects({
          data: this.state.filter,
        }, (msg) => {
          message.error(msg.errorMsg || msg.message);
        },() =>{
          message.success('驳回求购成功');
          this.setState({
            selectedRows:'',
            selectedRowKeys:[],
          })
        });
      });
    }else{
      message.error("请选中需要驳回项")
    }
    
  }
// 冻结账户,一期不做
  onFreeze(mobile, freezeReason) {
    Actions.freezeUser({
      data: {
        mobile,
        freezeReason,
      },
    }, (msg) => {
      message.error(msg.errorMsg || msg.message);
    }, () => {
      message.success('冻结用户成功');
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
 
  // 修改分类
  
  //修改一级分类
  onChangeSysSupCates(value) {
    const {l3,visible} = this.state;
    this.setState({
      l3:value,
      visible:true,
    },() =>{
      
      /*
      Actions.sysCates({
        data:{
          level:3,
          id:this.state.l3,
        }
      },'subChangeCates',(e) => {
        message.error(e.errorMsg || e.message);
      })
      */
    })
  }
  // 修改二级分类
  onChangeSysSubCates(value) {
    const {l4,visible} = this.state;
    this.setState({
      l4: value,
      visible:true,
    })
  }
  // 确定修改
  onChangeSysCates(sid) {
    const { visible } = this.state;
    this.setState({
      visible:false,
    })
    
    Actions.changeCate({
      data:{
//        cid: this.state.l4,
        cid: this.state.l3,
        sid:sid,
      }
    },() =>{
      Actions.listSubjects({
        data:this.state.filter,
      })
    
    })
  }
// 取消修改
  onCancleChangeSysCates() {
    this.setState({
      visible:false,
      l4:'',
      l3:'',
    })
  }


  isActive(ids) {
    const { clickedId } = this.state;
    return clickedId.some(id => id === ids);
  }

  handleVisibleChange (id) {
    const {visible} = this.state;
    const {clickedId} = this.state;
    const value = this.isActive(id) ? clickedId.filter(item => item !== id) : [id];  
    this.setState({ visible:true,clickedId: value, });  
  }
 // 批量选择
  onSelectChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys:selectedRowKeys})
  }
//看大图
  onShowBigPicture(img) {
    this.setState({
      showPic:!this.state.showPic,
      bigPicture:img,
    })
  }
  onHideBigPic() {
    this.setState({
      showPic:false,
    })
  }
  render() {
    const { list, supCates, subCates, subChangeCates,total, filter ,visible,selectedRowKeys,l3 ,showPic ,bigPicture} = this.state;
    const { pn ,l1,l2} =filter ;
    const { className } = this.props;
    
    const supOptions = supCates.map(cate => (
      <Option key={cate.v} value={cate.v}>{cate.n}</Option>
    ));
    const subOptions = subCates.map(cate => (
      <Option key={cate.v} value={cate.v}>{cate.n}</Option>
    ));
    const subChangeCatesOptions = subChangeCates.map((cate,i) => (
      <Option key={i} value={cate.v}>{cate.n}</Option>
    ));
    
    const columns = [{
      title: '账号(手机号)',
      dataIndex: 'mb',
      className:'commercialUser',
    },{
      title: '求购ID',
      dataIndex: 'uid',
      className:'uid',
    },{
      title: '昵称',
      dataIndex: 'nn',
      className:'nn',
    },{
      title: '分类',
      dataIndex: 'ct',
      className:'commercialVarify',
      render: (text,record) =>{
        const content =(
          <div key={`{Math.random()}`}>
            <Select key={1} placeholder="修改一级分类" size="large" style={{ width: 130 }} onChange={this.onChangeSysSupCates.bind(this)} >
                {supOptions}
            </Select>
            {/*
            <Select key={`{Math.random()+10}`} placeholder="修改二级分类" size="large" style={{ width: 130 }} onChange={this.onChangeSysSubCates.bind(this)} notFoundContent="请先选择一级分类">
                {subChangeCatesOptions}
            </Select>
            */}
            <Button onClick={this.onChangeSysCates.bind(this,record.id)}>确定</Button>
            <Button onClick={this.onCancleChangeSysCates.bind(this)}>取消</Button>
          </div>
        );
        return(
          <div>
            {text}
             
              <Popover 
                content={ content } 
                title="修改分类" 
                trigger="click" 
                
                overlayStyle={{display:(this.isActive(record.id)&&visible ? 'block' :'none')}}
                
                visible={visible} 
              >
                <Button onClick={this.handleVisibleChange.bind(this,record.id)}>修改分类</Button>
              </Popover>
              {/* onVisibleChange={this.handleVisibleChange.bind(this,record.id)}*/}
          </div>
        )   
      }
    }, {
      title: '标题/描述',
      dataIndex: 'ds',
      className:'commercialDetail',
      render:(text,record) =>{
        return(
          <div>
            <strong>{record.pn}</strong><br />
            {text}
          </div>
        );  
      }
    },{
      title: '图片',
      dataIndex: 'ps',
      className:'commercialPic',
      render: (text,record) => {
        return(
          <div className={`${className}-table-pictures`}>
          {
            record.ps.map((img, i) => <img alt="" key={i} className={`${className}-table-pictures-img`} src={img.p} onClick={this.onShowBigPicture.bind(this,img.p)}/>)
          }
        </div>
        )
      }
    },{
      title: '发布时间',
      dataIndex: 'ts',
      className:'commercialTime',
    }, {
      title: '操作',
      dataIndex: '',
      fixed:'right',
      className:'operate',
      render: (text, record) => {
        const me = this;
        const handleConfirm = id => (value) => {
          me.onReject({
            id:record.id,
            bid:record.uid,
            t: 1,
            r: value,
          });
        };
        return (
          <div className={`${className}-table-actions`}>
            <div>
              <Popovers
                title="请填写驳回原因"
                trigger="click"
                handleConfirm={handleConfirm(record.id,record.uid)}
              >
                <button className={`${className}-table-actions-reject`}>驳回</button>
              </Popovers>
              <button onClick={this.onPass.bind(this, record.id,record.uid)} className={`${className}-table-actions-pass`}>通过</button>
            </div>
            <div>
              {/*<Popovers
                title="请填写冻结原因"
                trigger="click"
                handleConfirm={this.onFreeze.bind(this, record.mb)}
              >
                <button className={`${className}-table-actions-freeze`}>冻结账号</button>
              </Popovers>
              */}
            </div>
          </div>
        );
      },
    }];
    const rowSelection = {
      onSelect: (record, selected, selectedRows) => {
        
        this.setState({
          selectedRows: selectedRows.map(v => (v.id+','+v.uid)).join(':'),
        });
      },
      onSelectAll: (selected, selectedRows) => {
        this.setState({
          selectedRows: selectedRows.map(v => (v.id+','+v.uid)).join(':'),
        });
      },
      selectedRowKeys:selectedRowKeys,
      onChange: this.onSelectChange,
    };
      // const rowSelection = {
      //   selectedRowKeys,
      //   onChange: this.onSelectChange,
      // };
    const footer = () => (
      <div className={`${className}-table-footer`}>
        <Popovers
          title="请填写驳回原因"
          trigger="click"
          handleConfirm={this.onBatchReject}
        >
          <Button className={`${className}-table-footer-reject`}>驳回选中项</Button>
        </Popovers>
        
          <Button onClick={this.onBatchPass} className={`${className}-table-footer-pass`}>通过选中项</Button>
        
      </div>
    );

    return (
      <div className={className}>
        <p className={`${className}-title`}>微信好友列表</p>
        <div className={`${className}-filter`}>
          <label htmlFor="search">搜索：</label>
          <Search style={{ width: 170, marginRight: 16 }} placeholder="输入搜索关键词" onSearch={this.onSearch} onChange={this.onKeyChange.bind(this)} maxLength="30"/>
          <label htmlFor="category">分类：</label>
          <Select placeholder="选择一级分类" size="large" style={{ width: 110 }} onChange={this.onSupCatChange} value={l1} defaultValue="">
            <Option value={''}>全部分类</Option>
            {supOptions}
          </Select>
          {/*
          <Select placeholder="选择二级分类" size="large" style={{ width: 110, margin: '0 16px 0 8px' }} onChange={this.onSubCatChange} notFoundContent="请先选择一级分类" value={l2} defaultValue="">
            <Option value={''}>全部分类</Option>
            {subOptions}
          </Select>
          */}
          <label htmlFor="user">选择用户：</label>
          <Select size="large" defaultValue="-1" style={{ width: 110 }} onChange={this.onUserChange}>
            <Option value="-1">全部用户</Option>
            <Option value="0">未认证用户</Option>
            <Option value="3">特邀采购员</Option>
            <Option value="1">实名认证用户</Option>
            <Option value="2">企业认证用户</Option>
          </Select>
        </div>
        <div className={`${className}-table`}>
          <Table
            rowSelection={rowSelection}
            scroll={{ x: 1800 }}
            columns={columns}
            dataSource={list}
            footer={footer}
            pagination={{
              total,
              onChange: this.onPageChange,
              current: filter.pn,
              showQuickJumper: true,
              showSizeChanger:true,
              onShowSizeChange:this.onShowSizeChange.bind(this),
              showTotal:this.onShowTotal.bind(this),
            }}
            bordered
          />
        </div>
        <div className={`showBigPic ${showPic ? 'showActive' : null}`} onClick={this.onHideBigPic.bind(this)}>
          {/*<div className="small">缩小</div>*/}
          <img src={bigPicture} className="bigPicture"/>
          {/*<div className="huge">放大</div>*/}
        </div>
      </div>
    );
  }
}

Component.displayName = 'CommercialCheck';

Component.defaultProps = {
  className: 'commercialCheck',
};

Component.propTypes = {
  
};

export default Component;
