import React,{Component} from 'react'
import './teamMember.css';

export default class TeamMember extends Component {
  render(){
    let children = <div className="team-member-box">
      <div style={{display:"flex", flexDirection:"row"}}>
        <div>
          <img alt={this.props.teamMember.name} className="team-member-image" src={process.env.PUBLIC_URL+"/"+this.props.teamMember.image}/>
        </div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
          <h3 className="team-member-title">{this.props.teamMember.name}</h3>
          <p dangerouslySetInnerHTML={{__html: this.props.teamMember.description}}/>
        </div>
      </div>
    </div>
    if(this.props.teamMember.link!==undefined && this.props.teamMember.link!==""){
      return <a href={this.props.teamMember.link} className="no-decoration">{children}</a>
    } else {
      return <div className="no-hover">{children}</div>
    }
  }
}
