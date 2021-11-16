import React,{Component} from 'react'
import {dataTeam} from "../data/team"
import TeamMember from '../components/teamMember';
import PageHeader from '../components/pageHeader';
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
  default: 2,
  985: 1,
};

export default class Team extends Component {
  render(){
    let keysIn = Object.keys(dataTeam)
    let keys = []
    for(let i = 0; i< keysIn.length; i++){
      keys.push("title")
      keys.push(keysIn[i])
    }
    return(<div className="center">
      <div className="horizontal-padding max-width">
        <PageHeader title="Team"/>
        <div style={{height:"10px"}}/>
          {keys.map((key, keyIndex)=>{
            if(key==="title"){
              return <h2 key={key} style={{marginBottom:"5px", marginTop:"10px", textTransform:"capitalize"}}>{keys[keyIndex+1]}</h2>
            }
            return <>
              <Masonry key={key} breakpointCols={breakpointColumnsObj} className="masonry-grid">
                {dataTeam[key].map((teamMember)=>{
                  return <TeamMember key={teamMember.name} teamMember={teamMember}/>
                })}
              </Masonry>
            </>
          })}
        <div style={{height:"50px"}}/>
      </div>
    </div>)
  }
}