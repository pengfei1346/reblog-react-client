import React, {Component} from 'react'
import request from "../../utils/request";
import {
  getScrollTop,
  getDocumentHeight,
  getWindowHeight,
  // getQueryStringByName,
  timestampToTime,
} from '../../utils/utils';
import './index.scss'

class About extends Component {
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
    }
    this.getArticles = this.getArticles.bind(this)
  }

  componentDidMount() {
    window.onscroll = () => {
      this.setState(preState => ({
        isHidden: !(getScrollTop() > 0)
      }));
      setTimeout(() => {
        if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 100) {
          // 如果不是已经没有数据了，都可以继续滚动加载
          if (this.state.isLoadEnd === false && this.state.isLoading === false) {
            let page = this.state.page + 1
            this.setState({
              page: page
            });
            this.getArticles();
          }
        }
      }, 500)
    };
    this.getArticles()
    // document.addEventListener('scroll', lazyload);
  }

  getArticles() {
    this.setState({
      isLoading: true,
    });
    let params = {
      page: this.state.page,
      pageSize: this.state.pageSize
    }
    request.get('/article', {params: params}).then(data => {
      this.setState(preState => ({
        list: [...preState.list, ...data.data],
        total: data.total,
        isLoading: false,
      }));

      if (this.state.list.length >= data.total) {
        this.setState({
          isLoadEnd: true
        })
      }

    })
  }

// @click="handleToDetail(item._id)"
  render() {

    const list = this.state.list.map((item,i) => (
      <li key={i}>
        <div className="article-top">
          <div className="feature-body">
            <img src={item.coverImgUrl} className="feature-img" alt="封面"/>
          </div>

          <div className="article-body">
            <div className="top-title">
              <div>{item.title}</div>
              <div>发布于 {item.createdAt ? timestampToTime(item.createdAt, true) : ''}</div>
            </div>
            <p>
              {item.abstract}
              <span>...</span>
            </p>

            <div className="item-bottom">
              <div className="detail-meta">
                <div className="meta-box"><i className="iconfont icon-yanjing"></i>{item.browseNum}</div>
                <div className="meta-box"><i className="iconfont icon-huifu"></i>{item.replyNum}</div>
                <div className="meta-box"><i className="iconfont icon-zuozhe"></i>{item.author}</div>
              </div>
              <div className="item-foot">...</div>
            </div>
          </div>
        </div>
      </li>
    ))

    return (
      <div className="article">

        <div className="article-main">

          <ul className="article-list">

            {list}

          </ul>
        </div>
      </div>
    )
  }
}

export default About
