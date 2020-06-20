import React from "react"
import ReactDOM from 'react-dom'

import './styles/Normalize.css'
import './styles/index.css'
import logo from './images/logo.png'
import { useState } from "react"

// function SearchBar (props){
// const [query, setQuery] = useState('')
// console.log(props.name.results)

// const filteredCharacters = props.name.filter(character =>{
//   return character.name.toLowerCase().includes(query.toLowerCase())
// });
// console.log(filteredCharacters)
//     return(
//       <div className="searchBox">
//       <input placeholder="Search" className="searchBar" type="text"
//         value={this.state.query}
//         onChange={(e)=>{
//           setQuery(e.target.value)
//         }} 
//       />
//       </div>
//     )
//   }

class ShowList extends React.Component{
constructor(props){
super(props);
  this.state = {
    query:"",
    status:"",
    error: null,
    loading: true,
    page: 1,
    data: {
      results: [],
    },
  }
}

handleChange = event => {
  const value = event.target.value;
  this.setState({
    query: value,
  })
  this.fetchCharacters()
}

componentDidMount(){
  this.fetchCharacters()
}


fetchCharacters = async () => {
  this.setState({loading: true, error: null})
  try{
    if (this.state.query.length > 0){
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${this.state.query.toLowerCase()}&status=${this.state.status}`);
    const data = await response.json()
    this.setState({
      data: {
        info: data.info,
        results:data.results,
      },
      // page: this.state.page + 1,
    })
    console.log(data)
  } else{
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${this.state.page}`);
    const data = await response.json()
    this.setState({
      data: {
        info: data.info,
        results:[].concat(this.state.data.results, data.results)
        },
        loading: false,
        page: this.state.page + 1,
      })
      console.log(this.state.data.results.length)
    }
  } catch(error){
    this.setState({loading:false, error: error})
  }
}
characterCard = (character) =>{
  return(
    <li className="col-6 col-md-3" key={character.id}>
    <div className="characterCard" 
    style={{backgroundImage:`url(${character.image})`}}>
    <div className="CharacterCard__name-container text-truncate">
    {character.name}
    </div>
    </div>
    </li>
  )
}
render(){
  // const names = this.state.data.results;
  // const filteredCharacters = names.filter(character =>{
  //   return character.name.toLowerCase().includes(this.state.query.toLowerCase())
  // });
  // console.log(filteredCharacters)
  // console.log(names);
  // console.log(this.state.query.length)
  if (this.state.data.loading === true && !this.state.data){
    return <h1>Page loading...</h1>
  }
  if(this.state.error){
    return `Error: ${this.state.error.message}`
  }
  if (!this.state.data.results){
    return(
      <div className="container">
      <div className="App">
  <img className="logo" src={logo} alt="Logo"/>
  <div className="searchBox">
  <label><input name="status" type="radio" className="radio"
        onChange={()=> {return this.setState({status:"alive"})}}
        />Alive</label>
                <label><input name="status" type="radio" className="radio"
        onChange={()=> {return this.setState({status:"dead"})}}
        />Dead</label>
                <label><input name="status" type="radio" className="radio"
        onChange={()=> {return this.setState({status:"unknown"})}}
        />Unknown</label>
      <input placeholder="Search" className="searchBar" type="text"
        onChange={this.handleChange}
      />
      <button onClick={ () =>  this.fetchCharacters() } 
      className="all searchButton">Search</button>
      </div>
  {/* <SearchBar name={names}/> */}
      <div>Doesn't find anything...</div>
  </div>
  <div>

    {this.state.data.results && 
      <button onClick={ () =>  this.fetchCharacters() } 
      className="loadMoreButton all">Load more...</button>}
  </div>
      </div>
    )
  } else{
    return(
      <div className="container">
      <div className="App">
      <img className="logo" src={logo} alt="Logo"/>
      <div className="searchBox">
        <label><input name="status" type="radio" className="radio"
        onChange={()=> {return this.setState({status:"alive"})}}
        />Alive</label>
                <label><input name="status" type="radio" className="radio"
        onChange={()=> {return this.setState({status:"dead"})}}
        />Dead</label>
                <label><input name="status" type="radio" className="radio"
        onChange={()=> {return this.setState({status:"unknown"})}}
        />Unknown</label>
        <input placeholder="Search" className="searchBar" type="text"
        onChange={this.handleChange}
        //   (e)=>{
        //   this.setState({query: e.target.value})
        // }} 
      />
      <button onClick={ () =>  this.fetchCharacters() } 
      className="all searchButton">Search</button>
      </div>
  {/* <SearchBar name={names}/> */}
  <ul className="row all">
    {/* {filteredCharacters.map(character => {return( */}
    {!this.state.data.results.length  &&
    <div>Doesn't find anything...</div>
    }
    {this.state.data.results.map(character => this.characterCard(character))}
  </ul>
  </div>
  <div>

    {this.state.data.results.length > 1 && 
      <button onClick={ () => {return(this.fetchCharacters()) }} 
      className="loadMoreButton all">Load more...</button>}
  </div>
      </div>
)
}
}
}

ReactDOM.render(
  <ShowList/>, document.getElementById("root")
);