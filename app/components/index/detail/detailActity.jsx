var  React =require('react')
var ReactDOM = require('react-dom');
var util=require('../../../utils/util')
import NavLink from '../../lib/NavLink.jsx'
var detailActity =React.createClass({
    getInitialState: function() {
    return {
    
     }
  },
    render() {
      const agents=this.props.agents
        return(
        <div className="shadow In_bg_white">
            <div className="change_info_business">
              <NavLink to={{pathname:"/shoplist",query:{id:agents.shopid}}}>
                <div className="business_wrap">
                  <img src={agents.shoplogo} className="business_img"/>
                  <div className="business_desc">
                    <div className="desc_wrap">
                      <p className="desc_name E_f16 E_fc_grey1">{agents.shopname}</p>
                      <p className="desc_info E_f16 E_fc_grey7">
                      </p>
                    </div>
                  </div>
                  <div className="business_follow"><span>
                    <i className="readyfollow"></i>
                    </span>
                  </div>
                </div>
              </NavLink>
            </div>
        </div>
        )
    }
})
module.exports = detailActity
