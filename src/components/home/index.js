import React,{ Component } from 'react'
import Header from "../header/index";
import './index.scss'

class home extends Component{

  render() {
    let isHidden = true

    return (
      <div className="home">
        <div className={isHidden?'header':'header active'} >
          <Header/>
        </div>

        <div className="bg-box" />

        <div className="main">
          <div className="operate">
            <div className="hello"/>
            <div className="header-top">
              <i className="iconfont icon-iconfonticonfonti2" aria-hidden="true" />
            </div>
          </div>

          <div className="wave">
            <div id="banner_wave_1"/>
            <div id="banner_wave_2"/>
          </div>

          <ul className="article-list">
            <li className="article">
              qe1
            </li>
          </ul>
        </div>

      </div>
    )
  }
}

export default home
