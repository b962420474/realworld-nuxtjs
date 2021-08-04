import request from '@/utils/request.js'

export const login = function (data) {
    return request({
        method: 'POST',
        url: '/api/users/login',
        data
    })
}
export const register = function (data) {
    return request({
        method: 'POST',
        url: '/api/users',
        data
    })
}