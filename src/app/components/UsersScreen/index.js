import React, { Component } from "react";
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch'
// import { Container, Card, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody } from 'reactstrap';

class UsersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "Hello",
      stateSketch: sketch,
    };
  }
  componentDidMount() {
    // console.log('Hello')
    // fetch('http://127.0.0.1:8000/')
    // .then(response => response.json())
    // .then(data => {
    //   this.setState({
    //     data: data
    //   })
    // })
    // .catch((err) => {
    //   console.log('Fetch Error :-S', err)
    // })
  }
  render() {
    return(
      <div>
        <h1>Users</h1>
        {JSON.stringify(this.state.data)}
        <P5Wrapper sketch={this.state.stateSketch} />
      </div>
    )
  }
}

export default UsersScreen;
