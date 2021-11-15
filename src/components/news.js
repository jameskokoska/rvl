import React,{Component} from 'react'
import './news.css';
import {dataNews} from "../data/news.js"

export default class News extends Component {
  constructor() {
    super();
    this.amountShow = 5;
    this.state={show:this.amountShow}
  }
  render(){
    return(
      <>
        <h2 className="news-title">News</h2>
        <div className="news-box-container">
          {
            dataNews.map((item, index)=>{
              if(index >= this.state.show || index < this.state.show - this.amountShow){
                return <></>
              } else {
                return <div className="news-box">
                  <p dangerouslySetInnerHTML={{__html: getMonth(item.date) + " " + getYear(item.date) + ": " + item.content}}/>
                </div>
              }
            })
          }
          <div style={{width:"100%", marginTop:"10px"}}>
            <div style={{float:"left"}} onClick={()=>{if(!(this.state.show-this.amountShow<=0)) this.setState({show:this.state.show-this.amountShow})}} className={"news-load-more-button " + (this.state.show-this.amountShow<=0?"news-load-more-button-disabled":"")}>
              Newer
            </div>
            <div style={{float:"right"}} onClick={()=>{if(!(this.state.show>dataNews.length)) this.setState({show:this.state.show+this.amountShow})}} className={"news-load-more-button " + (this.state.show>dataNews.length?"news-load-more-button-disabled":"")}>
              Older
            </div>
          </div>
        </div>
      </>
    )
  }
}

//format: 2021-08-25 (year, month, day)
function getYear(date){
  if(date===undefined||date.split("-").length!==3){
    return "";
  }
  return date.split("-")[0];
}
const monthsShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"]
function getMonth(date){
  if(date===undefined||date.split("-").length!==3){
    return "";
  }
  return monthsShort[parseInt(date.split("-")[1])-1];
}