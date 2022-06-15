import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getDeleteListActions from './reducer';
import * as getEditListActions from './reducer';
import { serverUrl } from '../../../config';
import { connect } from 'react-redux';
import get from "lodash.get";
import moment from 'moment';
import "antd/dist/antd.css";
import { Table, Space, Modal, Form, Input, Button, DatePicker, Image, Pagination, Empty } from 'antd';
import { MDBSpinner } from 'mdb-react-ui-kit';
import MaskedInput from 'antd-mask-input'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { TextArea, Search } = Input;
const dateFormat = 'DD/MM/YYYY';


class UsersTable extends Component {

  state = {
    deleteOpenDialog: false,
    editOpenDialog: false,
    showMoreOpenDialog: false,
    selectedUserId: null,
    selectedCourseId: null,

    id: '',
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',

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
    this.props.getUsers(model);
  }

  deleteDialogClickOpen = (e) => {
    this.setState({ selectedUserId: e.key });
    this.setState({ deleteOpenDialog: true });
  }

  deleteDialogCloseClick = () => {
    this.setState({ deleteOpenDialog: false });
  }

  editDialogClickOpen = (e) => {
    this.setState({ selectedUserId: e.key })
    this.setState({ editOpenDialog: true });
  }

  editDialogCloseClick = () => {
    this.setState({ editOpenDialog: false });
  }

  showMoreDialogClickOpen = (e, userId) => {
    this.setState({ selectedUserId: userId });
    this.setState({ selectedCourseId: e.key });
    this.setState({ showMoreOpenDialog: true });
  }

  showMoreDialogCloseClick = () => {
    this.setState({ showMoreOpenDialog: false });
  }

  deleteButtonClicked = () => {
    this.props.deleteUser({ userId: this.state.selectedUserId });
    window.location.reload();
  }

  onSubmitForm = () => {
    const { id, name, lastName, email, phoneNumber, dateOfBirth } = this.state;

    this.setState({ isLoading: true });
    const model = {
      Id: id,
      Name: name,
      LastName: lastName,
      Email: email,
      PhoneNumber: phoneNumber,
      DateOfBirth: dateOfBirth
    };

    this.props.editUser(model);
    window.location.reload();
  }

  deleteDialog = () => {
    const { data } = this.props;
    var userName;
    data.Users.forEach(element => {
      if (element.Id === this.state.selectedUserId) {
        userName = element.Name;
      }
    });
    return (
      <Modal
        visible={this.state.deleteOpenDialog}
        onCancel={this.deleteDialogCloseClick}
        onOk={this.deleteButtonClicked}
        title={'Do you Want to delete these user?'}
      >
        <p>Do you want to delete {userName}?</p>
      </Modal>
    );
  }

  editDialog = () => {
    const { data } = this.props;
    var id, name, lastName, email, phoneNumber, dateOfBirth;

    data.Users.forEach(element => {
      if (element.Id === this.state.selectedUserId) {
        id = element.Id;
        name = element.Name;
        lastName = element.LastName;
        email = element.Email;
        phoneNumber = element.PhoneNumber;
        dateOfBirth = element.TextDateOfBirth;

        this.state.id = id;
        this.state.name = name;
        this.state.lastName = lastName;
        this.state.email = email;
        this.state.phoneNumber = phoneNumber;
        this.state.dateOfBirth = dateOfBirth;
      }
    });
    return (
      <Modal
        visible={this.state.editOpenDialog}
        onCancel={this.editDialogCloseClick}
        footer={null}
        title={'Edit user'}
      >
        <Form
          onFinish={this.onSubmitForm}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: 'large',
          }}>

          <Form.Item label="Name" className="ml-3">
            <Input className="ml-4" defaultValue={name} onChange={(e) => { this.state.name = e.target.value }} />
          </Form.Item>
          <Form.Item label="Last name" className="ml-3">
            <Input className="ml-4" defaultValue={lastName} onChange={(e) => { this.state.lastName = e.target.value }} />
          </Form.Item>
          <Form.Item label="Email" className="ml-3">
            <Input className="ml-4" defaultValue={email} onChange={(e) => { this.state.email = e.target.value }} />
          </Form.Item>
          <Form.Item label="Phone" className="ml-3">
            <MaskedInput className="ml-4" mask="(+38)111 111 11 11" defaultValue={phoneNumber} onChange={(e) => { this.state.phoneNumber = e.target.value }} />
          </Form.Item>
          <Form.Item label="Birthday" className="ml-3">
            <DatePicker className="ml-4" defaultValue={moment(dateOfBirth, dateFormat)} format={dateFormat} onChange={d => this.state.dateOfBirth = d} />
          </Form.Item>
          <Form.Item className="ml-3">
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  showMoreDialog = () => {
    const { data } = this.props;
    var name, image, duration, longDescription, shortDescription, dateStart;
    data.Users.forEach(user => {
      if (user.Id == this.state.selectedUserId) {
        user.UserCourses.forEach(element => {
          if (element.Id == this.state.selectedCourseId) {
            name = element.Name;
            image = element.Image;
            duration = element.Duration;
            longDescription = element.LongDescription;
            shortDescription = element.ShortDescription;
            dateStart = element.TextDateStart;
          }
        })
      }
    })
    return (
      <Modal
        visible={this.state.showMoreOpenDialog}
        onCancel={this.showMoreDialogCloseClick}
        footer={null}
        title={name}
      >
        <Form>
          <Form.Item>
            <Image width={470} height={250} src={`${serverUrl}${image}`} />
            <TextArea size="large" rows={3} value={shortDescription} />
          </Form.Item>
          <Form.Item>
            <label>Course about:</label>
            <TextArea size="large" rows={10} className='m-0' value={longDescription} />
          </Form.Item>
          <Form.Item>
            <label>Duration:</label>
            <Input size="large" value={duration + " weeks"} />
          </Form.Item>
          <Form.Item>
            <label>Date start:</label>
            <br />
            <DatePicker size="large" value={moment(dateStart, dateFormat)} format={dateFormat} disabled />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  handleTableChange = (pagination, filters, sorter) => {
    this.setState({ pagination: pagination });
    this.state.sortOrder = sorter.order;
    this.state.columnKey = sorter.columnKey;
    const model = {
      Current: pagination.current,
      PageSize: pagination.pageSize,
      SortOrder: sorter.order,
      ColumnKey: sorter.columnKey,
      SearchString: this.state.searchString
    };
    console.log(pagination);
    console.log('state ', this.state.pagination);
    console.log('sorter ', this.state.sortOrder, " ", this.state.columnKey);
    this.props.getUsers(model);
  };

  search = (event) => {
    this.setState({
      searchString: event.target.value
    })
    const model = {
      Page: this.state.pagination.current,
      PageSize: this.state.pagination.pageSize,
      SortOrder: this.state.order,
      ColumnKey: this.state.columnKey,
      SearchString: event.target.value
    };
    this.props.getUsers(model);
  };

  render() {
    const { data } = this.props;

    console.log(data);

    const columns = [
      {
        title: '№',
        dataIndex: 'num',
        key: 'num',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
      },
      {
        title: 'Last name',
        dataIndex: 'lastName',
        key: 'lastName',
        sorter: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Date of birth',
        dataIndex: 'dateOfBirth',
        key: 'dateOfBirth',
        sorter: true,
      },
      {
        title: 'Phone number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (record) => (
          <Space size="middle">
            <EditOutlined onClick={() => { this.editDialogClickOpen(record) }} />
            <DeleteOutlined onClick={() => { this.deleteDialogClickOpen(record) }} style={{ color: 'red' }} />
          </Space>
        ),
      },
    ];

    if (!data) {
      return <div className='d-flex justify-content-center align-self-center'>
      <MDBSpinner role='status'>
        <span className='visually-hidden'></span>
      </MDBSpinner>
    </div>;
    }
    const listUsers = data.Users.map((element, index) => {

      let dateOfBirth = new Date(element.DateOfBirth);
      let date = dateOfBirth.toLocaleDateString();
      return {
        key: element.Id,
        name: element.Name,
        lastName: element.LastName,
        email: element.Email,
        dateOfBirth: date,
        phoneNumber: element.PhoneNumber,
        num: index + 1,
        userCourses: element.UserCourses,
      };
    });

    return (
      <div>
        <Search placeholder="input search text" style={{ "marginBottom": 3 }} onChange={this.search} enterButton />
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: record => {
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
                  title: 'Date subscribe',
                  dataIndex: 'dateSubscribe',
                  key: 'dateSubscribe'
                },
              ];
              let i = 0;
              const data = [];
              {
                record.userCourses.forEach(element => {
                  let item = {
                    id: ' ',
                    key: ' ',
                    name: ' ',
                    dateSubscribe: ' ',
                  }
        
                  i += 1;
                  item.key = element.Id;
                  item.num = i;
                  item.name = element.Name;
                  item.dateSubscribe = element.DateSubscribe;
                  data.push(item);
                });
              }
        
              return <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      this.showMoreDialogClickOpen(record, record.key);
                    },
                  };
                }} />
            },
            rowExpandable: record => record.userCourses.length !== 0, 
          }}
          dataSource={listUsers}
          total={data.TotalCount}
          onChange={this.handleTableChange}
          pagination={{
            current:this.state.currentPage,
            pageSize: this.state.pageSize,
            total: 70,
            onChange: (page, size) => {
              this.setState({
                currentPage: page,
                pageSize: size
              });
          
              const model = {
                Page: page,
                PageSize: size
              };
              this.props.getUsers(model);
            },
            onShowSizeChange: (page, size) => {
              this.setState({
                currentPage: page,
                pageSize: size
              });
          
              const model = {
                Page: page,
                PageSize: size
              };
              this.props.getUsers(model);
            } 
          }}
        />

        {this.deleteDialog()}
        {this.editDialog()}
        {this.showMoreDialog()} 
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    data: get(state, 'usersTable.list.data'),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: filter => {
      dispatch(getListActions.getUsers(filter));
    },
    deleteUser: filter => {
      dispatch(getDeleteListActions.deleteUser(filter));
    },
    editUser: filter => {
      dispatch(getEditListActions.editUser(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);