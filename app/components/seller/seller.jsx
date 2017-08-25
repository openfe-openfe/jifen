import React from 'react'
import Slider from '../lib/Slider.jsx'
import NavLink from '../lib/NavLink.jsx'
import { get, post } from '../common/request.js'
import fetch from 'isomorphic-fetch';
import config from '../common/config.js'
import utilities from '../common/Utilities.js'
import Loading  from '../common/Loading.jsx'
class Seller extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          lists: [],
          loading:false,
          bottomTxt: '',
          pageIndex:1,
          pageCount: 0,

      }
  }
  
  componentDidMount() {
       console.log(123)
  }
  render() {
    var that=this
    return (
        <div className="m-header">
            <div className="header">
                <div className="back">
                    <i className="backIcon"></i>
                    返回
                </div>
            </div>
        </div>
    )
  }
}
module.exports = Seller