import axios from "axios";
import {serverUrl} from '../../../config';

export default class EmailConfirmedService {
    static emailConfirmation(model) {
        console.log(model)
        return axios.get(`${serverUrl}api/registration/${model.token}`, model)
    };
}