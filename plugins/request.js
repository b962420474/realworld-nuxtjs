import axios from 'axios'

export const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})
export default ({ store }) => {
    request.interceptors.request.use(
        config => {
            const user = store.state.user
            if (user && user.token) {
                config.headers.Authorization = `Token ${user.token}`
            }
            return config
        },
        error => {
            return Promise.reject(error)
        })
}