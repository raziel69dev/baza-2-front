import axios from "axios";
import {api} from "@/API/apiurl.js";
import {userStore} from "@/Stores/userStore.js";
import {addNotice} from "@/js/notifications.js";
import {popup} from "@/js/controllers/popupController.js";

export function getReviews(options) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    let link = '?'
    if (options) {
        for (let option in options) {
            link += `${option}=${options[option]}&`
        }
    }
    link = link.slice(0, -1)
    return axios.get(`${api.url}reviews${link}`, {headers})

}


export async function addReview(review) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };

    return await axios.post(`${api.url}reviews`, review, {headers})
        .then(result => {
            addNotice({name: 'Отзыв отправлен на модерацию', type: 'success'})
            popup.show = false
        }).catch(error => {
                let message;
                if (error.response.data.message === "This user already rated this project.") {
                    message = 'Вы уже оставляли отзыв'
                } else {
                    message = 'Ошибка :('
                }
                addNotice({name: message, type: 'danger'})
            }
        )
}


export function showNotReviewed(options) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    let link = ''
    if (options) {
        for (let option in options) {
            link += `${option}=${options[option]}&`
        }
    }
    link = link.slice(0, -1)
    return axios.get(`${api.url}reviews?showNotReviewed=true&${link}`, {headers})
}

export async function editReview(review) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };

    return await axios.put(`${api.url}reviews/${review.id}`, review, {headers})
        .then(result => {
            const review = projectReviewsStore.reviews.find(item => item.id === result.data.updatedReview.id)
            review.comment = result.data.updatedReview.comment
            review.rating = result.data.updatedReview.rating
        }).catch(error => error)
}

export async function deleteReview(review) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    return axios.delete(`${api.url}reviews/${review.id}`, {headers})
}

export async function approveReview(review) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    review.isReviewed = true

    return axios.put(`${api.url}reviews/${review.id}`, review, {headers})
}

export async function disapproveReview(review) {
    const headers = {
        'Authorization': `Bearer ${userStore.token}`
    };
    review.isReviewed = false

    return await axios.put(`${api.url}reviews/${review.id}`, review, {headers})
        .then(result => result).catch(error => error)
}