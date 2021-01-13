import React, {Component} from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import './index.scss'

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

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
      total: 0,
      items: Array.from({ length: 20 })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll',this.pageScroll)
  }

  componentDidUpdate() {
    console.log('我被更新了');
  }

  componentWillUnmount() {
    window.removeEventListener('scroll',this.pageScroll)
  }

  pageScroll() {
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 1500);
  };

// @click="handleToDetail(item._id)"
  render() {

    return (
      <div className="article">

        <div className="article-main">

          <InfiniteScroll dataLength={this.state.list.length}
                          next={this.fetchMoreData}
                          hasMore={true}
                          loader={<h4>Loading...</h4>}>
            {this.state.items.map((i, index) => (
              <div style={style} key={index}>
                div - #{index}
              </div>
            ))}
          </InfiniteScroll>

        </div>
      </div>
    )
  }
}

export default About
