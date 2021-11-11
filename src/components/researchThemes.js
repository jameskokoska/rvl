import React,{Component} from 'react'
import './researchThemes.css';
import {dataResearchThemes} from "../data/researchThemes.js"
// import ReactWordcloud from 'react-wordcloud';
// import BubbleUI from "react-bubble-ui";
// import "react-bubble-ui/dist/index.css";

export default class ResearchThemes extends Component {
  render(){
    return(
      <>
        <h2 className="research-theme-title">Research Themes</h2>
        <div className="research-themes-box-container">
          {
            dataResearchThemes.map((item, index)=>{
              if(this.props.indexesToShow===undefined || this.props.indexesToShow.includes(index))
                return <>
                  <ResearchThemeComponent
                    title={item.title}
                    themes={dataResearchThemes[index].content} 
                  />
                </>
              else
                return <div/>
            })
          }
        </div>
      </>
    )
  }
}

class ResearchThemeComponent extends Component {
  render(){
  
    
    return(
      <div className={"research-themes-box"}>
        <h3>{this.props.title}</h3>
        <div className="research-theme-circle-container">
          {this.props.themes.map((data, i) => {
            return <div className="research-theme-circle">
              {data}
            </div>
          })}
        </div>
      </div>
    )
  }
}