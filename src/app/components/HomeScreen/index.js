import React from 'react';
import { Container, CardDeck } from 'reactstrap';
import styled from 'styled-components';
import Game from './Game';
import games from './games';

const Placeholder = styled.div`
  display: flex;
  flex: 1 0;
  flex-direction: column;
  flex-basis: 20%;
  margin: 0 15px;
`;

const HomeScreen = () => (
  <Container fluid className="small px-4 pt-3 pb-5">
    <CardDeck>
      {
        games.map(game => (
          <Game
            key={game.id}
            link={game.link}
            status={game.status}
            image={game.image}
            title={game.title}
            subtitle={game.subtitle}
            description={game.description}
          />
        ))
      }
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </CardDeck>
  </Container>
);

export default HomeScreen;
