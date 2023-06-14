import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getDeleteListActions from './reducer';
import * as getEditListActions from './reducer';
import * as getChangeImageListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { serverUrl } from '../../../config';
import moment from 'moment';
import "antd/dist/antd.css";
import Button from '@material-ui/core/Button';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Table, Space, Modal, Form, Input, DatePicker, Image, InputNumber, Row, Col, notification } from 'antd';
const { TextArea } = Input;
const dateFormat = 'DD/MM/YYYY';

class CoursesTable extends Component {

  state = {
    showMoreOpenDialog: false,
    deleteOpenDialog: false,
    editOpenDialog: false,
    selectedCourseId: null,

    image: '',
    dateStart: null,
    name: '',
    shortDescription: '',
    longDescription: '',
    duration: 0,
    id: 0,

    sortOrder: null,
    columnKey: null,
    searchString: null,
    pagination: {
      current: 1,
      pageSize: 10,
    },
  };

  componentDidMount = () => {
    const model = {
      Current: this.state.pagination.current,
      PageSize: this.state.pagination.pageSize,
    }
    this.props.getCourses(model);
  }

  showMoreDialogClickOpen = (e) => {
    this.setState({ selectedCourseId: e.key });
    this.setState({ showMoreOpenDialog: true });
  }

  showMoreDialogCloseClick = () => {
    this.setState({ showMoreOpenDialog: false });
  }

  deleteDialogClickOpen = (record, e) => {
    e.stopPropagation();
    this.setState({ selectedCourseId: record.key });
    this.setState({ deleteOpenDialog: true });

  }

  deleteDialogCloseClick = () => {
    this.setState({ deleteOpenDialog: false });
    this.props.getCourses();
  }

  editDialogClickOpen = (record, e) => {
    e.stopPropagation();
    this.setState({ selectedCourseId: record.key });
    this.setState({ editOpenDialog: true });
  }

  editDialogCloseClick = () => {
    this.setState({ editOpenDialog: false });
    this.props.getCourses();
  }

  deleteButtonClicked = () => {
    this.props.deleteCourse({ courseId: this.state.selectedCourseId });
    notification.open({
      message: 'Course was deleted successfully',
      placement: 'bottomRight',
      type: 'success'
    });
  }

  editOnSubmit = (e) => {
    e.preventDefault();
    let errorsState = {};
    const { dateStart, name, shortDescription, longDescription, duration, id } = this.state;

    const isValid = Object.keys(errorsState).length === 0
    if (isValid) {
      this.setState({ isLoading: true });
      this.props.editCourse({
        id: id,
        dateStart: dateStart,
        name: name,
        shortDescription: shortDescription,
        longDescription: longDescription,
        duration: duration,
      });

      notification.open({
        message: 'Course was edited successfully',
        placement: 'bottomRight',
        type: 'success'
      });
    }
    else {
      this.setState({ errorsState });
    }
  }

  showMoreDialog = () => {
    // const { data } = this.props;
    // var name, image, duration, longDescription, shortDescription, dateStart;
    // data.Courses.forEach(element => {
    //   if (element.Id == this.state.selectedCourseId) {
    //     name = element.Name;
    //     image = element.Image;
    //     duration = element.Duration;
    //     longDescription = element.LongDescription;
    //     shortDescription = element.ShortDescription;
    //     dateStart = element.TextDateStart;
    //   }
    // });
    // return (
    //   <Modal
    //     visible={this.state.showMoreOpenDialog}
    //     onCancel={this.showMoreDialogCloseClick}
    //     footer={null}
    //     title={name}
    //   >
    //     <Form>
    //       <Form.Item>
    //         <Image width={470} height={250} src={`${serverUrl}${image}`} />
    //         <TextArea size="large" rows={3} value={shortDescription} />
    //       </Form.Item>
    //       <Form.Item>
    //         <label>Course about:</label>
    //         <TextArea size="large" rows={10} className='m-0' value={longDescription} />
    //       </Form.Item>
    //       <Form.Item>
    //         <label>Duration:</label>
    //         <Input size="large" value={duration + " weeks"} />
    //       </Form.Item>
    //       <Form.Item>
    //         <label>Date start:</label>
    //         <br />
    //         <DatePicker size="large" value={moment(dateStart, dateFormat)} format={dateFormat} disabled />
    //       </Form.Item>
    //     </Form>
    //   </Modal>
    // );
  }

  onImageChange = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("courseId", this.state.selectedCourseId);
    this.props.changeImage(formData);
    window.location.reload();

  };

  editDialog = () => {
    const { data } = this.props;
    var id, name, duration, longDescription, shortDescription, dateStart, image;

    // data.Courses.forEach(element => {
    //   if (element.Id == this.state.selectedCourseId) {
    //     name = element.Name;
    //     image = element.Image;
    //     duration = element.Duration;
    //     longDescription = element.LongDescription;
    //     shortDescription = element.ShortDescription;
    //     dateStart = element.TextDateStart;
    //     id = element.Id;

    //     console.log(image);
    //     this.state.name = name;
    //     this.state.image = image;
    //     this.state.duration = duration;
    //     this.state.longDescription = longDescription;
    //     this.state.shortDescription = shortDescription;
    //     this.state.dateStart = dateStart;
    //     this.state.id = id;
    //   }
    // });
    
    return //(
  //     <Modal
  //       visible={this.state.editOpenDialog}
  //       onCancel={this.editDialogCloseClick}
  //       footer={null}
  //       title={'Edit course'}
  //     >
  //       <form
  //         onSubmit={this.editOnSubmit}>
  //         <Form.Item>
  //           <Image width={470} height={250} src={`${serverUrl}${image}`} />
  //           <input type="file" accept="image/*" style={{ display: 'none' }} id="contained-button-file" onChange={(e) => { this.onImageChange(e) }} />
  //           <label htmlFor="contained-button-file">
  //             <Button variant="contained" color="primary" component="span" class="ant-btn ant-btn-primary">
  //               <UploadOutlined />
  //               Change image
  //             </Button>
  //           </label>
  //         </Form.Item>
  //         <Form.Item>
  //           <label>Name:</label>
  //           <TextArea showCount maxLength={100} defaultValue={name} onChange={(e) => { this.state.name = e.target.value }} />
  //         </Form.Item>
  //         <Form.Item>
  //           <label>Short description:</label>
  //           <TextArea rows={3} showCount maxLength={200} defaultValue={shortDescription} onChange={(e) => { this.state.shortDescription = e.target.value }} />
  //         </Form.Item>
  //         <Form.Item>
  //           <label>Long description:</label>
  //           <TextArea rows={10} showCount maxLength={1000} defaultValue={longDescription} onChange={(e) => { this.state.longDescription = e.target.value }} />
  //         </Form.Item>
  //         <Row>
  //           <Col span={8}>
  //             <Form.Item>
  //               <label>Duration:</label>
  //               <br />
  //               <InputNumber min={1} max={52} defaultValue={duration} onChange={(e) => { this.state.duration = e }} />
  //               <span className="ant-form-text"> weeks</span>
  //             </Form.Item>
  //           </Col>
  //           <Col span={8}>
  //             <Form.Item>
  //               <label>Date start:</label>
  //               <br />
  //               <DatePicker maxLength={2} defaultValue={moment(dateStart, dateFormat)} format={dateFormat} onChange={d => this.state.dateStart = d} />
  //             </Form.Item>
  //           </Col>
  //         </Row>
  //         <Form.Item>
  //           <button class="ant-btn ant-btn-primary" type="submit">Save</button>
  //         </Form.Item>
  //       </form>
  //     </Modal>
  //   );
  // }

  // deleteDialog = () => {
  //   const { data } = this.props;
  //   var name;
  //   data.Courses.forEach(element => {
  //     if (element.Id == this.state.selectedCourseId) {
  //       name = element.Name;
  //     }
  //   });
  //   return (
  //     <Modal
  //       visible={this.state.deleteOpenDialog}
  //       onCancel={this.deleteDialogCloseClick}
  //       onOk={this.deleteButtonClicked}
  //       title={'Do you Want to delete these course?'}
  //     >
  //       <p>Do you want to delete {name}?</p>
  //     </Modal>
   // );
  }


  render() {
    const { data } = this.props;
    console.log(data);
    const columns = [
      {
        title: '№',
        dataIndex: 'num',
        key: 'num'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (record) => (
          <Space size="middle">
            <EditOutlined onClick={(e) => { this.editDialogClickOpen(record, e) }} />
            <DeleteOutlined onClick={(e) => { this.deleteDialogClickOpen(record, e) }} style={{ color: 'red' }} />
          </Space>
        ),
      },
    ];

    // const listCourses = data.Courses.map((element, index) => {

    //   let dateStart = new Date(element.DateStart);
    //   let date = dateStart.toLocaleDateString();
    //   return {
    //     key: element.Id,
    //     name: element.Name,
    //     shortDescription: element.ShortDescription,
    //     longDescription: element.LongDescription,
    //     dateStart: date,
    //     duration: element.Duration,
    //     image:element.Image,
    //     num: index + 1
    //   };
    // });

    //console.log(listCourses);
    return (
      <div>
        <p>a</p>
        {/* <Table
          columns={columns}
          dataSource={listCourses}
          total={data.TotalCount}         
        /> */}

        {/* {this.deleteDialog()}
        {this.editDialog()}
        {this.showMoreDialog()} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: get(state, 'coursesTable.list.data')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCourses: filter => {
      dispatch(getListActions.getCourses(filter));
    },
    deleteCourse: filter => {
      dispatch(getDeleteListActions.deleteCourse(filter));
    },
    editCourse: filter => {
      dispatch(getEditListActions.editCourse(filter));
    },
    changeImage: (filter) => {
      dispatch(getChangeImageListActions.changeImage(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesTable);