import {userStore} from "@/Stores/userStore.js";
import {api} from "@/API/apiurl.js";
import axios from "axios";
import {addNotice} from "@/js/notifications.js";

export function uploadImage (file) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };

    const formData = new FormData();
    formData.append("image-upload", file );

    return axios.post(`${api.url}image-upload`, formData, {headers}).then(result => result).catch((error) => {
        let message;
        if (error.response.data.message === 'File too large') {
            message = 'Ограничение на загрузку файлов 5мб'
        } else {
            message = 'Ошибка загрузки изображения'
        }
        addNotice({name: message, type: 'danger'})
    })
}