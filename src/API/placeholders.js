import axios from "axios";
import {api} from "@/API/apiurl.js";
import {userStore} from "@/Stores/userStore.js";
import {reactive} from "vue";

export const placeholders = reactive({
    categoryPlaceholders: []
})

export function getPlaceholders(categoryId) {
    let url = 'placeholders'

    categoryId ? url += '?categoryId=' + categoryId : url

    return axios.get(api.url + url)
}

export function setPlaceholdersCount(placeholdersParams, categoryId) {
    let url = 'placeholder'

    let data = {
        placeholdersParams: placeholdersParams
    }
    categoryId ? data.categoryId = categoryId : null

    return axios.post(api.url + url, data,{timeout: 20000, headers: {
            'Authorization': `Bearer ${userStore.token}`
        }} )
}
export function deletePlaceholder(placeholderId) {
    let url = 'placeholder'

    const data = {
        placeholderId: placeholderId
    }

    return axios.delete(api.url + url, {data} )
}

export function linkProjectWithPlaceholder(placeholderId, projectId) {
    let url = 'placeholder/assign'

    return axios.post(api.url + url, {
        placeholderId: placeholderId,
        projectId: projectId
    }, {timeout: 20000} )
}

export function unlinkProjectWithPlaceholder(placeholderId, projectId) {
    let url = 'placeholder/project'

    return axios.put(api.url + url, {
        placeholderId: '',
        projectId: projectId
    }, {timeout: 20000} )
}

export function addPlaceholders(placeholdersParams) {
    let url = 'placeholder'

    return axios.post(api.url + url, placeholdersParams, {timeout: 20000} )
}

export function editPlaceholder(placeholdersParams) {
    let url = 'placeholder/edit'

    return axios.put(api.url + url, placeholdersParams, {timeout: 20000} )
}