/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Reflux from 'reflux';
import { Form ,Button,Input,message} from 'antd';
import store from './store';
import Actions from './Actions';
import getQuery from '../../../common/js/getQuery';
import './assets/css/recommendForm.less';
const FormItem = Form.Item;
class Component extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      data:{},
      filter:{
        title:'',
        description:'',
        sort:'',
        shops:'',
      },
      id:'',
    };
    this.store = store;
  }
  componentDidMount() {
    const id = getQuery('id'); 
    if(id) {
      this.setState((state) =>{
        const {filter} = this.state;
        filter.id = id;
        state.filter = filter;
        return state;
      },() =>{
        //获取该ID下的详情
        Actions.getRecmdDetailAdmin({
            data:{
              id:id
            }
        })
      })
    }else{//发布
      this.setState((state) =>{
        const {filter} = this.state;
        filter.title = '';
        filter.description = '';
        filter.sort = '';
        filter.shops = '';
        state.filter = filter;
        return state;
      })
    }
  }
  onTitleChange(e) {
    const value = e.target.value;
    this.setState((state) =>{
      const {filter} = this.state;
      filter.title = value;
      state.filter = filter;
      return state;
    })
  }
  onDescChange(e) {
    const value = e.target.value;
    this.setState((state) =>{
      const {filter} = this.state;
      filter.description = value;
      state.filter = filter;
      return state;
    })
  }
  onOrderChange(e) {
    const value = e.target.value;
    this.setState((state) =>{
      const {filter} = this.state;
      filter.sort = value;
      state.filter = filter;
      return state;
    })
  }
  onShopChange(e) {
    const value = e.target.value;
    this.setState((state) =>{
      const {filter} = this.state;
      filter.shops = value;
      state.filter = filter;
      return state;
    })
  }
  onHandleSubmit() {
    const {filter} = this.state;
    const {shops,title,description,sort} = filter;
    if(!(sort && description && title && shops)) {
      message.error("请完善信息");
      return ;
    }
    const originshopsList = shops.replace(/，/g, ',').split(',');
    const shopsList = ((arr) => {
      const rst = [];
      const json = {};
      for (let i = 0; i < arr.length; i++) {
        const str = arr[i].trim();
        if (str && !json[str]) {
          rst.push(str);
          json[str] = 1;
        }
      }
      return rst;
    })(originshopsList);

    filter.shops = shopsList.join(',');

    if(shopsList.length < 3) {
      message.error("至少输入三个不重复的商铺");
      return ;
    }
    if(this.state.filter.id) {//id存在,说明是编辑,否则是发布
      Actions.modifyRecmdAdmin({
        data:filter
      },() =>{
        history.go(-1);
      }) 
    }else{
      Actions.createRecmdDetailAdmin({
        data:filter
      },() =>{
        // Actions.clearForm();
        message.success("发布成功");
        history.go(-1);
      })
    }  
  }
  
  onBack() {
    history.go(-1);
  }

  render() {
    const { className ,form } = this.props;
    const { data  ,filter} = this.state;
    const { id,title,description,shops,sort } = filter;
    console.log(title);
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };
    return (
      <div className={`${className}`} >
        <div className={`${className}-title`}>
          <div>{id ? '编辑专题' : '新增专题'}</div><Button onClick={this.onBack.bind(this)}>返回</Button>
        </div>
        <Form>
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
              initialValue: (id ? title : ''),
            })(
              <Input onChange={this.onTitleChange.bind(this)} value={title}  maxLength="20" placeholder="请输入标题"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
            hasFeedback
          >
            {getFieldDecorator('描述', {
              rules: [{
                required: true, message: '请输入描述内容',
              }],
              initialValue: (id ? description : ''),
            })(
              <Input type="textarea" value={description} placeholder="请输入描述内容" maxLength="150" onChange={this.onDescChange.bind(this)} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="排序"
            hasFeedback
          >
            {getFieldDecorator('排序', {
              rules: [{
                required: true, message: '请输入四位排序数字',
              }],
              initialValue: (id ? sort : ''),
            })(
              <Input placeholder="最多四位数字" value={sort} onChange={this.onOrderChange.bind(this)} maxLength="4"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="添加商铺"
            hasFeedback
          >
            {getFieldDecorator('添加商铺', {
              rules: [{
                required: true, message: '请输入描述内容',
              }],
              initialValue: (id ? shops : ''),
            }) (
              <Input placeholder="请输入至少三个商铺,并以逗号隔开" value={shops}  type="textarea" onChange={this.onShopChange.bind(this)} />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>         
            <Button htmlType="submit" size="large" onClick={this.onHandleSubmit.bind(this)}>提交</Button>
          </FormItem>
        </Form>
        
      </div>
    );
  }
}
Component.defaultProps = {
  className: 'recommendForm',
};

Component.propTypes = {
  className: React.PropTypes.string,
};


export default Form.create()(Component);
