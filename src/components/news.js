import React,{Component} from 'react'
import './news.css';
import {dataNews} from "../data/news.js"

export default class News extends Component {
  render(){
    return(
      <>
        <h2 className="news-title">News</h2>
        <div className="news-box-container">
          {
            dataNews.map((item, index)=>{
              return <div className="news-box">
                <p dangerouslySetInnerHTML={{__html: getMonth(item.date) + " " + getYear(item.date) + ": " + item.content}}/>
              </div>
            })
          }
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