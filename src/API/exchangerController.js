import axios from "axios";
import {api} from "@/API/apiurl.js";

export function getCoinRate(coinTo) {
    return axios(api.url + `rates?currency=${coinTo}`)
}
export function getCoinIcon(coin) {
    const headers = {"Access-Control-Allow-Origin": "*"}
    return axios('https://cryptoicons.org/api/icon/btc/ff00ff', headers).then(result => result).catch(error => error)
}