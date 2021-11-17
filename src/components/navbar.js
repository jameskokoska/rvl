import React,{Component} from 'react'
import './navbar.css';
import {pages} from "../util/pages"
import {Link} from "react-router-dom";
import { dataSocials } from '../data/socials';

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
          <div className="navbar-flex">
            <Link to="/"><img alt="RVL" style={{height:"40px", padding:"5px", marginRight:"20px", position:"absolute", left:"7px", top:"4px"}} src={require("../assets/RVL-icon.png").default}/></Link>
            {
              this.navbarPagesTotal.map((item,index)=>{
                return <NavbarLink selected={this.state.currentLink===item.link} title={item.title} link={item.link}/>
              })
            }
            <div className="navbar-socials" style={{position:"absolute", right:"5px", top:"7px"}}>
              {dataSocials.map((social, index)=>{
                return <>
                  <NavbarSocial key={social.name} social={social}/>
                </>
              })}
            </div>
          </div>
        </div>
        <div className="mobile-view">
          <div className="navbar-flex" style={{zIndex:100, backgroundColor:"white"}}>
            <Link to="/"><img alt="RVL" style={{height:"40px", padding:"5px", marginRight:"20px", position:"absolute", left:"5px", top:"4px"}} src={require("../assets/RVL-icon.png").default}/></Link>
            <div style={{height:"50px"}}/>
            <div className="navbar-socials" style={{position:"absolute", right:"40px", top:"11px"}}>
              {dataSocials.map((social, index)=>{
                return <>
                  <NavbarSocial key={social.name} social={social}/>
                </>
              })}
            </div>
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


export class NavbarSocial extends Component {
  render(){
    return(
      <a className="navbar-social" href={this.props.social.link} style={{textDecorationColor:"transparent"}}>
        <img alt={this.props.social.name} className="navbar-social-image" src={process.env.PUBLIC_URL+"/"+this.props.social.icon}/>
      </a>
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