import axios from "axios";
import {serverUrl} from '../../../config';

export default class AllCoursesService {
    static getMyCourses() {
        return axios.get(`${serverUrl}api/user/get/mycourses`)
    };
    static unsubscribeCourse(model) {
        return axios.post(`${serverUrl}api/user/unsubscribe-course/${model.courseId}`, model)
    };
}