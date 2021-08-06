<template>
  <div>
    <form class="card comment-form" v-if="user">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="body"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button
          class="btn btn-sm btn-primary"
          @click.prevent="postComment"
          :disabled="postDisabled"
        >Post Comment</button>
      </div>
    </form>
    <p v-else style="display: inherit;">
      <nuxt-link  to="/login">Sign in</nuxt-link> or
      <nuxt-link  to="/register">sign up</nuxt-link> to add comments on this article.
    </p>
    <div class="card" v-for="(comment, index) in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name:'profile',
            params:{
                username:comment.author.username
            }
        }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>&nbsp;
        <nuxt-link
          :to="{
            name:'profile',
            params:{
                username:comment.author.username
            }
        }"
          class="comment-author"
        >{{comment.author.username}}</nuxt-link>
        <span class="date-posted">{{comment.createdAt|date('MMM DD, YYYY')}}</span>
        <span
          class="mod-options"
          v-if="user&&comment.author.username===user.username"
          @click="removeComponent(comment,index)"
        >
          <i class="ion-trash-a"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getComments, addComments, deleteComments } from "@/api/article.js";
export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      comments: [],
      body: "",
      postDisabled: false
    };
  },
  computed: {
    ...mapState(["user"])
  },
  async mounted() {
    const { data } = await getComments(this.article.slug);
    this.comments = data.comments;
  },
  methods: {
    async postComment() {
      this.postDisabled = true;
      const { data } = await addComments({
        data: {
          comment: {
            body: this.body
          }
        },
        slug: this.article.slug
      });
      this.postDisabled = false;
      this.comments.unshift(data.comment);
      this.body = "";
    },
    async removeComponent(comment, index) {
      await deleteComments({
        id: comment.id,
        slug: this.article.slug
      });
      this.comments.splice(index, 1);
    }
  }
};
</script>