import { request } from '@/plugins/request.js'

/**
 * 获取公共文章列表
 * @param {*} params 
 * @returns 
 */
export const getArticles = function (params) {
  return request({
    method: 'get',
    url: '/api/articles',
    params
  })
}
export const getYourFeedArticles = function (params) {
  return request({
    method: 'get',
    url: '/api/articles/feed',
    params
  })
}

export const addFavorite = (slug) => {
  return request({
    method: 'post',
    url: `/api/articles/${slug}/favorite`
  })
}
export const deleteFavorite = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}
// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}
//发布文章
export const publishArticle = data => {
  return request({
    method: 'POST',
    url: `/api/articles`,
    data
  })
}

export const updateArticle = ({slug,data}) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data
  })
}
//删除
export const deleteArticle = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })
}
// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

export const addComments = ({ slug, data }) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}

export const deleteComments = ({ slug, id }) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  })
}