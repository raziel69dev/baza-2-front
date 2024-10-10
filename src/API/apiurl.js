import {reactive} from "vue";

export const api = reactive({
    url: import.meta.env.VITE_API_LINK
})