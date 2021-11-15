import React,{Component} from 'react'
import "./footer.css"
import {dataSocials} from "../data/socials.js"
import { copyrightMessage } from '../data/copyright';

export default class Footer extends Component {
  render(){
    return (
      <div className="footer">
        <div className="desktop-view">
          <p className="accent-paragraph footer-copyright" style={{color:"gray"}}>{copyrightMessage}</p>
        </div>
        <div className="footer-socials">
          {dataSocials.map((social, index)=>{
            return <>
              <FooterSocial key={social.name} social={social}/>
            </>
          })}
        </div>
        <div className="mobile-view">
          <p className="accent-paragraph footer-copyright" style={{color:"gray"}}>{copyrightMessage}</p>
        </div>
      </div>
    );
  }
}

export class FooterSocial extends Component {
  render(){
    return(
      <a href={this.props.social.link} style={{textDecorationColor:"transparent"}}>
        <div className="footer-social">
          <img alt={this.props.social.name} className="footer-social-image" src={process.env.PUBLIC_URL+"/"+this.props.social.icon}/>
          {/* <p className="accent-paragraph footer-social-label" style={{color:"black"}}>{this.props.social.name}</p> */}
        </div>
      </a>
    )
  }
}