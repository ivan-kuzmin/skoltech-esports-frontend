import React, { Component } from 'react'
import { withCookies } from 'react-cookie';
import Menu from './components/Menu'
import Filter from './components/Filter'
import globalState, { lang } from './globalState'

class App extends Component {
  state = {
    token: this.props.cookies.get('token'),
    current_lang: this.props.cookies.get('language') || 'en'
  }
  getUser = () => {
    fetch(globalState.url, { headers: { Authorization: `Token ${this.state.token}` } })
    .then(response => response.json())
    .then(data => {
      this.setState({
        status: true,
        user: {username: data.username},
        current_level: data.current_level,
        results: data.results
      })
      globalState.current_level = data.current_level
      globalState.results = data.results
      console.log(data)
    })
    .catch((err) => {
      this.setState({status: false})
      console.log('Fetch Error: ', err)
    })
  }
  componentDidMount() {
    if (this.state.token) {
      this.getUser()
    }
  }
  // startNewGame = () => {
  //   window.createBalls(globalState.current_level.speed)
  //   newGameButton.attribute('disabled', 'true')
  //   select('#app').style('z-index', 0)
  //   filter.hide()
  //   language.hide()
  //   window.startGameFunction()
  // }
  changeLanguage = () => {
    let { current_lang } = this.state
    current_lang = (current_lang === 'ru') ? 'en' : 'ru'
    this.props.cookies.set('language', current_lang, { path: '/' })
    this.setState({ current_lang })
  }
  render() {
    const { current_lang, status, current_level, results } = this.state
    return (
      <div className="w-100 h-100 d-flex">
        <Menu current_level={current_level} status={status} lang={lang[current_lang]} />
        <Filter user={this.state.user} results={results} status={status} lang={lang[current_lang]} changeLanguage={this.changeLanguage} />
      </div>
    )
  }
}

export default withCookies(App);
