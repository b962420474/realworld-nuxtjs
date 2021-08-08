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
    <template v-if="user&&user.username===article.author.username">
      <nuxt-link
        :to="{
        name:'editorArticle',
        params:{
          slug:article.slug,
          article
        }
      }"
        class="btn btn-outline-secondary btn-sm"
      >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>
      <button class="btn btn-outline-danger btn-sm" @click="remove()">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
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
        {{article.author.following?'Unfollow':'Follow'}} {{article.author.username}}
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
        {{article.favorited?'Unfavorite':'Favorite'}} Article
        <span
          class="counter"
        >({{article.favoritesCount}})</span>
      </button>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { deleteArticle } from "@/api/article.js";
export default {
  name: "article-meta",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    onFavorite() {
      // if(!this.user){
      //   this.$router.push('/login')
      //   return
      // }
      this.$emit("onFavorite");
    },
    onFollow() {
      // if(!this.user){
      //   this.$router.push('/login')
      //   return
      // }
      this.$emit("onFollow");
    },
    async remove(){
      await deleteArticle(this.article.slug)
      this.$router.push('/')
    }
  }
};
</script>