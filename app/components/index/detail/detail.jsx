var React =require('react')
var ReactDOM = require('react-dom')
import NavLink from '../../lib/NavLink.jsx'
import DetailHeader from './detailHeader.jsx'
import DetailActity from './detailActity.jsx'
import DetailDes from './detailDes.jsx'
import {get,post} from '../../common/request.js'
import fetch from 'isomorphic-fetch';
import Loading  from '../../common/Loading.jsx'
import config from '../../common/config.js'
import utilities from '../../common/Utilities.js'
var detail =React.createClass({
  
  getInitialState: function() {
    return {
       lists: [],
       loading:false
     }
  },
  componentWillMount(){
    this.setState({
      loading:true
    })
  },
  componentDidMount() {
       utilities.setLocalTitle('商品详情')
       this.fetchFn()
  },
  // 获取数据
  fetchFn(){
    //console.log(localStorage.getItem('phone'))
        var that=this
        var id=that.props.location.query.id
        var url=config.api.base+config.api.goods
        var params={
            id:utilities.getParameterByName('id')||id,
            useraccount:localStorage.getItem('wv_account')
        }
        if(that.props.location.query.ads||utilities.getParameterByName('id')){
            var params={
            id:utilities.getParameterByName('id')||id,
            useraccount:localStorage.getItem('wv_account'),
            isads:1,
            adid:that.props.location.query.ads||utilities.getParameterByName('id')
          }
        }
       post(url,params)
        .then(function (response) {
            return response.json();
        })
      .then((data) => {
        //console.log(data.data)
        that.setState(
          {
            lists:data.data,
            loading:false
          }
        )
       })
      .catch((e) => { console.log(e.message) })
  },
  render() {
    return (
        <div>
          <div className="change_mall_info">
            {
              this.state.loading
                ?<Loading/>
                :null
            }
            <NavLink to={{pathname:"/"}} className="backIndex_btn"></NavLink>
            <div className="">
              <DetailHeader detail={this.state.lists}/>
              <DetailActity agents={this.state.lists}/>
              <DetailDes content={this.state.lists}/>
            </div>
          </div>
        </div>
    )
  }
})
module.exports = detail
