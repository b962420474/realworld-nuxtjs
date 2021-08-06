<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <!-- <list-errors class="ng-isolate-scope"> -->
          <ul class="error-messages">
            <div class="ng-scope" v-for="(item,key) in errors" :key="key">
              <li
                class="ng-binding ng-scope"
                v-for="(msg,index) in item"
                :key="index"
              >{{key}} {{msg}}</li>
            </div>
          </ul>
          <!-- </list-errors> -->
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tag"
                  @keydown.enter="enter"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill ng-binding ng-scope"
                    v-for="(tag,index) in article.tagList"
                    :key="index"
                  >
                    <i class="ion-close-round" @click="removeTag(index)"></i>
                    {{tag}}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="publish()"
              >Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { publishArticle, updateArticle } from "@/api/article.js";
export default {
  //在路由匹配渲染视图之前先处理中间件
  middleware: "authenticated",
  name: "editorIndex",
  data() {
    return {
      errors: {},
      tag: "",
      article: {
        title: "",
        description: "",
        body: "",
        tagList: []
      }
    };
  },
  created() {
    if (this.$route.params.article) {
      this.article = this.$route.params.article;
    }
  },
  methods: {
    async publish() {
      try {
        const slug = this.$route.params.slug;
        let resullt;
        if (slug) {
          resullt = await updateArticle({
            slug,
            data: { article: this.article }
          });
        } else {
          resullt = await publishArticle({ article: this.article });
        }
        const article = resullt.data.article;
        this.$router.push({
          name: "article",
          params: {
            slug: article.slug
          }
        });
      } catch (error) {
        this.errors = error.response.data.errors;
      }
    },
    removeTag(index) {
      this.article.tagList.splice(index, 1);
    },
    enter() {
      if (this.tag === "") return;
      const data = this.article.tagList.find(tag => tag === this.tag);
      if (!data) {
        this.article.tagList.push(this.tag);
        this.tag = "";
      }
    }
  }
};
</script>