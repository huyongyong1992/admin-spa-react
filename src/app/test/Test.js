
import React from 'react';
import Reflux from 'reflux';
import { Input, Button,message,Select } from 'antd';
import store from './store';
import Actions from './Actions';
import './assets/css/index.less';
import AmplifyImage from '../../components/amplifyImage'
const Option = Select.Option;
const OptGroup = Select.OptGroup;

class Component extends Reflux.Component {
	 constructor(props) {
    super(props);
    this.state = {
      data:[],
      type:1,
      dataa:[],
      datab:[],
      datac:[],
    }
    this.store = store;
  }

  componentDidMount() {
    Actions.getInfoTestData({
      data:{
        dota:"bannong",
        type:1,
      }
    })
    
  }
  onTextChange(val) {
    const value = val.target.value;
    Actions.textChange(value);
  }
  onInputChange(val) {
    const value = val.target.value;
    Actions.inputChange(value); 
  }
  onSubmits() {
    Actions.getInfoTest({
      data:{
        dota:this.state.dota,
        $test_api_: this.state.$test_api_,
        params:this.state.textareaVal,
      }
    })
  }
  onClear() {
    Actions.clear()
  }
  onFirstChange(code,type) {
    Actions.firstChange(code,type);
  } 
  onSecondChange(code,type) {
    Actions.secondChange(code,type);
  }
  onThirdChange(code,type) {
    Actions.thirdChange(code,type);
  }
  render() {
    const{ inputVal,textareaVal,list,data,dataa,datab,datac,$test_api_} = this.state;
    console.log(data)
    const second = dataa.map((second,i) =>(
      <Option key={i+100} value={second} >{second}</Option>
    ))
    const third = datab.map((third,i) =>(
      <Option key={i+1000} value={third.api} >{third.name+"->"+third.api}</Option>
    ))

    // const fourth = datac.map((fourth,i) =>(
    //   <Option key={i+10000}>{fourth.subModule}</Option>
    // ))

    // console.log(data);
    // const first = [];
    // const second = [];
    // const third = [];
    // const fourth = [];
    // for(let i=0;i<data.length;i++) {
    //   first.push(data[i].moduleName);
    //   if(data[i].subModule) {
    //     for(let j=0;j<data[i].subModule.length;j++) {
    //       second.push(data[i].subModule[j].subModuleName);
    //       if(data[i].subModule[j].interfaceList) {
    //         for(let k=0;k<data[i].subModule[j].interfaceList.length;k++) {
    //           third.push(data[i].subModule[j].interfaceList[k].name);
    //           fourth.push(data[i].subModule[j].interfaceList[k].api);
    //         }
    //       }
    //       console.log(data[i].subModule[j].interfaceList)
    //     }
    //   }
    // }

    // const firstOpt = first.map((first,i) =>{
    //   return(< Option key={i}>{first}</Option>)
    // })
    // const secondOpt = second.map((second,i) =>{
    //   return(< Option key={i+100}>{second}</Option>)
    // })
    // const thirdOpt = third.map((third,i) =>{
    //   return(< Option key={i+1000}>{third}</Option>)
    // })
    // const fourthOpt = fourth.map((fourth,i) =>{
    //   return(< Option key={i+1000}>{fourth}</Option>)
    // })
    return (
      <div className="test">
         <div className="select">
          {/*
            <Select style={{width:200}}>{firstOpt}</Select>
            <Select style={{width:200}}>{secondOpt}</Select>
            <Select style={{width:200}}>{thirdOpt}</Select>
            <Select style={{width:200}}>{fourthOpt}</Select>
          */}
            <Select onChange={this.onFirstChange.bind(this,"2")} style={{width:120}}><Option key={1} >{data.length ? data[0].moduleName :null}</Option></Select>
            <Select style={{width:120}} onChange={this.onSecondChange.bind(this,"3")}>{second}</Select>
            <Select style={{width:400}} onChange={this.onThirdChange.bind(this,"4")}>{third}</Select>
            {/*<Select style={{width:200}}>{fourth}</Select>*/}
         
          </div>
        
        <Button onClick={this.onClear.bind(this)}>清除内容</Button>

        <Button onClick={this.onSubmits.bind(this)}>提交</Button>

       
        <div className="inputTest">
          <div className="params">
            <div className="inputParams">入参:</div>
            <Input onChange={this.onTextChange.bind(this)} value={textareaVal} placeholder="请输入参数" type="textarea" rows={4}/>
          </div>
        </div>
        <div className="test-foot">
          <div className="test-api"><div className="inputParams">api:</div>{$test_api_}</div>
          <div className="test-api"><div className="inputParams">request:</div>{textareaVal}</div>
          <div className="test-api"><div className="inputParams">response:</div><Input className="test-wrap" value={list&&list.response} type="textarea" rows={12}/></div>
        </div>
        
        <AmplifyImage />
      </div>
    );
  }
}

Component.defaultProps = {
};

Component.propTypes = {
};

export default Component;
