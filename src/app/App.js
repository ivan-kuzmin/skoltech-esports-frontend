import React, { Component } from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Button,
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
    const { cookies } = props;
    this.state = {
      status: false,
      user: { username: '' },
      token: cookies.get('token'),
      visibleMenu: false,
    };
  }

  componentDidMount() { this.getUser(); }

  toggleMenu = () => { this.setState(state => ({ visibleMenu: !state.visibleMenu })); }

  getUser = () => {
    const { token } = this.state;
    if (token) {
      fetch('http://127.0.0.1:8000', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then(response => response.json())
        .then((data) => {
          this.setState({
            status: true,
            user: { username: data.username },
          });
        })
        .catch((err) => {
          this.setState({ status: false });
          console.log('Fetch Error: ', err);
        });
    }
  }

  login = () => {
    const { cookies } = this.props;
    fetch('http://127.0.0.1:8000', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin',
      }),
    })
      .then(response => response.json())
      .then((data) => {
        cookies.set('token', data.token, { path: '/' });
        this.setState({ token: data.token });
        this.getUser();
        console.log(data);
      })
      .catch((err) => {
        this.setState({ status: false });
        console.log('Fetch Error: ', err);
      });
  }

  logout = () => {
    const { cookies } = this.props;
    const { token } = this.state;
    fetch('http://127.0.0.1:8000/logout/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then((data) => {
        cookies.remove('token');
        this.setState({
          status: true,
          user: { username: '' },
          token: cookies.get('token'),
        });
      })
      .catch((err) => {
        this.setState({ status: false });
        console.log('Fetch Error: ', err);
      });
  }

  render() {
    const { visibleMenu, token, user } = this.state;
    return (
      <div style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
        <HashRouter>
          <div>
            <Navbar dark style={{ background: 'black' }}>
              <NavbarBrand href="/" className="mr-auto">Skoltech E-sports</NavbarBrand>
              <div className="ml-auto mr-4 text-white font-weight-light small">{user.username}</div>
              {!token && <Button className="mr-2" color="success" size="sm" onClick={this.login}>Login</Button>}
              {token && <Button color="danger" size="sm" onClick={this.logout}>Logout</Button>}
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

export default withCookies(App);
