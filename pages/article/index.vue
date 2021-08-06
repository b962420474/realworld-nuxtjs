<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{article.title}}</h1>

        <article-meta :article="article" @onFavorite="onFavorite" @onFollow="onFollow"></article-meta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" @onFavorite="onFavorite" @onFollow="onFollow"></article-meta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getArticle, addFavorite, deleteFavorite } from "@/api/article.js";
import { followUser, unFollowUser } from "@/api/user.js";
import MarkdownIt from "markdown-it";
import ArticleMeta from "./components/article-meta.vue";
import ArticleComments from "./components/article-comments.vue";
export default {
  name: "articleIndex",
  components: { ArticleMeta, ArticleComments },
  async asyncData({ params }) {
    const slug = params.slug;
    const { data } = await getArticle(slug);
    const article = data.article;
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    article.favoriteDisabled = article.followDisabled = false;
    return {
      article
    };
  },
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description
        }
      ]
    };
  },
  methods: {
    async onFavorite() {
      this.article.favoriteDisabled = true;
      const favorite = this.article.favorited ? deleteFavorite : addFavorite;
      const {data} = await favorite(this.article.slug);
      this.article = data.article
      this.article.favoriteDisabled = false;
    },
    async onFollow() {
      this.article.followDisabled = true;
      const follow = this.article.author.following ? unFollowUser : followUser;
      const {data} = await follow(this.article.author.username);
      this.article.author.following = data.profile.following;
      this.article.followDisabled = false;
    }
  }
};
</script>