import React,{Component} from 'react'
import './projectEntry.css';
import {Link} from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { NavbarSpace } from './navbar';

export default class ProjectEntry extends Component {
  render(){
    let children = <div className="project-box">
      <img alt={this.props.project.name} className="project-image" src={process.env.PUBLIC_URL+"/"+this.props.project.image}/>
      <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
        <div className="project-box-content">
          <h2 style={{margin:0}}>{this.props.project.title}</h2>
          <p dangerouslySetInnerHTML={{__html: this.props.project.description}}/>
        </div>
      </div>
    </div>
    if(this.props.project.link!==undefined && this.props.project.link!==""){
      return <a href={this.props.project.link} className="no-decoration">{children}</a>
    } else if (this.props.project.asset!==undefined && this.props.project.asset!=="" && this.props.project.webLocation!==undefined && this.props.project.webLocation!==""){
      return <Link className="no-decoration" to={"/projects/"+this.props.project.webLocation}>
        {children}
      </Link>
    } else {
      return <div className="no-hover">{children}</div>
    }
  }
}

export class ProjectEntryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {readme: ""}
  }
  async componentDidMount(){
    const response = await fetch(this.props.src);
    const text = await response.text();
    this.setState({
      readme: text
    })
  }
  render(){
    if(this.state.readme===""){
      return <div/>
    }
    return(
      <div className="center">
        <div className="horizontal-padding max-width">
          <NavbarSpace/>
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{this.state.readme}</ReactMarkdown>
        </div>
      </div>
    )
  }
}
