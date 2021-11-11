import React,{Component} from 'react'
import "./footer.css"
import {dataSocials} from "../data/socials.js"
import { copyrightMessage } from '../data/copyright';

export default class Footer extends Component {
  render(){
    return (
      <div className="footer">
        <div className="footer-padding-top"/>
        <div className="footer-socials">
          {dataSocials.map((social, index)=>{
            return <>
              {index===0?<></>:<div key={index+social.name} className="footer-dash-break">/</div>}
              <FooterSocial key={social.name} social={social}/>
            </>
          })}
        </div>
        <div className="footer-padding-bottom"/>
        <p className="accent-paragraph footer-copyright" style={{color:"gray"}}>{copyrightMessage}</p>
      </div>
    );
  }
}

class FooterSocial extends Component {
  render(){
    return(
      <a href={this.props.social.link} style={{textDecorationColor:"transparent"}}>
        <div className="footer-social">
          <img alt={this.props.social.name} className="footer-social-image" src={process.env.PUBLIC_URL+"/"+this.props.social.icon}/>
          <p className="accent-paragraph footer-social-label" style={{color:"black"}}>{this.props.social.name}</p>
        </div>
      </a>
    )
  }
}