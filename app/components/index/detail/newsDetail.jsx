import React from 'react'
import request from '../../common/request.js'
import Loading  from '../../common/Loading.jsx'
import NavLink from '../../lib/NavLink.jsx'
import config from '../../common/config.js'
import utilities from '../../common/Utilities.js'
export default class detailDes extends React.Component {
  constructor(props) {
      super(props)
      this.state={
          content:'',
          title:'',
          tips:''
      }
  }
  componentWillMount(){
    this.setState({
      loading:true
    })
    utilities.setLocalTitle(this.state.title)
  }
    fetchFn(){
       var that=this
        var url=config.api.base+config.api.view
        var formdata=new FormData();
        var id=that.props.location.query.id
        formdata.append('useraccount',utilities.getParameterByName('wv_account'))
        formdata.append('id',utilities.getParameterByName('id')||id)
        fetch(url,{
            method: 'POST',
            body: formdata
        })
        .then(function (response) {
            return response.json();
        })
      .then((data) => {
        console.log(data.data)
        that.setState(
          {
            content:data.data.content,
            title:data.data.title,
            loading:false
          },function(){
            utilities.setLocalTitle(that.state.title)
          }
        )
       })
      .catch((e) => { console.log(e.message) })
  }
  createMarkup() {
  return {__html: this.state.content};
}
  createMarkuptips() {
  return {__html: this.state.tips}
}
 componentDidMount() {
      //  utilities.setLocalTitle(title)
       this.fetchFn()
  }
    render() {
        return(
          <div className="pro_info_content">
            <div className="change_info_content">
             <div dangerouslySetInnerHTML={this.createMarkup()}></div>
            </div> 
          </div>

        )
    }
}
