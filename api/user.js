import {request} from '@/plugins/request.js'

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
export const followUser = function (username) {
    return request({
        method: 'POST',
        url: `/api/profiles/${username}/follow`,
    })
}
export const unFollowUser = function (username) {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`,
    })
}