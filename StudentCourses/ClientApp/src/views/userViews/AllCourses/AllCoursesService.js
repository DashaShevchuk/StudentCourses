import axios from "axios";
import {serverUrl} from '../../../config';

export default class AllCoursesService {
    static getCourses() {
        return axios.get(`${serverUrl}api/user/get/allcourses`)
    };
    static subscribeCourse(model) {
        return axios.post(`${serverUrl}api/user/subscribe-course/${model.courseId}`, model)
    };
    static unsubscribeCourse(model) {
        return axios.post(`${serverUrl}api/user/unsubscribe-course/${model.courseId}`, model)
    };
}