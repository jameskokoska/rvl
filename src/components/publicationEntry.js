import React,{Component} from 'react'
import './publicationEntry.css';
import useCollapse from 'react-collapsed'
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDF(props) {
  if(props.pdf===undefined && props.html===undefined){
    return <></>
  } else {
    let pdfParsed = ""
    if(props.pdf!==undefined){
      pdfParsed = process.env.PUBLIC_URL+"/"+props.pdf
    } else if (props.html!==undefined){
      if(props.html.includes("arxiv.org")){
        pdfParsed = props.html.replace("abs","pdf") + ".pdf"
      } else if(props.html.includes("openreview.net")){
        //website does not allow
        // pdfParsed = props.html.replace("forum?id=","pdf?id=")
        return <></>
      } else if(props.html.includes("roboticsproceedings.org")){
        //website does not allow
        // pdfParsed = props.html.replace(".html","pdf")
        return <></>
      } else {
        return <></>
      }
    } else {
      return <></>
    }
    
    
    return (
      <div>
        <Document
          file={pdfParsed}
          loading={<Loading style={{width:"50px", height:"50px", padding:"59px 40px"}}/>}
        >
          <Page height={200} width={130} pageNumber={1} renderAnnotationLayer={false} renderTextLayer={false}/>
        </Document>
      </div>
    );
  }
}

export default function PublicationEntry(props){
  let extraParams = {"pdf":"pdf","html":"pdf", "bibtex":"bibtex", "video":"video", "project":"project", "code":"code"}

  const { getCollapseProps, getToggleProps} = useCollapse()
  return <div className="publication-entry">
    {props.showYear?<><hr/><h2>{props.publication["year"]}</h2></>:<div/>}
    <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
      <div className="desktop-view">
        <div style={{paddingRight:"13px"}}>
          <PDF pdf={props.publication["pdf"]} html={props.publication["html"]}/>
        </div>
      </div>
      <div>
        <h3>{props.publication["title"]}</h3>
        <p>{props.publication["author"]}</p>
        {props.publication["booktitle"]!==""?<p><i>{"In " + props.publication["booktitle"]}</i>{" " + props.publication["year"]}</p>:<div/>}
        {props.publication["journal"]!==""?<p><i>{props.publication["journal"]}</i>{" " + props.publication["year"]}</p>:<div/>}
        {props.publication["tags"]!==undefined?<div>{props.publication["tags"].map((tag)=>{
          return <PublicationTag tag={tag} selected={props.selectedTags.includes(tag)} addSelectedTag={props.addSelectedTag} removeSelectedTag={props.removeSelectedTag}/>
        })}</div>:<div/>}
        <div style={{marginLeft:"-3px", marginTop:"3px"}}>
          {Object.keys(extraParams).map((key)=>{
            if(props.publication[key]!==undefined && props.publication[key]!==""){
              if(key==="bibtex"){
                return <div key={key} style={{display:"inline", marginLeft:"3px"}}{...getToggleProps()}>[<div className="a" style={{display:"inline"}}>bibtex</div>]</div>
              }else if(key==="pdf"){
                return <div key={key} style={{display:"inline", marginLeft:"3px"}}>[<a href={process.env.PUBLIC_URL+"/"+props.publication[key]}>{extraParams[key]}</a>]</div>
              }
              return <div key={key} style={{display:"inline", marginLeft:"3px"}}>[<a href={props.publication[key]}>{extraParams[key]}</a>]</div>
            }
            return <></>
          })}
        </div>
        <div {...getCollapseProps()}><div className="bibtex-expand">{props.publication["bibtex"]}</div></div>
      </div>
    </div>
  </div>
}


export class PublicationTag extends Component{
  constructor(props){
    super(props)
    this.state={selected:this.props.selected??false}
  }

  componentDidUpdate(prevProps){
    if(this.props.selected!==prevProps.selected){
      this.setState({selected: this.props.selected})
    }
  }

  onClick = () => {
    if(!this.state.selected){
      this.props.addSelectedTag(this.props.tag)
    } else {
      this.props.removeSelectedTag(this.props.tag)
    }
    this.setState({selected:!this.state.selected})
  }

  render(){
    return(
      <div onClick={this.onClick} className={"publication-tag "+(this.state.selected?"publication-tag-selected":"")}>{this.props.tag}</div>
    )
  }
}

class Loading extends Component{
  render(){
    return <div style={this.props.style} className="loading"></div>
  }
}