import {api} from "@/API/apiurl.js";
import axios from "axios";
import {addNotice} from "@/js/notifications.js";
import {favoriteProjects} from "@/Stores/favoriteProjects.js";
import {userStore} from "@/Stores/userStore.js";
import {popup} from "@/js/controllers/popupController.js";
import {projects} from "@/Stores/projectsStore.js";

export async function getProjects(options) {
    let urlOptions = 'projects?';

    for (const option in options) {
        if (options[option]) {
            urlOptions += `${option}=${options[option]}&`
        }

    }
    urlOptions = urlOptions.substring(0, urlOptions.length - 1)

    return axios.get(api.url + urlOptions, {timeout: 60000}).then(result => {
        if (result.data.projects.length <= 0 && !options.offset) {
            addNotice({name: `В этой категории еще нет проектов`, type: 'warning'})
        }
        return result.data
    })
        .catch(err =>  {
            if (err.code === "ERR_BAD_REQUEST") {
                addNotice({name: "Запроса не существует, проверьте правильность путей", type: 'danger'})
            } else if( err.code === "ECONNABORTED") {
                addNotice({name: "Таймаут соединения", type: 'danger'})
            } else {
                addNotice({name: "Непредвиденная ошибка, обратитесь к администратору. " + err.message, type: 'danger'})
            }
        })
}

export function getProject(id) {
    return axios.get(api.url + 'projects/' + id)
}

export function getFavoriteProjects(options) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };

    axios.get(`${api.url}user/project`, {headers}).then(result => {
        favoriteProjects.projects.splice(0, favoriteProjects.projects.length)
        for (let project of result.data.projects) {
            favoriteProjects.projects.push(project)
        }

    })
}

export function addProject(project) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };

    axios.post(`${api.url}projects`, project, {headers})
        .then(result => {
            addNotice({name: 'Проект успешно добавлен', type: 'success'})
        })
        .catch(error => {
            addNotice({name: 'Не удалось добавить проект', type: 'danger'})
        })
}

export function editProject(project) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };

    axios.put(`${api.url}projects/${project.id}`, project, {headers})
        .then(result => {
            addNotice({name: 'Проект успешно изменен', type: 'success'})
        })
        .catch(error => {
            addNotice({name: 'Не удалось изменить проект', type: 'danger'})
        })
}

export function deleteProject(project) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };


    axios.delete(`${api.url}projects/${project.id}`, {headers})
        .then(result => {
            projects.splice(projects.findIndex(item => item.id === project.id), 1)
            addNotice({name: 'Проект успешно удален', type: 'success'})
            popup.show = false
        })
        .catch(error => {
            addNotice({name: 'Не удалось удалить проект', type: 'danger'})
        })
}

export function pinUnpinProject(project) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    let payed, message;

    if (project.payed) {
        payed = false
        message = 'откреплен'
    } else {
        payed = true
        message = 'закреплен'
    }

    project.payed = !project.payed

    axios.put(`${api.url}projects/${project.id}`, project, {headers})
        .then(result => {
            addNotice({name: 'Проект ' + project.name + ' успешно ' + message + '!', type: 'success'})
        })
        .catch(error => {
            addNotice({name: 'Не удалось изменить проект', type: 'danger'})
        })
}