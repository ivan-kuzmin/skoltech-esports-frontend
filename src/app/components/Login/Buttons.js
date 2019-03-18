import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const Buttons = (props) => {
  const {
    email, password, confirm, registration, setRegistration, login, signIn,
  } = props;

  return (
    <>
      <div
        className={`d-inline-block mt-2 ${registration ? 'w-100 pr-0' : 'w-50 pr-2'}`}
        style={{ transition: '0.2s' }}
      >
        <Button
          onClick={() => (registration ? signIn(email, password, confirm) : setRegistration(true))}
          size="sm"
          color="primary w-100"
        >
          Sign in
        </Button>
      </div>
      <div
        className={`d-inline-block ${registration ? 'pl-0' : 'pl-2'}`}
        style={{ width: registration ? 0 : '50%', transition: '0.2s' }}
      >
        {
          !registration && (
            <Button
              onClick={() => login(email, password)}
              size="sm"
              color="success w-100"
            >
              Login
            </Button>
          )
        }
      </div>
    </>
  );
};

Buttons.propTypes = {
  registration: PropTypes.bool.isRequired,
  setRegistration: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirm: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
};

export default Buttons;
