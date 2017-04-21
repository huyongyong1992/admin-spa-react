/*
* @Author: huyongyong1992
* @Date:   2017-03-17 09:38:20
* @Last Modified by:   huyongyong1992
* @Last Modified time: 2017-03-17 10:32:05
*/
import React from 'react';
import './assets/css/amplifyImage.less';
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow:false,
    
    }
  }
  onHideImg() {
    this.setState({
      isShow:false,
    })
  }
  onShow() {
    this.setState({
      isShow:true,
    })
  }
  render() {
    const { className, onClick } = this.props;
    const { isShow } = this.state;
    return(
      <div>
      <div className={`${className} ${isShow ? 'amplifyImage-active' :''}`}>
        <div className={`${className}-left`}>
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489725368749&di=20f1d60bea32b388c7087039a16213fe&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20140417%2F10215939.png"/>
        </div>
        <div className={`${className}-center`}>
          <img onClick={this.onHideImg.bind(this)} src="http://f.hiphotos.baidu.com/news/q%3D100/sign=06b8a4c44236acaf5fe092fc4cd88d03/d009b3de9c82d15801e8be4c890a19d8bd3e42e1.jpg"/>
        </div>
        <div className={`${className}-right`}>
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489725368749&di=20f1d60bea32b388c7087039a16213fe&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20140417%2F10215939.png"/>
        </div>
      </div>
      <button onClick={this.onShow.bind(this)}>测试</button>
      </div>
    )
  }
}
Component.displayName = 'AmplifyImage';
Component.defaultProps = {
  className: 'amplifyImage',
  handleClick: () => {},
  onClick: () => {},
};
Component.propTypes = {
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
};
export default Component;

