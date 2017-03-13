import React from 'react'
import 'whatwg-fetch'
import NavLink from '../lib/NavLink.jsx'
import request from '../common/request.js'
import Loading  from '../common/Loading.jsx'
export default class IntergralRule extends React.Component {
  constructor(props) {
      super(props)
  }
  
  render() {
    return (
        <div className="jifen_body">
         <NavLink to={{pathname:"/"}} className="backIndex_btn"></NavLink>
          <div className="jifen_rule">
              <div className="task_rule">
                  <p className="title rule_mt11"><strong><span>1.注意事项：</span></strong></p>
                  <p className="paragraph rule_mt4">①目前在该积分商城兑换的商品均为非邮寄商品，均为线下自提商品。
<br/>②需要用户在兑换券的有效期内到商品对应的商家实体店进行自提商品。<br/>
③兑换券的有效期一般为7天（特殊说明的除外），兑换券的有效期可以在未领取的兑换券中查看，请您在有效期内及时到商家进行验证兑换商品，兑换券过期后自动作废，兑换所消耗的积分不返还。
</p>
                  <p className="title rule_mt11"><strong><span>2.兑换流程：</span></strong></p>
                  <p className="paragraph rule_mt4">①用户可持电子兑换券到商品详情标注的商家地址，进行商品兑换。<br/>
②兑换商品时需要用户向商家出示电子兑换券，需要商家进行扫码验证核销兑换券，验证成功后可领取兑换券对应的商品。随即兑换券作废，不可能重复验证。</p>
                  <p className="title rule_mt11"><strong><span>©最终解释权归积分商城运营方新橙科技有限公</span></strong></p>
              </div>
          </div>
        </div>
    )
  }
}
