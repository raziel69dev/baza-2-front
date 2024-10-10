import axios from "axios";
import {api} from "@/API/apiurl.js";
import {userStore} from "@/Stores/userStore.js";
import {addNotice} from "@/js/notifications.js";
import {projects} from "@/Stores/projectsStore.js";

export function addFavorite(id, name) {
    return axios.post(api.url + 'user/project/' + id, {}, {timeout: 20000, headers: {
            'Authorization': `Bearer ${userStore.token}`
        }}).then(result => {
            addNotice({name: `Проект ${name} успешно добавлен в избранное!`, type: 'success'})
                if (projects.find(item => item.project.id === id)) {
                    projects.find(item => item.project.id === id).project.favorite = 1
                } else {
                    projects.find(item => item.id === id).favorite = 1
                }
            return result
        })
        .catch(error => {
            if (error.code === "ECONNABORTED") {
                addNotice({name: `Таймаут соединения`, type: 'danger'})
            } else if (error.response.data.message === "Invalid token") {
                addNotice({name: `Токен не валидный, авторизуйтесь или перезайдите`, type: 'danger'})
            } else if (error.response.data.message){
                addNotice({name: `${error.response.data.message}`, type: 'danger'})
            } else if (error.message === "Request failed with status code 404"){
                addNotice({name: `Запрос не может быть отправлен, ошибка 404`, type: 'danger'})
            } else {
                addNotice({name: `${error.message}`, type: 'danger'})
            }



        })
}

export function removeFavorite(id, name) {


    return axios.delete(api.url + 'user/project/' + id, {timeout: 60000, headers: {
            'Authorization': `Bearer ${userStore.token}`
        }}).then(result => {
            addNotice({name: `Проект ${name} успешно удален из избранного!`, type: 'warning'})

            if (projects.find(item => item.project.id === id)) {
                projects.find(item => item.project.id === id).project.favorite = 0
            } else {
                projects.find(item => item.id === id).favorite = 0
            }
            return result
        })
        .catch(error => {
            if (error.code === "ECONNABORTED") {
                addNotice({name: `Таймаут соединения, попробуйте позже`, type: 'danger'})
            } else if (error.response.data.message === "Invalid token") {
                addNotice({name: `Токен не валидный, авторизуйтесь или перезайдите`, type: 'danger'})
            } else if (error.response.data.message){
                addNotice({name: `${error.response.data.message}`, type: 'danger'})
            } else if (error.message === "Request failed with status code 404"){
                addNotice({name: `Запрос не может быть отправлен, ошибка 404`, type: 'danger'})
            } else {
                addNotice({name: `${error.message}`, type: 'danger'})
            }

        })
}