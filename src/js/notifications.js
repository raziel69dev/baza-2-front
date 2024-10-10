import {reactive} from "vue";
import {uuid} from "vue3-uuid";

export const notifications = reactive([])

export function addNotice(data) {
    data.id = uuid.v4()
    notifications.push(data)

    const newData = setTimeout(() => {
        notifications.splice(notifications.findIndex(item => item.id === data.id), 1)
    }, 5000)
}

export function removeNotice(id) {
    notifications.splice(notifications.findIndex(item => item.id === id), 1)
}

export function removeAllNotices() {
    notifications.splice(0, notifications.length)
}

