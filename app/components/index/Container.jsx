import React from 'react'
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import '../../css/reset.css'
export default class Container extends React.Component {
  constructor(props) {
      super(props)
  }
  componentWillMount(){

  }
 
  componentDidMount() {
    //   document.body.style.margin = '0px'
    //      // 这是防止页面被拖拽
    //   document.body.addEventListener('touchmove',(ev)=>{
    //     ev.preventDefault()
    // })
  }


  render() {
    return (
        < div className = 'container'>
             <ReactCSSTransitionGroup
                component = 'div'
                transitionName = 'page'
                transitionEnterTimeout = {500}
                transitionLeaveTimeout = {500}
             >
                {React.cloneElement(this.props.children, {
                    key: this.props.location.pathname
                })}
             </ReactCSSTransitionGroup>
         </div>
    )
  }
}
