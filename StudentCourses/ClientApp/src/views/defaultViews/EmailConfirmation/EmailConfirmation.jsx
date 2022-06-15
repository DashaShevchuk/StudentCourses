import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as getListActions from './reducer';
import get from "lodash.get";
import Background from "../../../assets/images/back.jpg";
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
import { serverUrl } from '../../../config';
import history from '../../../utils/history';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput
} from "mdbreact";

class EmailConfirmation extends Component {

  
  componentDidMount = () => {  
    const model = {
      token: this.props.match.params.token
    }
    this.props.emailConfirmation(model);
  }
  

  render() {
//     const authResult = new URLSearchParams(window.location.search); 
// const token = authResult.get('token');
console.log(this.props.match.params.email);
console.log(this.props.match.params.token);
// console.log(this.props.location);
// console.log(this.props);
//<Redirect to={{ pathname: "/emailconfirmation", state: { userEmail: this.state.email }}}/>
      

    return (
      <div className="main-div background-image" style={{ backgroundImage: "url(" + Background + ")" }}>
        <MDBContainer >
          <MDBRow style={{ height: '100vh' }} className="justify-content-center align-items-center">
            <MDBCol md="4">
            <p className="font-weight-bolder" style={{ fontSize: 20 }}>Thank you for confirming your email</p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    emailCnfirmationResult: get(state, 'confirmEmail.list.data'),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    emailConfirmation: (filter) => {
      dispatch(getListActions.emailConfirmation(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmation);