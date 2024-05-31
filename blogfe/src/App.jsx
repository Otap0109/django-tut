import axios from "axios";
import React from "react";

class App extends React.Component {
  state = { details: [] };

  componentDidMount() {
    let data;
    axios.get("/home/")
      .then(res => {
        data = res.data;
        this.setState({
          details: data,
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <header>Data generated from django</header>
        {this.state.details.map((article, id) => (
          <div key={id}>
            <h1>{article.title}</h1>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
