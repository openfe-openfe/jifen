import React from 'react'
export default class detailDes extends React.Component {
  constructor(props) {
      super(props)
  }
  createMarkup() {
  return {__html: this.props.content.contents};
}
  createMarkuptips() {
  return {__html: this.props.content.tips};
}
    render() {
        const content=this.props.content
        const tel=content.shoptel
        const phone='tel:'+tel
        return(
          <div className="pro_info_content">
              <div className="content_title E_f13 E_fc_grey6">商家信息</div>
              <div className="change_info_content E_f15 E_fc_grey1">
                  <p>商家地址：{content.shopaddress}</p>
                  <p>商家电话：<a href={phone}>{content.shoptel}</a></p>
              </div>
              <div className="content_title E_f13 E_fc_grey6">商品详情</div>
              <div className="change_info_content E_f15 E_fc_grey1">
                  <div dangerouslySetInnerHTML={this.createMarkup()}></div>
                  <div dangerouslySetInnerHTML={this.createMarkuptips()}></div>
              </div>
              
          </div>

        )
    }
}
