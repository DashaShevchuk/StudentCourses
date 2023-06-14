import axios from "axios";
import {serverUrl} from '../../../config';

export default class CoursesTableService {
    static getCourses(model) {
        return axios.post(`${serverUrl}api/admin/get/courses/`,model)
    };
    static deleteCourse(model) {
        return axios.delete(`${serverUrl}api/admin/delete/course/${model.courseId}`)
    };
    static editCourse(model) {
        return axios.post(`${serverUrl}api/admin/edit/course/${model.courseId}`, model)
    };
    static changeImage(model) {       
        return axios.post(`${serverUrl}api/admin/change-course-image`, model)
    };
}