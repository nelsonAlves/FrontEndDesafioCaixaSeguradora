import { Component } from "react";
import Navbar from "./Navbar";
import Profile from "./Profile";
import Repo from "./Repo";


class App extends Component{

  constructor(){  
    super();
    this.state = {
      gitHub: {

        url: "https://api.github.com/users",
        client_id: "Iv1.7bf46f7d6225b4a9",
        client_secret: "7a8b52ab7de85e1228325b588492d1151aaf8fca"
      },

      user:  [],
      repos: []
    };
  }

  getUser = e => {

    const user = e.target.value;

    const {url, client_id, client_secret} = this.state.gitHub;
    
        
        fetch(
            `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`
            ).then(({data}) => this.setState({user: data}));

        fetch(
          `${url}/${user}/repos?client_id=${client_id}&client_secret=${client_secret}`
          ).then(({data}) => this.setState({repos: data}));
  };

  renderProfile = () => {

    const { user, repos } = this.state;

    return(

      <div className="row">
        <div className="col-md-4">
            <Profile user={user}/>
        </div>
        <div className="col-md-8">
          
            {repos.map(repo => (
              <Repo key={repo.name} repo={repo} />
            ))}
        </div>
      </div>
    )
  }

  render(){
   
    return (
      <div className="App">
        <Navbar />   

        <div className="container">
          <div className="card card-body">
              <h1>Pesquisar Usuários GitHub</h1>
              <p className="lead">
                  Digite um nome para encontrar um usuário:
              </p>
              <input id="search" onChange={this.getUser} type="text" className="form-control" required />
          </div>
              {this.state.user !==0 ? this.renderProfile() : null}
      </div>   
    </div>
    );
  
  }
}
export default App;
