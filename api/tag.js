import {request} from '@/plugins/request.js'

/**
 * 获取标签文章列表
 * @param {*} params 
 * @returns 
 */
export const getTags = function (params) {
    return Promise.resolve({data:{tags:[]}})
    return request({
        method: 'get',
        url: '/api/tags'
    })
}
