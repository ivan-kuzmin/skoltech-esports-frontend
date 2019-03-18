import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

const Inputs = (props) => {
  const {
    registration, email, setEmail, password, setPassword, confirm, setConfirm,
  } = props;

  return (
    <>
      <FormGroup className="mb-3 small">
        <Label for="email" className="mb-0">Email</Label>
        <Input bsSize="sm" type="email" name="email" id="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      </FormGroup>
      <FormGroup className={`small ${registration ? 'mb-3' : 'mb-4'}`} style={{ transition: '0.2s' }}>
        <Label for="password" className="mb-0">Password</Label>
        <Input bsSize="sm" type="password" name="password" id="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      </FormGroup>
      <FormGroup className={`small ${registration ? 'mb-4' : 'mb-0'}`} style={{ transition: '0.2s', height: registration ? '50px' : 0, overflow: 'hidden' }}>
        <Label for="password" className="mb-0">Confirm</Label>
        <Input bsSize="sm" type="password" name="confirm" id="confirm" placeholder="Confirm" value={confirm} onChange={e => setConfirm(e.target.value)} />
      </FormGroup>
    </>
  );
};

Inputs.propTypes = {
  registration: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  confirm: PropTypes.string.isRequired,
  setConfirm: PropTypes.func.isRequired,
};

export default Inputs;
