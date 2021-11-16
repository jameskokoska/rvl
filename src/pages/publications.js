import React,{Component} from 'react'
import TextInput from '../components/textInput'
import {dataPublications} from "../data/publications.js"
import PublicationEntry, { PublicationTag } from '../components/publicationEntry';
import PageHeader from '../components/pageHeader';

function convertAuthorList(bibtexAuthorList){
  if(!bibtexAuthorList.toLowerCase().includes(" and ")){
    return bibtexAuthorList;
  }
  let authors = bibtexAuthorList.split(/ and /ig)
  let authorsOut = ""
  for(let i=0; i<authors.length; i++){
    if(i===authors.length-1){
      authorsOut = authorsOut + " and " + authors[i]
    } else {
      authorsOut = authorsOut + authors[i] + ", "
    }
  }
  return authorsOut
}

function cleanupBibEntry(bibtexPassed){
  let bibtex = bibtexPassed
  bibtex = bibtex.replaceAll("{{","{")
  bibtex = bibtex.replaceAll("}}","}")
  bibtex = bibtex.replace(/\s+/g, " ");
  bibtex = bibtex.replaceAll(" = ","=")
  bibtex = bibtex.replaceAll(" =","=")
  bibtex = bibtex.replaceAll("= ","=")
  bibtex = bibtex.replaceAll("\"{","{")
  bibtex = bibtex.replaceAll("}\"","}")
  bibtex = bibtex.replaceAll("\n","")

  const bibtexLower = bibtex.toLowerCase()

  let attributesToFormat = ["title","author","year","booktitle","journal"]
  for(let i=0; i<attributesToFormat.length; i++){
    let stringToFind = ", "+attributesToFormat[i]+"={"
    let indexStart = bibtexLower.indexOf(stringToFind)
    let indexEnd = bibtexLower.indexOf(stringToFind) + stringToFind.length
    
    if(indexStart===-1){
      continue
    } else {
      bibtex = bibtex.replace(bibtex.substring(indexStart,indexEnd), bibtex.substring(indexStart,indexEnd).toLowerCase())
    }
  }
  

  return bibtex
}

const bibtexParse = require('bibtex-parse-js');

export default class Publications extends Component {
  constructor(props){
    super(props)
    this.searchTerm = ""
    this.selectedTags = []
    this.state={publications:[], shownPublications:[], allTags: []}
  }

  async componentDidMount(){
    let publications = []
    for(let i=0; i<dataPublications.length; i++){
      let publication = dataPublications[i]
      let publicationJSON = bibtexParse.toJSON(cleanupBibEntry(dataPublications[i]["bibtex"]))[0];
      publication["title"] = publicationJSON["entryTags"]?.["title"]??""
      publication["author"] = convertAuthorList(publicationJSON["entryTags"]?.["author"]??"")
      publication["year"] = publicationJSON["entryTags"]?.["year"]??""
      publication["booktitle"] = publicationJSON["entryTags"]?.["booktitle"]??""
      publication["journal"] = publicationJSON["entryTags"]?.["journal"]??""
      publications.push(publication)
    }
    //Sort array of publications by year
    publications.sort(function(a, b) {
      let textA = a["booktitle"].toUpperCase();
      let textB = b["booktitle"].toUpperCase();
      return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
    });
    publications.sort(function(a, b) {
      let textA = a["year"].toUpperCase();
      let textB = b["year"].toUpperCase();
      return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
    });
    let allTags = this.getAllTags(publications)
    this.setState({publications:publications, shownPublications:publications, allTags: allTags})
  }


  filterPublications = () => {
    if(this.searchTerm === "" && this.selectedTags.length===0){
      this.setState({shownPublications:this.state.publications})
      return
    }
    let publications = this.state.publications
    let publicationsOut = []
    for(let i = 0; i<publications.length; i++){
      for(let j = 0; j<publications[i]["tags"].length; j++){
        if(this.selectedTags.includes(publications[i]["tags"][j]) || this.selectedTags.length===0){
          if(this.searchTerm === ""){
            publicationsOut.push(publications[i])
          } else if(publications[i]["title"].toLowerCase().includes(this.searchTerm.toLowerCase())){
            publicationsOut.push(publications[i])
          } else if (publications[i]["author"].toLowerCase().includes(this.searchTerm.toLowerCase())){
            publicationsOut.push(publications[i])
          } else if (publications[i]["booktitle"].toLowerCase().includes(this.searchTerm.toLowerCase())){
            publicationsOut.push(publications[i])
          } else if (publications[i]["journal"].toLowerCase().includes(this.searchTerm.toLowerCase())){
            publicationsOut.push(publications[i])
          }
          
        }
      }
    }

    this.setState({shownPublications:publicationsOut})
  }

  getAllTags = (publications) => {
    let allTags = []
    for(let i = 0; i<publications.length; i++){
      if(publications[i]["tags"]!==undefined){
        for(let j = 0; j<publications[i]["tags"].length; j++){
          if(!allTags.includes(publications[i]["tags"][j])){
            allTags.push(publications[i]["tags"][j])
          }
        }
      }
    }
    allTags.sort(function(a, b) {
      let textA = a.toUpperCase();
      let textB = b.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return allTags
  } 

  addSelectedTag = (tag) => {
    this.selectedTags.push(tag)
    this.filterPublications()
  }

  removeSelectedTag = (tag) => {
    let array = [...this.selectedTags];
    let index = array.indexOf(tag)
    if (index !== -1) {
      array.splice(index, 1);
      this.selectedTags = array
      this.filterPublications()
    }
  }
  
  render(){
    let previousYear = ""
    return(<>
      <div className="center">
        <div className="horizontal-padding max-width">
          <PageHeader showBreak={false} title="Publications">
            <p style={{margin:"10px 0px"}}>Publications by categories in reversed chronological order</p>
            <div style={{marginRight:"30px"}}>
              <TextInput onChange={(searchTerm)=>{this.searchTerm = searchTerm; this.filterPublications()}} placeholder={"Search title, author, book title..."}/>
            </div>
            {this.state.allTags!==undefined?<div>{this.state.allTags.map((tag)=>{
              return <PublicationTag tag={tag} addSelectedTag={this.addSelectedTag} removeSelectedTag={this.removeSelectedTag} selected={this.selectedTags.includes(tag)}/>
            })}</div>:<div/>}
          </PageHeader>
          {this.state.shownPublications.map((publication, index)=>{
            if(publication["year"]!==previousYear){
              previousYear=publication["year"]
              return <>
                <PublicationEntry showYear={true} key={index} publication={publication} selectedTags={this.selectedTags} addSelectedTag={this.addSelectedTag} removeSelectedTag={this.removeSelectedTag}/>
              </>
            } else {
              return <>
                <PublicationEntry key={index} publication={publication} selectedTags={this.selectedTags} addSelectedTag={this.addSelectedTag} removeSelectedTag={this.removeSelectedTag}/>
              </>
            }
          })}
          <div style={{height:"50px"}}/>
        </div>
      </div>
    </>)
  }
}