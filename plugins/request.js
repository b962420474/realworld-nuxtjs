import axios from 'axios'

export const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})
export default ({ store,app }) => {
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

        request.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            return response;
          }, function (error) {
            // 对响应错误做点什么
            if(error.response.status===401){
                app.router.push('/login')
                return Promise.reject(null)
            }
            return Promise.reject(error);
          })
}