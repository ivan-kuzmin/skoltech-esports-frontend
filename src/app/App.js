import React, { Component } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Button,
  Spinner,
} from 'reactstrap';
import styled from 'styled-components';
import NavbarMenu from './components/NavbarMenu';
import HomeScreen from './components/HomeScreen';
// import Balls from './components/Balls'
// import UsersScreen from './components/UsersScreen'

const MenuFilter = styled.div`
  background: rgba(0,0,0,0.4);
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      visibleMenu: false,
    };
  }

  componentDidMount() {
    const { firebase } = this.props;
    this.firebaseListener = firebase.auth.onAuthStateChanged(user => this.setState({ user, isLoading: false }));
  }

  componentWillUnmount() { this.firebaseListener(); }

  login = () => {
    const { firebase } = this.props;
    const email = 'woof@heisen.me';
    const password = '123456';
    this.setState({ isLoading: true }, () => {
      firebase.auth.signInWithEmailAndPassword(email, password)
        .then(() => this.setState({ isLoading: false }))
        .catch(() => this.setState({ isLoading: false }));
    });
  }

  logout = () => {
    const { firebase } = this.props;
    firebase.auth.signOut();
  }

  toggleMenu = () => { this.setState(state => ({ visibleMenu: !state.visibleMenu })); }

  render() {
    const {
      visibleMenu, user, isLoading,
    } = this.state;
    return (
      <div style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
        <HashRouter>
          <div>
            <Navbar dark style={{ background: 'black' }}>
              <NavbarBrand href="/" className="mr-auto">Skoltech E-sports</NavbarBrand>
              {
                !isLoading
                  ? (
                    <>
                      <div className="ml-auto mr-4 text-white font-weight-light small">{user ? user.email : ''}</div>
                      {!user && <Button className="mr-2" color="success" size="sm" onClick={this.login}>Login</Button>}
                      {user && <Button color="danger" size="sm" onClick={this.logout}>Logout</Button>}
                    </>
                  )
                  : <Spinner className="text-white mr-3" />
              }
            </Navbar>
            <Container fluid className="position-relative" style={{ minHeight: '100vh' }}>
              <Row>
                <NavbarMenu
                  toggleMenu={this.toggleMenu}
                  visibleMenu={visibleMenu}
                />
                {visibleMenu && <MenuFilter onClick={this.toggleMenu} />}
                <Col className="pt-4" style={{ overflow: 'hidden', marginLeft: '60px' }}>
                  <Route path="/" exact component={() => <Redirect from="/" to="/home" />} />
                  <Route path="/home" exact component={HomeScreen} />
                  {/* <Route path="/home/balls" component={Balls} /> */}
                  {/* <Route path="/users/" component={UsersScreen} /> */}
                </Col>
              </Row>
            </Container>
          </div>
        </HashRouter>
      </div>
    );
  }
}

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  firebase: PropTypes.object.isRequired,
};

export default App;
