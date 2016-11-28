import React from 'react'
import NavLink from '../lib/NavLinkBottom.jsx'

export default React.createClass({
  render() {
    return (
        <div>
          <footer className="BottomTabNavBar-root-2UQq TabNavBar-root-3qSd">
            <NavLink to="/lives" className="BottomTabNavBar-tab-di_V TabNavBarItem-tab-1ckL TabNavBarItem-isColumn-37rJ Link-link-3Nen">
            <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path  d="M1,12 C1,5.92486775 5.923532,1 12,1 C18.0751322,1 23,5.923532 23,12 C23,18.0751322 18.076468,23 12,23 C5.92486775,23 1,18.076468 1,12 Z M14.5241884,6.84927882 C14.8249628,5.78436398 14.4691908,5.58950044 13.7334267,6.40971672 L8.2805767,12.4884536 C7.98302196,12.8201621 8.1036458,13.089065 8.54308562,13.089065 L11.1229312,13.089065 L9.9774005,17.1507213 C9.6770569,18.215636 10.0329797,18.4104995 10.7685005,17.5902833 L16.2195472,11.5115471 C16.5170035,11.1798386 16.3963,10.9109357 15.9568602,10.9109357 L13.3770148,10.9109357 L14.5241884,6.84927882 Z"></path>
            </svg>
            <span className="TabNavBarItem-label-2QpM">全部 Live</span>
            </NavLink>
            <NavLink onlyActiveOnIndex to="/Home" className="BottomTabNavBar-tab-di_V TabNavBarItem-tab-1ckL TabNavBarItem-isColumn-37rJ Link-link-3Nen">
            <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path  d="M9 5.505c0-.28.22-.505.498-.505h13.004c.275 0 .498.214.498.505v.99c0 .28-.22.505-.498.505H9.498C9.223 7 9 6.786 9 6.495v-.99zm0 6c0-.28.22-.505.498-.505h13.004c.275 0 .498.214.498.505v.99c0 .28-.22.505-.498.505H9.498C9.223 13 9 12.786 9 12.495v-.99zm0 6c0-.28.22-.505.498-.505h13.004c.275 0 .498.214.498.505v.99c0 .28-.22.505-.498.505H9.498C9.223 19 9 18.786 9 18.495v-.99zM5.4 6.603l.548 1.95c.032.09 0 .19-.08.247-.08.057-.188.057-.268 0L3.997 7.604 2.4 8.804c-.08.055-.188.054-.268-.003-.08-.05-.11-.15-.08-.24L2.6 6.61l-1.504-1.2c-.08-.06-.116-.16-.086-.25s.118-.156.217-.158H3l.782-1.846c.03-.092.116-.154.215-.154.098 0 .185.062.215.154L5 5h1.774c.1.003.186.066.215.158.03.092-.01.192-.09.248L5.4 6.603zm0 6l.548 1.95c.032.09 0 .19-.08.247-.08.057-.188.057-.268 0l-1.603-1.197-1.597 1.2c-.08.056-.188.055-.268-.002-.08-.05-.11-.15-.08-.24l.548-1.95-1.504-1.195c-.08-.056-.115-.156-.085-.25s.12-.154.22-.156H3l.782-1.847c.03-.09.116-.153.215-.153.098 0 .185.06.215.153L5 11h1.774c.1.003.186.066.215.158.03.092-.01.192-.09.248l-1.5 1.197zm0 6l.548 1.95c.032.09 0 .19-.08.247-.08.057-.188.057-.268 0l-1.603-1.197-1.597 1.2c-.08.056-.188.055-.268-.002-.08-.05-.11-.15-.08-.24l.548-1.95-1.504-1.195c-.08-.056-.115-.156-.085-.25s.12-.154.22-.156H3l.782-1.847c.03-.09.116-.153.215-.153.098 0 .185.06.215.153L5 17h1.774c.1.003.186.066.215.158.03.092-.01.192-.09.248l-1.5 1.197z"></path>
      			</svg>
      			<span className="TabNavBarItem-label-2QpM">热门精选</span>
            </NavLink>
            <NavLink to="/user"className="BottomTabNavBar-tab-di_V TabNavBarItem-tab-1ckL TabNavBarItem-isColumn-37rJ Link-link-3Nen">
            <img className="SelfTab-avatar-zr8y Avatar-img--rfs Avatar-rounded-Rnjb" src={require('../../img/author.jpg')} width="25" height="25"/>
      			<span className="TabNavBarItem-label-2QpM">我的 Live</span>
            </NavLink>
          </footer>
          {this.props.children}
        </div>
    )
  }
})
