import axios from "axios";
import {api} from "@/API/apiurl.js";


export function signIn(data) {
    try {
        return axios.post(api.url + 'login', data, {timeout: 10000})
    } catch (err) {
        return err
    }
}
export function signUp(data) {
    try {
        return axios.post(api.url + 'signup', data, {timeout: 10000})
    } catch (err) {
        return err
    }
}