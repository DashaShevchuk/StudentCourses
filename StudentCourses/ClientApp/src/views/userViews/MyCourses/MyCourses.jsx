import React, { Component } from 'react';
import * as getListActions from './reducer';
import * as getUnsubscribeListActions from './reducer';
import { connect } from 'react-redux';
import get from "lodash.get";
import { serverUrl } from '../../../config';
import moment from 'moment';
import "antd/dist/antd.css";
import { Card, Modal, Form, Input, DatePicker, Image, Row, Col, notification } from 'antd';
const { TextArea } = Input;
const dateFormat = 'DD/MM/YYYY';
const { Meta } = Card;

class MyCorses extends Component {

    state = {
        showMoreOpenDialog: false,
        submitOpenDialog: false,

        selectedCourseId: 0
    };

    componentDidMount = () => {
        this.props.getMyCourses();
    }

    showMoreDialogClickOpen = (item) => {
        this.setState({ selectedCourseId: item.Id });
        this.setState({ showMoreOpenDialog: true });
    }

    showMoreDialogCloseClick = () => {
        this.setState({ showMoreOpenDialog: false });
    }

    showMoreDialog = () => {
        const { listCourses } = this.props;
        var name, image, duration, longDescription, shortDescription, dateStart;
        listCourses.forEach(element => {
            if (element.Id == this.state.selectedCourseId) {
                name = element.Name;
                image = element.Image;
                duration = element.Duration;
                longDescription = element.LongDescription;
                shortDescription = element.ShortDescription;
                dateStart = element.TextDateStart;
            }
        });
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

    submitDialogClickOpen = (courseId, e) => {
        e.stopPropagation();
        this.setState({ selectedCourseId: courseId });
        this.setState({ submitOpenDialog: true });

    }

    submitDialogCloseClick = () => {
        this.setState({ submitOpenDialog: false });
        this.props.getCourses();
    }

    submitButtonClicked = () => {
        this.props.unsubscribeCourse({ courseId: this.state.selectedCourseId });
        notification.open({
            message: 'You unsubscribe from course successfully',
            placement: 'bottomRight',
            type: 'success'
        });

        window.location.reload();
    }

    submitDialog = () => {
        const { listCourses } = this.props;
        var name;
        listCourses.forEach(element => {
            if (element.Id == this.state.selectedCourseId) {
                name = element.Name;
            }
        });
        return (
            <Modal
                visible={this.state.submitOpenDialog}
                onCancel={this.submitDialogCloseClick}
                onOk={this.submitButtonClicked}
                title={'Unsubscribe submit'}
            >
                <p>Are you sure you want to unsubscribe the course {name} ?</p>
            </Modal>
        );
    }

    render() {
        const { listCourses } = this.props;
        console.log('courses', listCourses);
        return (
            <div>
                <Row gutter={16} type="flex">
                    {
                        listCourses.map(item => {
                            return (
                                <Col className="gutter-row mb-3" span={6} key={item.Id} onClick={() => { this.showMoreDialogClickOpen(item) }}>
                                    <Card
                                        style={{ width: 300 }, { height: '100%' }}
                                        cover={
                                            <div style={{ overflow: "hidden", height: "175px" }}>
                                                <Image preview={false} alt="example" src={`${serverUrl}${item.Image}`} />
                                            </div>
                                        }
                                        actions={[
                                            <button variant="contained" color="primary" component="span" class="ant-btn ant-btn-primary" onClick={(e) => { this.submitDialogClickOpen(item.Id, e) }}>
                                                Unsubscribe
                                            </button>
                                        ]}
                                    >
                                        <Meta
                                            style={{ height: "160px" }}
                                            title={item.Name}
                                            description={item.ShortDescription}
                                        />
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
                {this.showMoreDialog()}
                {this.submitDialog()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        listCourses: get(state, 'myCourses.list.data'),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMyCourses: () => {
            dispatch(getListActions.getMyCourses());
        },
        unsubscribeCourse: (filter) => {
            dispatch(getUnsubscribeListActions.unsubscribeCourse(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCorses);