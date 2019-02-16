import React, { Component } from "react";
// import { Link } from 'react-router-dom'
import { Container, CardDeck } from 'reactstrap';
import styled from 'styled-components'
import Game from "./Game"
import ballsImage from './balls.png'
import ballsImage1 from './balls1.png'
import ballsImage2 from './balls2.png'

const Placeholder = styled.div`
  display: flex;
  flex: 1 0;
  flex-direction: column;
  flex-basis: 20%;
  margin: 0 15px;
`

const games = [
  {
    link: "/games/balls",
    image: ballsImage,
    title: "Balls",
    subtitle: "Card subtitle",
    description: "You need remember the red balls, then they will change color to blue and you need follow them.",
  },
  {
    link: "/games/reaction_test",
    image: ballsImage1,
    title: "Reaction test",
    subtitle: "Card subtitle",
    description: "A red circle will show up at the center of the screen after a random time. After you see the circle, you should click <i>«Left Mouse»</i> or <i>«Space»</i> button as soon as possible.",
  },
  {
    link: "/games/reaction_decision_test",
    image: ballsImage2,
    title: "Reaction + Decision Test",
    subtitle: "Card subtitle",
    description: "A red or blue circle will show up at the center of the screen after a random time. After you see the circle, you should click mouse buttons (red = <i>«Left Click»</i>, blue = <i>«Right Click»</i>) as soon as possible.",
  },
  {
    link: "/games/balls3",
    image: ballsImage2,
    title: "Balls 3",
    subtitle: "Card subtitle",
    description: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
  },
]

class HomeScreen extends Component {
  goToGame(link) {
    window.location.href = link
  }
  render = () => (
    <Container fluid className="small px-4 pt-3 pb-5">
      <CardDeck>
        {
          games.map((game, i) => <Game
            key={i}
            link={game.link}
            image={game.image}
            title={game.title}
            subtitle={game.subtitle}
            description={game.description}
          />)
        }
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
      </CardDeck>
    </Container>
  )
}

export default HomeScreen;
