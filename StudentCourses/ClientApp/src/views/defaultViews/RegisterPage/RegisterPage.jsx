import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import * as registerListActions from './reducer';
import InputMask from 'react-input-mask';
import { TextField } from '@material-ui/core';
import Background from "../../../assets/images/back.jpg";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  Input
} from "mdbreact";

import get from "lodash.get";

class RegisterPage extends Component {

  state = {
    email: '',
    password: '',
    passwordconfirm: '',
    name: '',
    lastname: '',
    phonenumber: '',
    dateofbirth: '',
    errorsState: {},
    errorServer: {},
    done: false,
    isLoading: false,
    visible: false,
    iconInput: 'eye-slash',
    typeInput: 'password'
  }

  mouseEnter = () => {
    this.setState({
      iconInput: 'eye',
      typeInput: 'text'
    });
  };

  mouseLeave = () => {
    this.setState({
      iconInput: 'eye-slash',
      typeInput: 'password'
    });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const { email, password, passwordconfirm, name, lastname, phonenumber, dateofbirth } = this.state;
    const regex_phone = /\(\+38\)\d{3} \d{3} \d{2} \d{2}/;
    const regex_dateofbirth = /^\d{4}.(0[1-9]|1[0-2]).(0[1-9]|[12][0-9]|3[01])$/;

    let errorsState = {};

    if (password === '') errorsState.password = " Input password! ";
    if (passwordconfirm === '') errorsState.passwordconfirm = " Input confirm password! "
    if (password != passwordconfirm) errorsState.passwordconfirm = " Passwords do not match! ";
    if (name === '') errorsState.name = " Input name! ";
    if (lastname === '') errorsState.lastname = " Input last name! ";
    if (phonenumber === ' ') errorsState.phonenumber = " Input phone number! ";
    if (dateofbirth === ' ') errorsState.dateofbirth = " Input date of birth! ";
    if (phonenumber === '') errorsState.phonenumber = " Input phone number! ";
    if (!regex_phone.test(phonenumber)) errorsState.phonenumber = " Please input correct phone number! ";
    if (dateofbirth === '') errorsState.dateofbirth = " Input date of birth! ";
    if (!regex_dateofbirth.test(dateofbirth)) errorsState.dateofbirth = " Please input correct date of birth! ";

    const isValid = Object.keys(errorsState).length === 0
    if (isValid) {
      this.setState({ isLoading: true });
      const model = {
        email: email,
        password: password,
        passwordconfirm: passwordconfirm,
        name: name,
        lastname: lastname,
        phonenumber: phonenumber,
        dateofbirth: dateofbirth
      };

      this.props.Register(model);
    }
    else {
      this.setState({ errorsState });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState(
      {
        errorServer: nextProps.redusererrors
      }
    )
  }

  setStateByErrors = (name, value) => {
    if (!!this.state.errorsState[name]) {
      let errorsState = Object.assign({}, this.state.errorsState);
      delete errorsState[name];
      this.setState(
        {
          [name]: value,
          errorsState
        }
      )
    }
    else {
      this.setState(
        { [name]: value })
    }
  }

  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);
  }

  render() {
    const { errorsState, iconInput, typeInput, errorServer } = this.state;
    const form = (
      <div className="main-div background-image" style={{ backgroundImage: "url(" + Background + ")" }}>
        <MDBContainer>
          <MDBRow style={{ height: '100vh' }} className="justify-content-center align-items-center">
            <MDBCol md="5">
              <form onSubmit={this.onSubmitForm}>
                <p className="h5 text-center mb-4">Registration!</p>
                <div className="grey-text">
                  {!!errorsState.name ? <div style={{ color: "red" }}>{errorsState.name}</div> : ""}
                  <MDBInput label="Name"
                    icon="user"
                    type="text"
                    placeholder="Name"
                    id="name"
                    autoComplete="name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  {!!errorsState.lastname ? <div style={{ color: "red" }}>{errorsState.lastname}</div> : ""}
                  <MDBInput l
                    label="Last name"
                    icon="user"
                    type="text"
                    placeholder="Last name"
                    id="lastname"
                    autoComplete="lastname"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.handleChange}
                  />
                  <MDBInput
                    label="Email"
                    icon="envelope"
                    type="email"
                    placeholder="Електронна пошта"
                    id="email"
                    autoComplete="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  {!!errorsState.phonenumber ? <div style={{ color: "red" }}>{errorsState.phonenumber}</div> : ""}
                  <MDBInput
                    label="Phone number ((+38)999 999 99 99)"
                    icon="phone"
                    type="text"
                    placeholder="(+38)999 999 99 99"
                    id="phonenumber"
                    autoComplete="phonenumber"
                    name="phonenumber"
                    value={this.state.phonenumber}
                    onChange={this.handleChange}
                  />
                  {!!errorsState.dateofbirth ? <div style={{ color: "red" }}>{errorsState.dateofbirth}</div> : ""}
                  <MDBInput
                    label="Date of birth (YYYY.MM.DD)"
                    icon="calendar"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    id="dateofbirth"
                    autoComplete="dateofbirth"
                    name="dateofbirth"
                    value={this.state.dateofbirth}
                    onChange={this.handleChange}
                  />
                  {!!errorsState.password ? <div style={{ color: "red" }}>{errorsState.password}</div> : ""}
                  <MDBInput
                    label="Password"
                    icon={iconInput}
                    type={typeInput}
                    id="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="password"
                    onIconMouseEnter={this.mouseEnter}
                    onIconMouseLeave={this.mouseLeave}
                    onChange={this.handleChange}
                  />
                  {!!errorsState.passwordconfirm ? <div style={{ color: "red" }}>{errorsState.passwordconfirm}</div> : ""}
                  <MDBInput
                    label="Confirm password"
                    icon={iconInput}
                    type={typeInput}
                    id="passwordconfirm"
                    name="passwordconfirm"
                    placeholder="passwordconfirm"
                    autoComplete="passwordconfirm"
                    onIconMouseEnter={this.mouseEnter}
                    onIconMouseLeave={this.mouseLeave}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <div className="p-2 bd-highlight">
                    <MDBBtn type="submit" color="brown" className="px-4">Registartion</MDBBtn>
                  </div>
                </div>
                {!!errorServer ? <div style={{ color: "red" }}>{errorServer.errorMessage}</div> : ""}
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
    return (
      this.props.success ? <Redirect to='/login' /> : form
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: get(state, 'register.post.loading'),
    failed: get(state, 'register.post.failed'),
    success: get(state, 'register.post.success'),
    redusererrors: get(state, 'register.post.errors')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    Register: filter => {
      dispatch(registerListActions.Register(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);