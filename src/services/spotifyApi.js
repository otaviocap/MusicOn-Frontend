import axios from "axios"

const spotifyapi = axios.create({
    baseURL: 'http://api.spotify.com'
})

export default api