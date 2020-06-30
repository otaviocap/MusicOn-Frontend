import axios from "axios"

const api = axios.create({
    baseURL: 'http://187.181.244.91:3333/api/'
})

export default api