import axios from "axios";
import {serverUrl} from '../../../config';

export default class UsersTableService {
    static getUsers(model) {
        return axios.post(`${serverUrl}api/admin/get/users/`, model)
    };
    static deleteUser(model) {
        return axios.delete(`${serverUrl}api/admin/delete/user/${model.userId}`)
    };
    static editUser(model) {
        return axios.post(`${serverUrl}api/admin/edit/user/${model.userId}`, model)
    };
}