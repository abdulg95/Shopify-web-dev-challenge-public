import React, { Component } from 'react';
import Repos from './Components/Repos/Repos';
import './App.css';
let searchTerm;
let tags_endpoint;
let mergedArray = [];



class App extends Component {
    static navigationOptions = {
        title: 'Home',
      };

  constructor() {
    super();    
    this.state = {
         repositories: [], 
         tag_names: [],
         isLoading: true,
         favourites: []
        }
        
}



componentWillMount(){
 
}


render() {
    
    return(
        <div>
            <div className="App-header">
                <h2>My Github Favourites</h2>
            </div>
            <div class="wrap">
            
            <div class="fleft">
            <form onSubmit = {this.formPreventDefault}>
            <input type="text" className="searchbox" id = "srch" ref={(input) => { this.searchBox = input; }}/>
            <button id = "srchbtn" onClick={this.onClick} >Search</button>
            </form>               

            <table class="table ">            
            <tr>
                <th>Name</th>
                <th>Language</th> 
                <th>Latest Tag</th>
                <th></th>
            </tr>
            <tbody><Repos repos = {mergedArray} changed = {this.handleAdd} /> </tbody>           
            </table>                      
            {console.log(mergedArray)}
            </div>            
            <div class="fright">
            <table class="table ">            
            <tr>
                <th>Name</th>
                <th>Language</th> 
                <th>Latest Tag</th>
                <th></th>
            </tr>
            <tbody><Repos repos = {this.state.favourites} removed  = {this.handleRemove} /> </tbody>           
            </table>                   
            </div>

            </div>
            
        </div>
        
        );
        
}

componentDidMount(){
 
}


handleAdd = (event,id) =>{
    //console.log("Button was clicked");
    const repoIndex = mergedArray.findIndex(r =>{
      return r.id ===id;
    });

    const repo = {
      ...mergedArray[repoIndex]
    };

    const favourites = [...this.state.favourites];
    repo.favourite = true;
    favourites.push(repo);
    this.setState({      
      favourites: favourites 
    })
    event.preventDefault();
  }


handleRemove= (event,id) =>{
    const repoIndex = this.state.favourites.findIndex(r =>{
        return r.id ===id;
      });
      const repo = {
        ...this.state.favourites[repoIndex]
      };
      repo.favourite = false;
      const faves = this.state.favourites.slice();
    //alternative using es6 function spread, more modern, better
    //const persons = [...this.state.persons];
   faves.splice(repoIndex,1);
    this.setState({favourites: faves})
    event.preventDefault();
}

formPreventDefault(event) {
     event.preventDefault();
  }
 

onClick = (event) => {
    mergedArray =[];
    searchTerm = this.searchBox.value.trim();
    console.log(searchTerm);
    //.trim
    if(searchTerm.length > 0){
        let endpoint = `https://api.github.com/search/repositories?q=${searchTerm}&per_page=10`;
    let mapping;
    let new_tag_names;
    console.log(searchTerm);
    fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + "160433c9600d08415a6fbb9ebda06e95e74202cd"
        }  
      })
      .then(blob => blob.json())
      .then(response => {
          this.setState({ repositories: response.items });
          return response.items;
      })
      .then(response => response.map( ( item, index ) => (                
        tags_endpoint = item.tags_url,
        fetch(tags_endpoint)
        .then(blob => blob.json())
        .then(response => {
            response[0]!==undefined?
            mapping = {index: index, tag_name: response[0].name}: mapping = {index: index, tag_name: " "}
            mergedArray.push({full_name: item.full_name,language: item.language,tag_name: mapping.tag_name,id: item.id, favourite : false})
            new_tag_names = this.state.tag_names.slice();
            new_tag_names.push(mapping);
            this.setState({
                tag_names: new_tag_names
            });
            return response.items;
        })                 
    )) );

    } //blocks submitting 
    event.preventDefault();

}
}

export default App;
