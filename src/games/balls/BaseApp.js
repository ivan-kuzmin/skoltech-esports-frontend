import { Component } from 'react';

class BaseApp extends Component {
  componentDidMount() {
    const { token } = this.state;
    if (token) this.getUser();
  }

  getUser = () => {
    const { url, token } = this.state;
    fetch(url, { headers: { Authorization: `Token ${token}` } })
      .then(response => response.json())
      .then(data => this.getUserSuccess(data))
      .catch((err) => { console.warn('Fetch Error: ', err); });
  }

  saveResult = (result) => {
    const { url, token } = this.state;
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    })
      .then(response => response.json())
      .then(data => this.saveResultSuccess(data))
      .catch((err) => { console.warn('Fetch Error: ', err); });
  }

  changeLanguage = () => {
    let { current_lang } = this.state;
    const { cookies } = this.props;
    current_lang = (current_lang === 'ru') ? 'en' : 'ru';
    cookies.set('language', current_lang, { path: '/' });
    this.setState({ current_lang });
  }

  onSetAppState = (newState, callback) => this.setState(newState, callback)
}

export default BaseApp;
