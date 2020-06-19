import React from 'react'

import logo from '../images/logo.png'
import '../styles/Normalize.css'
import '../styles/index.css'

class ShowList extends React.Component{
state = {
  data: {
    results: [],
  }
};
  componentDidMount(){
    this.fetchCharacters()
  }
  fetchCharacters = async() => {
    const response = await fetch('https://rickandmortyapi.com/api/character/')
    const data = await response.json();

    this.setState({
      data: data
    })
  }
render(){
  return(
    <div className="container">
      <div className="App">
      <img className="Logo" src={ logo } alt="Rick and morty"/>
      <ul className="row">
        {this.state.data.results.map(character => (
          <li className="col-6 col-md-3" key={character.id}>
          <div className="CharacterCard" 
          style={{ backgroundImage: `url(${character.image})` }}> 
          <div className="CharacterCard__name-container text-truncate">
            {character.name}
          </div>
          </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
    )
  }
}

export default ShowList;