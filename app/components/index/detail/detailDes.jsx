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
              <div className="content_title E_f13 E_fc_grey6">商品详情</div>
              <div className="change_info_content E_f15 E_fc_grey1">
                  <div dangerouslySetInnerHTML={this.createMarkup()}></div>
              </div>
          </div>

        )
    }
}
