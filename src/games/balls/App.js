import React, { Component } from 'react'
import { withCookies } from 'react-cookie';
import Menu from './components/Menu'
import Filter from './components/Filter'
import globalState, { lang } from './globalState'
import styled from 'styled-components'

class App extends Component {
  state = {
    status: false,
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
      console.log('Fetch Error: ', err)
    })
  }
  componentDidMount() {
    console.log("App mount")
    if (this.state.token) {
      this.getUser()
    }
  }
  changeLanguage = () => {
    let { current_lang } = this.state
    current_lang = (current_lang === 'ru') ? 'en' : 'ru'
    this.props.cookies.set('language', current_lang, { path: '/' })
    this.setState({ current_lang })
  }
  render() {
    const { current_lang, status, current_level, results, newGame, token } = this.state
    return (
      <div className="w-100 h-100 d-flex">
        <Menu
          token={token}
          current_level={current_level}
          status={status}
          lang={lang[current_lang]} />
        <Filter
          user={this.state.user}
          results={results}
          status={status}
          current_lang={current_lang}
          lang={lang[current_lang]}
          changeLanguage={this.changeLanguage}
          ref={ref => window.filterComponent = ref} />
      </div>
    )
  }
}

export default withCookies(App);
