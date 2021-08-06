<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name:'profile',
        params:{
            username:article.author.username
        }
    }"
    >
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
        name:'profile',
        params:{
            username:article.author.username
        }
    }"
        class="author"
      >{{article.author.username}}</nuxt-link>
      <span class="date">{{article.createdAt|date('MMM DD, YYYY')}}</span>
    </div>
    <button
      class="btn btn-sm btn-outline-secondary"
      @click="onFollow"
      :disabled="article.followDisabled"
      :class="{
        active:article.author.following
    }"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow {{article.author.username}}
    </button>
    &nbsp;&nbsp;
    <button
      class="btn btn-sm btn-outline-primary"
      @click="onFavorite"
      :disabled="article.favoriteDisabled"
      :class="{
        active:article.favorited
    }"
    >
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Article
      <span class="counter">({{article.favoritesCount}})</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "article-meta",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    onFavorite() {
      this.$emit("onFavorite");
    },
    onFollow() {
      this.$emit("onFollow");
    }
  }
};
</script>