<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>{{profile.bio}}</p>
            <button class="btn btn-sm btn-outline-secondary action-btn" v-if="profile.username !== user.username" @click="onFollow(profile)">
              <i class="ion-plus-round"></i>
              &nbsp;
              {{(profile.following?'Unfollow ':'Follow ')+ profile.username}}
            </button>
            <nuxt-link class="btn btn-sm btn-outline-secondary action-btn" to="/settings" v-else>
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link" :to="{
                  name:'profile',
                  params:{
                    username:profile.username
                  }
                }"
                exact
                >My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" :to="{
                  name:'profileFavorites',
                  params:{
                    username:profile.username
                  }
                }"
                exact
                >Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>
          <div v-if="!articles.length" class="article-preview">No articles are here... yet.</div>
          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{
                name:'profile',
                params:{
                  username:article.author.username
                }
              }">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link :to="{
                name:'profile',
                params:{
                  username:article.author.username
                }
              }" class="author">{{article.author.username}}</nuxt-link>
                <span class="date">{{article.createdAt|date('MMM DD, YYYY')}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" 
                :disabled="article.favoriteDisabled"
                @click="onFavorite(article)"
                :class="{
                  active:article.favorited
                }"
                >
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{
              name:'article',
              params:{
                slug:article.slug
              }
            }" class="preview-link">{{article.body}}</nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <li
                class="page-item ng-scope"
                :class="{
                  active:page===num
                }"
                v-for="num in totalPage"
                :key="num"
              >
                <nuxt-link
                  class="page-link ng-binding"
                  :to="{
                  name:'home',
                  query:{
                    page:num,
                  }
                }"
                >{{num}}</nuxt-link>
              </li>
            </ul>
        </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {getUser} from '@/api/user.js'
import { followUser, unFollowUser } from "@/api/user.js";
import {getArticles,addFavorite, deleteFavorite} from '@/api/article.js'
export default {
  //在路由匹配渲染视图之前先处理中间件
  watchQuery: ["page"],
  middleware:'authenticated',
  name: "profileIndex",
  async asyncData({params,store,route,query}){
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const username = params.username
    let profile
    if(store.state.user.username === username){
      profile = Object.assign(store.state.user,{})
    }
    else{
      const {data} = await getUser(username)
      profile = data.profile
    }
    const params1 = {
      limit,
      offset: (page - 1) * limit
    }
    if(route.name==='profileFavorites'){
      params1.favorited = username
    }
    else{
      params1.author = username
    }
    const result = await getArticles(params1)
    const articles = result.data.articles
    const articlesCount = articles.articlesCount || 0
    articles.forEach(article => article.favoriteDisabled = false)
    return {
      profile,
      articles,
      limit,
      page,
      articlesCount
    }
  },
  computed:{
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
  },
  methods:{
    async onFavorite(article){
      article.favoriteDisabled = true
      const favorite = article.favorited?deleteFavorite:addFavorite
      await favorite(article.slug)
      article.favoritesCount += article.favorited?-1:1
      article.favorited=!article.favorited
      article.favoriteDisabled = false
    },
    async onFollow(profile) {
      const follow = profile.following ? unFollowUser : followUser;
      const {data} = await follow(profile.username);
      profile.following = data.profile.following;
    }
  }
};
</script>