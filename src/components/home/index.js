import React,{
  Component,
  // useState
}from 'react'
import Header from "../header/index";
import request from '../../utils/request';
import './index.scss'
import {
  throttle,
  getScrollTop,
  getDocumentHeight,
  getWindowHeight,
  // getQueryStringByName,
  timestampToTime,
} from '../../utils/utils';

// 获取可视区域的高度
const viewHeight = window.innerHeight || document.documentElement.clientHeight;
// 用新的 throttle 包装 scroll 的回调

// eslint-disable-next-line no-unused-vars
const lazyLoad = throttle(() => {
  // 获取所有的图片标签
  const iamges = document.querySelectorAll('#list img');
  console.log(iamges);
  // num 用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
  let num = 0;
  for (let i = num; i < iamges.length; i++) {
    // 用可视区域高度减去元素顶部距离可视区域顶部的高度
    let distance = viewHeight - iamges[i].getBoundingClientRect().top;
    // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
    if (distance >= 100) {
      // 给元素写入真实的 src，展示图片
      let hasLaySrc = iamges[i].getAttribute('data-has-lazy-src');
      if (hasLaySrc === 'false') {
        iamges[i].src = iamges[i].getAttribute('data-src');
        iamges[i].setAttribute('data-has-lazy-src', true);
      }
      // 前 i 张图片已经加载完毕，下次从第 i+1 张开始检查是否露出
      num = i + 1;
    }
  }
}, 1000);

class home extends Component{
  constructor(props) {
    super(props);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const [count, setCount] = useState(0);
    this.state = {
      isLoadEnd: false,
      isLoading: false,
      isHidden: true,
      page: 1,
      pageSize: 10,
      list: [],
      total: 0
    };
    this.getArticles = this.getArticles.bind(this);
    this.pageScroll = this.pageScroll.bind(this)
  }

  componentDidMount = () => {
    window.addEventListener('scroll',this.pageScroll);
    this.getArticles()
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll',this.pageScroll)
  };

  pageScroll() {
    let isHidden = getScrollTop() === 0;
    if(isHidden !== this.state.isHidden) {
      this.setState({
        isHidden: isHidden
      });
    }

    setTimeout(() => {
      if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 100) {
        // 如果不是已经没有数据了，都可以继续滚动加载
        if (this.state.isLoadEnd === false && this.state.isLoading === false) {
          let page = this.state.page + 1;
          this.setState({
            page: page
          });
          this.getArticles();
        }
      }
    },500)
  }

  getArticles() {
    this.setState({
      isLoading: true,
    });
    let params = {
      page: this.state.page,
      pageSize: this.state.pageSize
    };
    request.get('/article',{params:params}).then(data =>{
      this.setState(preState => ({
        list: [...preState.list, ...data.data],
        total: data.total,
        isLoading: false,
      }));

      if(this.state.list.length >= data.total) {
        this.setState({
          isLoadEnd: true
        })
      }

    })
  }

  render() {

    const list = this.state.list.map((item,i) => (
      <li className="article" id="list" key={i}>
        <div className={`article-left border-shadow ${i%2 !== 0? 'left' : 'right'}`}>
          <div className="detail-content">
            <div className="detail-publish">
              <i className="iconfont icon-shijian2"/>
              {item.createdAt?timestampToTime(item.createdAt,true):''}
            </div>
            <div className="detail-title">{item.title}</div>
            <div className="detail-meta">
              <div className="meta-box"><i className="iconfont icon-yanjing"/>{item.browseNum}</div>
              <div className="meta-box"><i className="iconfont icon-huifu"/>{item.replyNum}</div>
              <div className="meta-box"><i className="iconfont icon-zuozhe"/>{item.author}</div>
            </div>
            <div className="detail-abstract">
              <p>摘要：</p>
              <p style={{textIndent: '2em'}}>{item.abstract}</p>
            </div>
            <div className="detail-edit">
              <div><i className="iconfont icon-shenglvehao"/></div>
            </div>
          </div>
        </div>

        <div className={`article-right border-shadow ${i%2 === 0? 'left' : 'right'}`}>
          <img className="cover-img" data-src={item.coverImgUrl} src={item.coverImgUrl} alt="图片"/>
        </div>

      </li>
    ))

    return (
      <div className="home">
        <Header className={this.state.isHidden? 'hidden header': 'show header'}/>

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
            {/*<li className="article">*/}
            {/*  qe1*/}
            {/*</li>*/}
            {list}
          </ul>
        </div>

      </div>
    )
  }
}

export default home
