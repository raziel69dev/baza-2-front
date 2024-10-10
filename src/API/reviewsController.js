import axios from "axios";
import {api} from "@/API/apiurl.js";

export function getReviews(options) {
    let link = api.url + 'reviews/?'

    if (options) {
        for (let option in options) {
            link += `${option}=${options[option]}&`
        }
    }
    link = link.substring(0, link.length - 1)

    return axios.get(link)
}