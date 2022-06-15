import React, { Component } from 'react';
import * as addCourseListActions from './reducer';
import { serverUrl } from '../../../config';
import { Redirect, Route } from 'react-router-dom';
import { alpha } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import deLocale from "date-fns/locale/en-AU";
import { format } from "date-fns";
import { Alert, message } from 'antd';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import get from "lodash.get";
import {
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBRow,
  MDBAlert,
  MDBCol,
} from "mdbreact";
import "../../../assets/css/AddCourses.css";
import { da } from 'date-fns/locale';

import moment from 'moment';
import "antd/dist/antd.css";
import Button from '@material-ui/core/Button';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Table, Space, Modal, Form, Input, DatePicker, Image, Upload, InputNumber, Row, Col, notification } from 'antd';
import { isThisISOWeek } from 'date-fns';
const { TextArea } = Input;
const dateFormat = 'DD/MM/YYYY';

class addCourses extends Component {
  state = {
    success: false,
    failed: false,
    isLoading: false,
    errorsState: {},
    errorServer: {},
    dateStart: null,
    name: '',
    shortDescription: '',
    longDescription: '',
    duration: 0,
    picture: null,
    file: null,
    redirect: false
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps !== this.props) {
      console.log("np: ", nextProps);
      this.setState({ success: nextProps.success, failed: nextProps.failed });
    }
  }

  handleDateChange = (date) => {
    if (!!this.state.errorsState['dateStart']) {
      let errors = Object.assign({}, this.state.errorsState);
      delete errors['dateStart'];
      this.setState(
        {
          dateStart: date,
          errors
        }
      )
    }
    else {
      this.setState({ dateStart: date });
    }
  };

  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);
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

  onSubmit = (e) => {
    e.preventDefault();
    let errorsState = {};
    const { dateStart, name, shortDescription, longDescription, duration, file } = this.state;

    if (name === '') errorsState.name = "Pleace input name of course";
    if (shortDescription === '') errorsState.shortDescription = "Please input short description";
    if (longDescription === '') errorsState.longDescription = "Please input long description";
    if (duration === 0) errorsState.duration = "Please input duration";
    if (!dateStart) errorsState.dateStart = "Please choose date of start course";


    const isValid = Object.keys(errorsState).length === 0
    if (isValid) {
      this.setState({ isLoading: true });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("dateStart", (moment(dateStart).date()) + "." + (moment(dateStart).month() + 1) + "." + moment(dateStart).year());
      formData.append("shortDescription", shortDescription);
      formData.append("longDescription", longDescription);
      formData.append("duration", duration);
      this.props.addCourse(formData);
      notification.open({
        message: 'Course was added',
        placement: 'bottomRight',
        type: 'success'
      });
    }
    else {
      this.setState({ errorsState });
    }
  }


  onImageChange = e => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    if (files && files[0]) {
      if (files[0].type.match(/^image\//)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.setState({ picture: reader.result });
        };
        reader.readAsDataURL(files[0]);
      } else {
        alert("Incorrect file type");
      }
    } else {
      alert("Pleace choose file");
    }

    this.setState({ file: e.target.files[0] });
  };

  displayimage = () => {
    if (this.state.picture !== []) {
      return (
        <div className="imageholder">
          <img src={this.state.picture} alt="" />
        </div>
      );
    }
  };

  render() {
    const { errorsState, errorServer } = this.state;
    return (
      <div>
        <Row className='justify-content-center align-items-center'>
          <Col span={24}>
        <form onSubmit={this.onSubmit}>
          <p className="h5 text-center mb-4">Add Course</p>
          <Form.Item>
            <Row className='justify-content-center align-items-center'>
              <Col>
                <Row>
                  <Form.Item>
                    {!!errorsState.picture ? <div style={{ color: "red" }}>{errorsState.picture}</div> : ""}
                    <Image width={470} height={250} src={this.state.picture} />
                  </Form.Item>
                </Row>
                <Row className='justify-content-center align-items-center'>
                  <Form.Item>
                    <input type="file" accept="image/*" style={{ display: 'none' }} id="contained-button-file" onChange={(e) => { this.onImageChange(e) }} />
                    <label htmlFor="contained-button-file">
                      <Button variant="contained" color="primary" component="span" class="ant-btn ant-btn-primary">
                        <UploadOutlined />
                        Upload image
                      </Button>
                    </label>
                  </Form.Item>
                </Row>
              </Col>
            </Row>
          </Form.Item>

          {!!errorsState.name ? <div style={{ color: "red" }}>{errorsState.name}</div> : ""}
          <Form.Item>
            <label>Name:</label>
            <TextArea showCount maxLength={100} onChange={(e) => { this.state.name = e.target.value }} />
          </Form.Item>
          <Form.Item>

            {!!errorsState.shortDescription ? <div style={{ color: "red" }}>{errorsState.shortDescription}</div> : ""}
            <label>Short description:</label>
            <TextArea rows={3} showCount maxLength={200} onChange={(e) => { this.state.shortDescription = e.target.value }} />
          </Form.Item>

          <Form.Item>
            {!!errorsState.longDescription ? <div style={{ color: "red" }}>{errorsState.longDescription}</div> : ""}
            <label>Long description:</label>
            <TextArea rows={10} showCount maxLength={1000} onChange={(e) => { this.state.longDescription = e.target.value }} />
          </Form.Item>

          <Row>
            <Col span={8}>
              <Form.Item>
                <label>Duration:</label>
                <br />
                {!!errorsState.duration ? <div style={{ color: "red" }}>{errorsState.duration}</div> : ""}
                <InputNumber min={1} max={52} onChange={(e) => { this.state.duration = e }} />
                <span className="ant-form-text"> weeks</span>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <label>Date start:</label>
                <br />
                {!!errorsState.dateStart ? <div style={{ color: "red" }}>{errorsState.dateStart}</div> : ""}
                <DatePicker maxLength={2} format={dateFormat} onChange={d => this.state.dateStart = d} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <button class="ant-btn ant-btn-primary" type="primary" htmlType="submit">Save</button>
          </Form.Item>
          {!!errorServer ? <div style={{ color: "red" }}>{errorServer.errorMessage}</div> : ""}
        </form>
        </Col>
        </Row>
      </div >
    );
  }
  //this.props.success ? <Redirect from='/addcourse' to='/courses'/> : form
}

const mapStateToProps = state => {
  return {
    loading: get(state, 'addCourse.list.loading'),
    failed: get(state, 'addCourse.list.failed'),
    success: get(state, 'addCourse.list.success'),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCourse: (model) => {
      dispatch(addCourseListActions.addCourse(model));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(addCourses);