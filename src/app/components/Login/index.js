import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Container, Spinner } from 'reactstrap';
import { XSquare } from 'react-feather';
import styled from 'styled-components';
import Inputs from './Inputs';
import Buttons from './Buttons';

const Close = styled(XSquare)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  opacity: 0.4;
  transition: 0.2s;
  :hover {
    opacity: 1;
  }
  :active {
    transform: scale(0.8);
  }
`;

const ResetPass = styled.p`
  cursor: pointer;
  font-size: 0.6rem;
`;

const Login = (props) => {
  const [registration, setRegistration] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const {
    isLoading, toggleLoginForm, login, error, signIn,
  } = props;

  useEffect(() => () => {
    setEmail('');
    setPassword('');
  }, []);

  return (
    <Modal isOpen centered style={{ maxWidth: '400px' }}>
      {
        isLoading
          ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
              <Spinner style={{ width: '3rem', height: '3rem', stroke: '5px' }} />
            </div>
          )
          : (
            <Container className="px-5 pt-4 pb-3">
              <Close onClick={toggleLoginForm} />
              <h5 className="text-center mt-2">Authorization</h5>
              <Inputs
                registration={registration}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirm={confirm}
                setConfirm={setConfirm}
              />
              {error && <p className="text-danger small text-center font-weight-light">{error}</p>}
              <Buttons
                confirm={confirm}
                email={email}
                password={password}
                registration={registration}
                setRegistration={setRegistration}
                login={login}
                signIn={signIn}
              />
              {
                !registration
                  ? (
                    <ResetPass className="text-center text-primary font-weight-light mt-3">
                      {/* Forgot password? */}
                    </ResetPass>
                  ) : (
                    <ResetPass
                      className="text-center text-primary font-weight-light mt-3"
                      onClick={() => setRegistration(false)}
                    >
                      Already have an account?
                    </ResetPass>
                  )
              }
            </Container>
          )
      }
    </Modal>
  );
};

Login.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  toggleLoginForm: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

export default Login;
