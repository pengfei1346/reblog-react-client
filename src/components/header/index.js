import React, {Component} from 'react'
import {
  Link,
  withRouter
} from 'react-router-dom'
import './index.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fatherName: this.props.className
    }
  }

  // componentDidMount() {
  //   // console.log(this.props);
  //   // this.setState({
  //   //   fatherName: this.props.className
  //   // })
  // }

  //
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if(nextProps.className !== this.state.fatherName) {
      this.setState({
        fatherName: nextProps.className
      })
    }
    return true
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   // console.log('prevProps--', prevProps);
  //   // if(prevState.className !== prevState.fatherName) {
  //   //   this.setState({
  //   //     fatherName: prevState.fatherName
  //   //   })
  //   // }
  // }

  render() {
    const {pathname} = this.props.location

    return (
      <ul className={`nav ${this.state.fatherName}`}>
        <Link to="/">
          <li className={pathname === '/' ? 'active' : ''}>首页</li>
        </Link>
        <Link to="/articles">
          <li className={pathname === '/articles' ? 'active' : ''}>文章</li>
        </Link>
        <Link to="/archive">
          <li className={pathname === '/archive' ? 'active' : ''}>归档</li>
        </Link>
        <Link to="/collections">
          <li className={pathname === '/collections' ? 'active' : ''}>收藏</li>
        </Link>
        <Link to="/leavingMessage">
          <li className={pathname === '/leavingMessage' ? 'active' : ''}>留言</li>
        </Link>
        <Link to="/about">
          <li className={pathname === '/about' ? 'active' : ''}>关于</li>
        </Link>
      </ul>
    )
  }
}

export default withRouter(Header)
