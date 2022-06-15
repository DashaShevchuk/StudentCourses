import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import * as registerListActions from './reducer';
import InputMask from 'react-input-mask';
import { TextField } from '@material-ui/core';
import Background from "../../../assets/images/back.jpg";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import deLocale from "date-fns/locale/en-AU";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn
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
    dateofbirth: null,
    errorsState: {},
    errorServer: {},
    done: false,
    isLoading: false,
    visible: false,
    iconInput: 'eye-slash',
    typeInput: 'password'
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const { email, password, passwordconfirm, name, lastname, phonenumber, dateofbirth } = this.state;
    const regex_phone = /\(\+38\)\d{3} \d{3} \d{2} \d{2}/;
    const regex_email = /^\S+@\S+\.\S+$/;
    let errorsState = {};
    if (!dateofbirth) errorsState.dateofbirth = "Field is empty";
    if (dateofbirth === ' ') errorsState.dateofbirth = " Input date of birth! ";
    if (passwordconfirm === '') errorsState.passwordconfirm = " Input confirm password! "
    if (password != passwordconfirm) errorsState.passwordconfirm = " Passwords do not match! ";
    if (name === '') errorsState.name = " Input name! ";
    if (lastname === '') errorsState.lastname = " Input last name! ";
    if (phonenumber === '') errorsState.phonenumber = " Input phone number! ";
    if (!regex_phone.test(phonenumber)) errorsState.phonenumber = " Please input correct phone number! ";
    if (email === '') errorsState.email = " Input email! ";
    if (!regex_email.test(email)) errorsState.email = " Please input correct email! ";

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

 handleDateChange = (date) => {
    if (!!this.state.errorsState['dateofbirth']) {
      let errorsState = Object.assign({}, this.state.errorsState);
      delete errorsState['dateofbirth'];
      this.setState(
        {
          dateofbirth: date,
          errorsState
        }
      )
    }
    else {
      this.setState({ dateofbirth: date });
    }
  };
 
  render() {
    const { errorsState, typeInput, errorServer } = this.state;
    const form = (
      <div className="main-div background-image" style={{ backgroundImage: "url(" + Background + ")" }}>
        <MDBContainer>
          <MDBRow style={{ height: '100vh' }} className="justify-content-center align-items-center">
            <MDBCol md="5">
              <form onSubmit={this.onSubmitForm}>
                <p className="h5 text-center mb-4">Registration!</p>
                <div className="grey-text">
                  {!!errorsState.name ? <div style={{ color: "red" }}>{errorsState.name}</div> : ""}
                  <TextField
                    fullWidth
                    label="Name"
                    id="name"
                    name="name"
                    placeholder="Name"
                    autoComplete="name"
                    onChange={this.handleChange}
                  />
                  {!!errorsState.lastname ? <div style={{ color: "red" }}>{errorsState.lastname}</div> : ""}
                  <TextField
                    fullWidth
                    label="Last name"
                    id="lastname"
                    name="lastname"
                    placeholder="last name"
                    autoComplete="Last name"
                    onChange={this.handleChange}
                  />
                 {!!errorsState.email ? <div style={{ color: "red" }}>{errorsState.email}</div> : ""}
                 <TextField 
                 className="adjusting-margin" 
                 placeholder="email@example.com" 
                 type="email" 
                 name="email" 
                 label="Email" 
                 onChange={this.handleChange} 
                 fullWidth 
                 />
                 {!!errorsState.phonenumber ? <div style={{ color: "red" }}>{errorsState.phonenumber}</div> : ""}
                  <InputMask
                    mask="(+38)999 999 99 99"
                    maskChar=" "
                    onChange={this.handleChange}
                  >
                    {() =>
                      <TextField
                        fullWidth
                        label="Outlined"
                        label="Phone number"
                        name="phonenumber"
                      />
                    }
                  </InputMask>
                  {!!errorsState.dateofbirth ? <div style={{ color: "red" }}>{errorsState.dateofbirth}</div> : ""}
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
                    <KeyboardDatePicker
                      fullWidth
                      margin="normal"
                      label="Date of birth"
                      format="dd/MM/yyyy"
                      value={this.state.dateofbirth}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  {!!errorsState.password ? <div style={{ color: "red" }}>{errorsState.password}</div> : ""}
                  <TextField
                    fullWidth
                    label="Password"
                    type={typeInput}
                    id="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="password"
                    onChange={this.handleChange}
                  />
                  {!!errorsState.passwordconfirm ? <div style={{ color: "red" }}>{errorsState.passwordconfirm}</div> : ""}
                  <TextField
                    fullWidth
                    type={typeInput}
                    label="Confirm password"
                    id="passwordconfirm"
                    name="passwordconfirm"
                    placeholder="Confirm password"
                    autoComplete="passwordconfirm"
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
      </div>//<Redirect to='/emailconfirmation'  />
    );
    return (
      this.props.success ?   <Redirect to='/'/>: form  
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