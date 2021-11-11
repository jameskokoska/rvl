import React,{Component} from 'react'
import './blogEntry.css';
import {Link} from "react-router-dom";

export class BlogEntry extends Component {
  render(){
    let children = <>
      <h2>{this.props.blog.title}</h2>
      <p style={{margin:"1px", marginTop:"5px", marginBottom:"30px", color:"black"}}>{this.props.blog.date}</p>
      <hr/>
    </>
    if(this.props.blog.asset!==undefined && this.props.blog.asset!=="" && this.props.blog.webLocation!==undefined && this.props.blog.webLocation!==""){
      return <Link className="blog-entry-link" to={"/blog/"+this.props.blog.webLocation}>
        {children}
      </Link>
    } else if (this.props.blog.link!==undefined && this.props.blog.link!==""){
      return <a className="blog-entry-link" href={this.props.blog.link}>
        {children}
      </a>
    } else {
      return children
    }
  }
}

export class BlogEntryPage extends Component {
  render(){
    return <>
      <div style={{height:"65px"}}/>
      <iframe style={{width:"100vw", height:"calc(100vh - 10.7px - 65px)"}} title="blogPost" src={this.props.src}></iframe>
    </>
  }
}