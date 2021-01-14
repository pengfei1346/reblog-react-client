import React, {Component} from 'react'
import './index.scss'
import {Timeline} from 'antd';
import {
  timestampToTime,
} from '../../utils/utils';
import request from "../../utils/request";

const Item = (props) => {
  const rList = props.data.list.map((item,i)=>{
    return (
      <Timeline.Item key={i}>
        <p>{item.title}</p>
        <p>{timestampToTime(item.createdAt)}</p>
      </Timeline.Item>
    )
  })

  return (
    rList
  )
}

class archive extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isHidden: true,
      list: []
    }
    this.getList = this.getList.bind(this)
  }

  componentDidMount() {
    this.getList()
  }

  getList() {
    this.setState({
      isLoading: true,
    });
    request.get('/article/year').then(data => {
      this.setState(preState => ({
        list: data.archiveList,
        isLoading: false,
      }));
    })
  }

  render() {

    return (
      <div className="archive">
        {
          this.state.list.map((v, i) => {
              // 调用子组件 循环的也是子组件
              return (
                <Timeline key={i}>
                  <Item data={v} />
                </Timeline>
              )
            }
          )
        }
      </div>
    )
  }
}


export default archive

