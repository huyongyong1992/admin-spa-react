/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Actions from './Actions';
import Reflux from 'reflux';
import store from './store';
import Header from '../../components/header';
import {message} from 'antd';
import Menu from '../../components/menu';
import './assets/css/root.less';
import getQuery from '../../common/js/getQuery';
import socket from '../../common/js/msgsocket';
class Component extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      curMenu: 'home',
      iconUrl:'',
      id:'',
      nickname:'',
    };
    this.store = store;
  }

  componentWillUnmount() {
    socket.close();
  }

  componentDidMount() {
    // 头部个人信息
    const id = getQuery("id");
    const nickname = getQuery("nickname");
    const iconUrl = getQuery("iconUrl");
    this.setState({
      id:id,
      nickname:nickname,
      iconUrl:iconUrl,
    })

  }
  onMenuClick(key) {
    this.setState({
      curMenu: key,
    });
  }
  onLogOut() {
    Actions.logout({
      data:{
        clientId:this.state.id,
      }
    })
  }
  render() {
    const { curMenu ,id ,data,iconUrl,nickname} = this.state;
    const { className, location } = this.props;
    const { pathname } = location;
    const isLogin = pathname === '/';

    return (
      <div className={className}>
        {/*<Header avatar={data.iconUrl || ''} username={data.nickname || ''} handleLogout={this.onLogOut.bind(this)}/>*/}
        {
          isLogin ? null :
            
            <Header avatar={iconUrl} username={nickname} handleLogout={this.onLogOut.bind(this)} />
        }
        <div className={`${className}-body`}>
          {
            isLogin ? null :
              <Menu selectedKeys={curMenu} handleClick={this.onMenuClick.bind(this)} />
          }
          <div className={`${className}-body-content`}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'root',
};

Component.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.element,
  location: React.PropTypes.objectOf(React.PropTypes.any),
};

export default Component;
