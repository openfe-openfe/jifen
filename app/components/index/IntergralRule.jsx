import React from 'react'
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
          <div className="jifen_rule">
              <div className="task_rule">
                  <p className="title rule_center">
                      <strong><span>做任务，赢积分！全新积分商城能量满满，礼品兑换嗨翻天！ </span></strong>
                  </p>
                  <p className="title rule_mt11"><strong><span>1、摇一摇</span></strong></p>
                  <p className="paragraph rule_mt4">玩摇一摇，每天签到可获得10个积分，摇一摇还有随机积分赠送哦。</p>
                  <p className="title rule_mt11"><strong><span>2、骑行</span></strong></p>
                  <p className="paragraph rule_mt4">每天使用潍V扫码租车，绿色低碳出行，还车成功后送积分，扫码租车每天赠送上限为30个积分哦！</p>
                  <p className="title rule_mt11"><strong><span>3、其他</span></strong></p>
                  <p className="paragraph rule_mt4">更多超值任务，敬请期待！</p>
                  <p className="title rule_mt11"><strong><span>PS：完成任务24个小时后还可再次参与哦。独乐乐不如众乐乐快邀请好友来一起做任务赢积分吧。</span></strong></p>
              </div>
          </div>
        </div>
    )
  }
}
