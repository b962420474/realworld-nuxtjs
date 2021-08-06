<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active:tab==='your_feed'
                  }"
                  :to="{
                  name:'home',
                  query:{
                    tab:'your_feed'
                  }
                }"
                  v-if="user"
                >Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  exact
                  :class="{
                    active:tab==='global_feed'
                  }"
                  :to="{
                  name:'home',
                  query:{
                    tab:'global_feed'
                  }
                }"
                >Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link
                 exact
                  class="nav-link"
                  :class="{
                    active:tab==='tag'
                  }"
                  :to="{
                  name:'home',
                  query:{
                    tab:'tag',
                    tag
                  }
                }"
                >#{{tag}}</nuxt-link>
              </li>
            </ul>
          </div>
          <div v-if="!articles.length" class="article-preview">No articles are here... yet.</div>
          <div class="article-preview" v-for="item in articles" :key="item.slug">
            <div class="article-meta">
              <nuxt-link
                :to="{
                name:'profile',
                params:{
                  username:item.author.username
                }
              }"
              >
                <img :src="item.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{
                  name:'profile',
                  params:{
                    username:item.author.username
                  }
                }"
                  class="author"
                >{{item.author.username}}</nuxt-link>
                <span class="date">{{item.createdAt|date('MMM DD, YYYY')}}</span>
              </div>
              <button
                :disabled="item.favoriteDisabled"
                @click="onFavorite(item)"
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                active:item.favorited
              }"
              >
                <i class="ion-heart"></i>
                {{item.favoritesCount}}
              </button>
            </div>
            <nuxt-link
              :to="{
              name:'article',
              params:{
                slug:item.slug
              }
            }"
              class="preview-link"
            >
              <h1>{{item.title}}</h1>
              <p>{{item.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
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
                  tab,
                  tag
                }
              }"
              >{{num}}</nuxt-link>
            </li>
          </ul>
        </nav>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link :to="{
                name:'home',
                query:{
                  tab:'tag',
                  tag
                }
              }"
              v-for="(tag,index) in tags"
              :key="index" 
              class="tag-pill tag-default">{{tag}}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getArticles, getYourFeedArticles, addFavorite, deleteFavorite} from "@/api/article.js";
import { getTags} from "@/api/tag.js";
export default {
  name: "homeIndex",
  //响应 query 参数的变化
  watchQuery: ["page", "tab","tag"],
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1);
    const tab = query.tab || "global_feed";
    const tag = query.tag || "";
    const limit = 20;
    const getArticle =
      tab === "global_feed" ? getArticles : getYourFeedArticles;
    const result = await Promise.all([
      getTags(),
      getArticle({
        limit,
        tag,
        offset: (page - 1) * limit
      })
    ]);
    const articles = result[1].data.articles || []
    const articlesCount = result[1].data.articlesCount || 0
    const tags = result[0].data.tags || []
    articles.forEach(article => article.favoriteDisabled = false)
    return {
      tab,
      tags,
      tag,
      articles,
      page,
      limit,
      articlesCount
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    },
    ...mapState(["user"])
  },
  methods:{
    async onFavorite(article){
      article.favoriteDisabled = true
      const favorite = article.favorited?deleteFavorite:addFavorite
      await favorite(article.slug)
      article.favoritesCount += article.favorited?-1:1
      article.favorited=!article.favorited
      article.favoriteDisabled = false
    }
  }
};
</script>