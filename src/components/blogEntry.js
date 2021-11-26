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

export class BlogEntryPage extends Component {
  constructor(props) {
    super(props)
    this.state = {text: ""}
  }

  async componentDidMount(){
    if(!this.props.distill){
      const response = await fetch(this.props.src);
      let text = await response.text();
      
      this.setState({
        text: filterText(text),
      })
    }
  }  

  render(){
    if(this.props.distill){
      return <>
        <div style={{height:"55px"}}/>
        <iframe id="iframe" style={{width:"100vw", height:"calc(100vh - 8px - 55px)"}} title="blogPost" src={this.props.src}></iframe>
      </>
    } else if (this.state.text!==""){
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
            <h1 style={{fontWeight:800}}>{this.props.articleData?.title}</h1>
            <div style={{height:"10px"}}/>
            <hr/>
            <div style={{height:"10px"}}/>
            <h2 style={{margin:0}}>{this.props.articleData?.date}</h2>
            <div style={{display:"flex", flexWrap:"wrap"}}>
              {this.props.articleData?.authors?.map((author)=>{
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
    } else {
      return <></>
    }
  }
}

// import React,{Component} from 'react'
// import ReactMarkdown from 'react-markdown'
// // import PageHeader from '../components/pageHeader'
// import remarkMath from 'remark-math'
// import rehypeKatex from 'rehype-katex'
// import 'katex/dist/katex.min.css'
// import ReactDOMServer from 'react-dom/server';
// import {decode} from 'html-entities';

// function importAll(r) {
//   return r.keys().map(r);
// }

// export default class Blog extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {files: []}
//   }
//   async componentDidMount(){
//     //Reload to apply https://distill.pub/template.v1.js in index.html
//     const reloadCount = sessionStorage.getItem('reloadCount');
//     if(reloadCount < 2) {
//       sessionStorage.setItem('reloadCount', String(reloadCount + 1));
//       window.location.reload();
//     } else {
//       sessionStorage.removeItem('reloadCount');
//     }

//     const filesIn = await importAll(require.context(process.env.PUBLIC_URL + "/blog-pages", false, /\.(md)$/))
//     console.log(filesIn)
//     let files = []
//     for(let i =0; i<filesIn.length; i++){
//       const response = await fetch(filesIn[i].default);
//       const text = await response.text();
//       files.push(text)
//     }
    
//     this.setState({
//       files: files
//     })
//   }
//   render(){
//     if(this.state.files===[]){
//       return <div/>
//     }
    
//     return(
//       <iframe title="blogPost" src="blog-pages/test.html"></iframe>
//       // <BlogEntryPage file={this.state.files[0]}/>
//     )
//   }
// }

// class BlogEntryPage extends Component {
//   render(){
//     let file = this.props.file
//     let title = ""
//     let article = ""
//     if(file!==undefined){
//       title = file.split("---")[1]
//       console.log(title)
//       article = ReactDOMServer.renderToString(<>
//         <ReactMarkdown 
//           remarkPlugins={[remarkMath]}
//           rehypePlugins={[rehypeKatex]}
//         >
//           {file.split("---")[2]}
//         </ReactMarkdown>
//       </>)
//     }

//     let titleOut = `<script type="text/front-matter">${title}</script>`
//     let articleOut = `<dt-article>
//       <h1>Title</h1>
//       <h2>A description of the article</h2>
//       <dt-byline></dt-byline>
//       <p>This is the first paragraph of the article.</p>
//       <p>We can also cite <dt-cite key="gregor2015draw"></dt-cite> external publications.</p>
//       ${article}
//     </dt-article>`
//     let appendixOut = `<dt-appendix></dt-appendix>`
//     let bibliographyOut = `<script type="text/bibliography">
//     @article{gregor2015draw,
//       title={DRAW: A recurrent neural network for image generation},
//       author={Gregor, Karol and Danihelka, Ivo and Graves, Alex and Rezende, Danilo Jimenez and Wierstra, Daan},
//       journal={arXivreprint arXiv:1502.04623},
//       year={2015},
//       url={https://arxiv.org/pdf/1502.04623.pdf}
//     }
//   </script>`
    
    
//     return (<>
//       <div dangerouslySetInnerHTML={{__html: titleOut}}/>
//       <div dangerouslySetInnerHTML={{__html: decode(articleOut)}}/>
//       <div dangerouslySetInnerHTML={{__html: appendixOut}}/>
//       <div dangerouslySetInnerHTML={{__html: bibliographyOut}}/>

//     </>)
//   }
// }

// export class BlogEntryPage extends Component {
//   render(){
//     return <>
//       <div style={{height:"55px", marginBottom:"-70px"}}/>
//       <iframe id="iframe" style={{width:"100vw", height:"calc(100vh - 8px - 55px + 70px)"}} title="blogPost" src={this.props.src}></iframe>
//     </>
//   }
// }

// export class BlogEntryPage extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {text: ""}
//   }

//   async componentDidMount(){
//     const response = await fetch(this.props.src);
//     console.log(response)
//     // console.log(await response.text())
//     const text = await response.text();
//     this.setState({text:text})
//   }

//   render(){
//     console.log(this.state.text)
    
    
//     let markdown = ReactDOMServer.renderToString(<>
//       <ReactMarkdown 
//         remarkPlugins={[remarkMath]}
//         rehypePlugins={[rehypeKatex]}
//       >
//         {this.state.text}
//       </ReactMarkdown>
//     </>)

//     return <div dangerouslySetInnerHTML={{__html: decode(markdown)}}/>
//   }
// }