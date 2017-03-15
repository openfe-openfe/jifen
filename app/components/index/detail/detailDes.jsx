import React from 'react'
export default class detailDes extends React.Component {
  constructor(props) {
      super(props)
  }
  createMarkup() {
  return {__html: this.props.content.contents};
}
    render() {
        const content=this.props.content
        return(
          <div className="pro_info_content">
              <div className="content_title E_f13 E_fc_grey6">商家信息</div>
              <div className="change_info_content E_f15 E_fc_grey1">
                  <p>商家地址：水电费活动设计费</p>
                  <p>商家电话：1283218933</p>
              </div>
              <div className="content_title E_f13 E_fc_grey6">商品详情</div>
              <div className="change_info_content E_f15 E_fc_grey1">
                  <div dangerouslySetInnerHTML={this.createMarkup()}></div>
              </div>
              
          </div>

        )
    }
}
