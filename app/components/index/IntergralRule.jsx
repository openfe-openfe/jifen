import React from 'react'
import NavLink from '../lib/NavLink.jsx'
// import request from '../common/request.js'
import fetch from 'isomorphic-fetch';
import Loading  from '../common/Loading.jsx'
import utilities from '../common/Utilities.js'
class IntergralRule extends React.Component {
  constructor(props) {
      super(props)
  }
componentDidMount() {
       utilities.setLocalTitle('积分规则')
  }
  render() {
    return (
        <div className="jifen_body">
          <div className="jifen_rule">
              <div className="task_rule">
                  <p className="title rule_center">
                      <strong><span>做任务，赢积分！全新积分商城能量满满，礼品兑换嗨翻天！ </span></strong>
                  </p>
                  <p className="title rule_mt11"><strong><span>1、摇一摇</span></strong></p>
                  <p className="paragraph rule_mt4">玩摇一摇，每天签到赚积分，另有随机积分赠送哦。。</p>
                  <p className="title rule_mt11"><strong><span>2、骑行</span></strong></p>
                  <p className="paragraph rule_mt4">使用潍V扫码租车，绿色低碳出行，每次还车成功后积分随机送，参与越多，机会更多哦！</p>
                  <p className="title rule_mt11"><strong><span>3、掌中宝</span></strong></p>
                  <p className="paragraph rule_mt4">在掌中宝中，宝贝视频充值成功送积分</p>
                  <p className="title rule_mt11"><strong><span>4、其他</span></strong></p>
                  <p className="paragraph rule_mt4">更多超值任务，敬请期待！</p>
                  <p className="title rule_mt11"><strong><span>PS：<br/>①积分记录可以在积分商城个人中心积分明细中查看！<br/>②摇一摇和扫码租车任务每天都可以参与，其他任务不受限制，独乐乐不如众乐乐快邀请好友来一起做任务赢积分吧。</span></strong></p>
              </div>
          </div>
        </div>
    )
  }
}
module.exports=IntergralRule