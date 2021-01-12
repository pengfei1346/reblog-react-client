import React, {Component} from 'react'
import {Layout} from 'antd';
import BaseHeader from '../components/header'
import Index from '../components/home/index';
import './index.scss'

const {
  Header,
  // Footer,
  Content
} = Layout;

class layout extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const whiteList = ['/'];
    let pathName = this.props.location.pathname;

    const isShowHeader = whiteList.indexOf(pathName) === -1;

    if (isShowHeader) {
      return (
        <div className="main-body">
          <Header>
            <BaseHeader/>
          </Header>

          <Content style={{marginTop: '70px'}}>
            {this.props.children}
          </Content>

          {/*<Footer>Footer</Footer>*/}
        </div>
      )
    } else {
      return (
        <Index/>
      )
    }
  }
}

export default layout
