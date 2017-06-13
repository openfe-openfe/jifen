import React from 'react'
import NavLink from '../lib/NavLink.jsx'
class ItemList extends React.Component {
  constructor(props) {
      super(props)
  }
  render() {
    return (
        <div>
              {
                  this.props.list.map((e,index) => {
                      return (
                        <NavLink to={{pathname:"/detail",query:{id:e.goodsid}}} className="product_href block_href" key={index}>

                              <div className="gift_list">
                                <img src={e.thumbnail} alt="图片" className="product_img"/>
                                <div className="gift_desc">
                                  <div className="desc_wrap">
                                    <div className="desc_title E_f16 E_fc_grey1">{e.goodsname}</div>
                                    <div className="desc_charge">
                                      <i className="gold_logo"></i>
                                      {
                                        e.youhui>0?
                                        <span className="new_price E_f15 E_fc_orange">{e.jifen_youhui}</span>
                                        : <span className="new_price E_f15 E_fc_orange">{e.jifen}</span>
                                      }
                                      <div className="ori_charge E_f12 E_fc_grey7">
                                        <em>价值: ￥</em><span className="old_price">{e.price}</span>
                                      </div>
                                    </div>
                                    <div className="change_his E_f12 E_fc_grey6">
                                      <span className="left_txt"><span className="exg_txt">已兑</span>
                                      <span className="exg_num">{e.sold+'%'}</span></span>
                                      <span className="right_txt"><span className="rate_bar">
                                        <span style={{width:e.sold+"%"}}></span></span></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="tag_wrap">
                                  {
                                    e.sold=='100'?<i className="end_tag"></i>:<i className="desc_tag"></i>
                                  }
                                </div>
                              </div>

                          </NavLink>

                      )
                  })
               }
             
            </div>
    )
  }
}
module.exports=ItemList