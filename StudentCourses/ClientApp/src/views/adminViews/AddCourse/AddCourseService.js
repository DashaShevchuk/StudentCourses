import axios from "axios";
import {serverUrl} from '../../../config';

export default class AddCourseService {
    static addCourse(model) {
        return axios.post(`${serverUrl}api/admin/add/course`, model)
    };
}