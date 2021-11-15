import React,{Component} from 'react'
import './navbar.css';
import {pages} from "../util/pages"
import {Link} from "react-router-dom";
// import { FooterSocial } from './footer';
// import {dataSocials} from "../data/socials.js"

export class Navbar extends Component {
  constructor() {
    super();
    this.navbarPages = pages;
    this.navbarPagesTotal = [...this.navbarPages["main"]]
    this.state = {open: false, currentLink: "", currentName: ""}
    this.firstOpen = true;
    this.state={open:false}
  }
  handlePageChange = (currentLink) => {
    let currentPage = this.getCurrentPageName(currentLink);
    this.setState({currentLink:currentLink, currentName: currentPage["title"], open:false})
  }
  getCurrentPageName = (currentLink) => {
    let keys = Object.keys(pages)
    for(let i = 0; i < keys.length; i++){
      for(let j = 0; j < pages[keys[i]].length; j++){
        if(currentLink===pages[keys[i]][j]["link"]){
          return({"title":pages[keys[i]][j]["title"],"category":keys[i]});
        }
      }
    }
    return({"title":"","category":""});
  }
  render(){
    return(
      <div className="navbar">
        <div className="desktop-view">
          <div className="navbar-flex horizontal-padding">
          <Link to="/"><img alt="RVL" style={{height:"50px", padding:"5px", marginRight:"20px"}} src={require("../assets/RVL-icon.png").default}/></Link>
            <div>
              {
                this.navbarPagesTotal.map((item,index)=>{
                  return <NavbarLink selected={this.state.currentLink===item.link} title={item.title} link={item.link}/>
                })
              }
            </div>
          </div>
        </div>
        <div className="mobile-view">
          <div className="navbar-flex" style={{zIndex:100, backgroundColor:"white"}}>
            <Link to="/"><img alt="RVL" style={{height:"40px", padding:"5px", marginLeft:"5px"}} src={require("../assets/RVL-icon.png").default}/></Link>
            <img onClick={()=>{this.setState({open:!this.state.open})}} alt="menu" className="navbar-menu-icon" src={require("../assets/buttons/bars-solid.svg").default}/>
          </div>
          <div className={"navbar-items-mobile " + (!this.state.open?"navbar-items-mobile-open":"")}>
            {
              this.navbarPagesTotal.map((item,index)=>{
                return <NavbarLinkMobile selected={this.state.currentLink===item.link} title={item.title} link={item.link}/>
              })
            }
          </div>
        </div>
        {/* <div style={{position:"absolute", right:0}}>
          <div className="footer-socials">
            {dataSocials.map((social, index)=>{
              return <>
                <FooterSocial key={social.name} social={social}/>
              </>
            })}
          </div>
        </div> */}
      </div>
    )
  }
}

class NavbarLink extends Component {
  render(){
    return(
      <Link to={this.props.link} className={"navbar-link-text " + (this.props.selected?"navbar-link-text-selected":"")}>{this.props.title}</Link>
    )
  }
}

class NavbarLinkMobile extends Component {
  render(){
    return(
      <Link to={this.props.link} className={"navbar-link-text-mobile " + (this.props.selected?"navbar-link-text-selected-mobile":"")}>{this.props.title}</Link>
    )
  }
}


export class NavbarSpace extends Component {
  render(){
    return <>
      <div className="mobile-view">
        <div style={{marginTop:"80px"}}></div>
      </div>
      <div className="desktop-view">
        <div style={{marginTop:"100px"}}></div>
      </div>
    </>
  }
}