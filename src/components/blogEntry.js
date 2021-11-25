import React,{Component} from 'react'
import './blogEntry.css';
import {Link} from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import ReactDOMServer from 'react-dom/server';
import {decode} from 'html-entities';
import { NavbarSpace } from './navbar';
import Footer from './footer';


export class BlogEntry extends Component {
  render(){
    let children = <>
      <div style={{height:"5px"}}/>
      <h2>{this.props.blog.title}</h2>
      {this.props.blog.date?<p style={{margin:"1px", marginTop:"5px", marginBottom:"5px", color:"black"}}>{this.props.blog.date}</p>:<></>}
      {this.props.blog.description?<p style={{margin:"1px", color:"black"}}>{this.props.blog.description}</p>:<></>}
      <div style={{height:"25px"}}/>
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

function filterText(text){
  let outputText = text;
  let indexFound = 0
  let indexToCheck = 0
  let imgTag = ""
  let newImgTag = ""
  while(indexFound!==-1){
    indexFound = text.indexOf("<img",indexToCheck);
    if(indexFound!==-1){
      imgTag = text.substring(indexFound, text.indexOf(">",indexFound))
      newImgTag = imgTag.replace("src=\"","src=\""+process.env.PUBLIC_URL+"/")
      outputText = outputText.replaceAll(imgTag, newImgTag)
      indexToCheck = indexFound
    }
    indexToCheck=indexToCheck+1
  }

  outputText = outputText.replace("<code>","<div className='code-block'><code>")
  outputText = outputText.replace("</code>","</code></div>")
  return outputText
}

function filterRender(text){
  let outputText = text;
  outputText = outputText.replace("<code>","<div class='code-block'><p>")
  outputText = outputText.replace("</code>","</p></div>")
  return outputText
}

function removeMetaData(text){
  let outputText = text.split("---")[2]
  return outputText
}

function extractMetaData(text){
  let outputText = text.split("---")[1]
  //remove any extra comma
  outputText = outputText.replace(/(\r\n|\n|\r)/gm, "");
  outputText = outputText.replace(",}","}")
  let outputJSON = JSON.parse(outputText)
  return outputJSON
}

export class BlogEntryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {text: ""}
  }

  async componentDidMount(){
    if(!this.props.distill){
      const response = await fetch(require("../data/blog-pages/hypercrl.md").default);
      let text = await response.text();
      
      this.setState({
        text: removeMetaData(filterText(text)),
        metaData: extractMetaData(text)
      })
    }
  }  

  render(){
    if(this.props.distill){
      return <>
        <div style={{height:"55px"}}/>
        <iframe id="iframe" style={{width:"100vw", height:"calc(100vh - 8px - 55px)"}} title="blogPost" src={this.props.src}></iframe>
      </>
    } else {
      let markdown = ReactDOMServer.renderToString(<>
        <ReactMarkdown 
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {this.state.text}
        </ReactMarkdown>
      </>)
      return <>
        <NavbarSpace/>
        <div className="center" style={{minHeight:"100vh"}}>
          <div className="horizontal-padding max-width-blog blog-entry-page">
            <div style={{height:"20px"}}/>
            <h1 style={{fontWeight:800}}>{this.state.metaData?.title}</h1>
            <div style={{height:"10px"}}/>
            <hr/>
            <div style={{height:"10px"}}/>
            <h2 style={{margin:0}}>{this.state.metaData?.date}</h2>
            <div style={{display:"flex", flexWrap:"wrap"}}>
              {this.state.metaData?.authors.map((author)=>{
                return <h3 style={{paddingRight: "20px", margin:"5px 0px"}}>{author}</h3>
              })}
            </div>
            <div style={{height:"10px"}}/>
            <hr/>
            <div style={{height:"10px"}}/>
            <div dangerouslySetInnerHTML={{__html: filterRender(decode(markdown))}}/>
          </div>
        </div>
        <Footer/>
      </>
    }
  }
}