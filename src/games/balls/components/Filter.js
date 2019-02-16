import React, { Component } from 'react'
// import { withCookies } from 'react-cookie';
// import { Container, Row, Col, Navbar, NavbarBrand, Button } from 'reactstrap'
import styled from 'styled-components'
import Spinner from './Spinner'
import Language from './Language'
import Result from './Result'

const Background = styled.div`
  background: rgba(0,0,0,0.7);
  display: flex;
  flex: 0 0 80%;
  max-width: 80%;
  justify-content: center;
  align-items: center;
`

const ResultsContainer = styled.div`
  min-width: 500px;
  height: 500px;
  -webkit-box-shadow: 10px -10px 0px 0px rgba(0,0,0,0.7);
  -moz-box-shadow: 10px -10px 0px 0px rgba(0,0,0,0.7);
  box-shadow: 10px -10px 0px 0px rgba(0,0,0,0.7);
`

const Results = styled.div`
  overflow: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar {
    display: none;
  }
`

class Filter extends Component {
  render() {
    const { lang, changeLanguage, status, user, results } = this.props
    return (
      <Background id="filter">
        <ResultsContainer id="results_container" className="bg-warning pt-4 pb-3 px-3 d-flex flex-column">
          <h3 className="text-center text-uppercase mb-3 font-weight-bold">{lang.last_results}:</h3>
          <Results id="results" className="flex-fill bg-dark text-light py-3 text-center px-4">
            {
              status ?
                <div>
                  <h5 className="mt-2 mb-3">User: {user.username}</h5>
                  <ul className="m-0 p-0" style={{listStylePosition: "inside"}}>
                    {results.map((result, i) => <Result key={i} result={result} />)}
                  </ul>
                  <div>...</div>
                </div> :
                <Spinner />
            }
          </Results>
        </ResultsContainer>
        <Language changeLanguage={changeLanguage} />
      </Background>
    )
  }
}

export default Filter;
