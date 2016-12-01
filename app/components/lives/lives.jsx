import React from 'react'
import Slider from '../lib/Slider.jsx'
import NavLink from '../lib/NavLink.jsx'
import request from '../commen/request.js'
export default class Lives extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          lists: []
      }
  }
  // 获取数据
  fetchFn = () => {
    var that=this
    request.get('http://rap.taobao.org/mockjs/7918/songhao/batch')
      .then((data) => {
        console.log(data.listData)
        this.setState(
          {
            lists:data.listData
          }
        )
       })
      .catch((e) => { console.log(e.message) })
  }

  componentDidMount() {
       this.fetchFn()
  }
  render() {
    return (
        <div>
          <div className="lives">
            <div className="Card-root-1Dmx Card-group-24-a">
              <Slider/>
              {
                  this.state.lists.map((e,index) => {
                      return (
                        <div className="Card-root-1Dmx" key={index}>

                          <NavLink to="/detail" className="LiveItem-root-a6A2 common-clearfix-3JMt">{e.involvement} 天热门
                            <img  className="LiveItem-avatar-vumW Avatar-img--rfs" src={e.avatar} width="60" height="60"/>
                            <div className="LiveItem-content-1pZp">
                              <svg fill="currentColor" className="LiveItem-arrow-1bM5" width="48" height="48" viewBox="0 0 48 48"><title>arrow</title><path d="M19.608308 11.291022c-.39064-.387697-1.037868-.388717-1.42788-.019096l-1.879672 1.7814c-.397956.37715-.40446 1.001224-.020242 1.388148l9.488537 9.55542-9.488535 9.55542c-.386777.389504-.36977 1.01853.020242 1.38815l1.879672 1.7814c.397955.37715 1.041186.364683 1.42788-.019096l12.09502-12.003886c.39064-.387697.386693-1.020195 0-1.403974L19.60831 11.291022z"></path></svg>
                              <div className="LiveItem-subject-1fn7 common-textEllipsis-3N5q">{e.title}</div>
                              <div className="LiveItem-authorName-ghXZ common-textEllipsis-3N5q">{e.author}</div>
                              <div className="LiveItem-tag-PtGy"><span className="Label-root-xrSQ">5 小时后开始</span></div>
                            </div>

                          </NavLink>
                        </div>
                      )
                  })
              }
            </div>
          </div>
        </div>
    )
  }
}
