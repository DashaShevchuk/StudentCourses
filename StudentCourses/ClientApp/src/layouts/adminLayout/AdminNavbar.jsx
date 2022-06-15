import React, { Component } from 'react';
import { Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/images/logo.png'
import sygnet from '../../assets/images/logo.png'
import "../../assets/css/sideBarStyle.css";
import {
  MDBBtn,
  MDBCardTitle,
} from "mdbreact";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};
class AdminNavbar extends Component {
  render() {
    const { children, name, ...attributes } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 60, height: 40, alt: 'Logo' }}
          minimized={{ src: sygnet, width: 60, height: 40, alt: 'Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <MDBCardTitle className="img-avatar mb-0">{name}</MDBCardTitle>
          <MDBBtn color="danger" onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</MDBBtn>
        </Nav>
      </React.Fragment>
    );
  }
}

AdminNavbar.propTypes = propTypes;
AdminNavbar.defaultProps = defaultProps;

export default AdminNavbar;
