import axios from "axios"
import info from "../Info"

const api = axios.create({
    baseURL: `http://${info.serverIp}:${info.severPort}/api/`
})

export default api