<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <form @submit.prevent="update">
            <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="myuser.image" />
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="myuser.username"/>
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="myuser.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email"  v-model="myuser.email"/>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="myuser.password"/>
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
            </fieldset>
          </form>
          <button class="btn btn-outline-danger" @click="logout">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const Cookies = process.client ? require("js-cookie") : undefined;
import { updateUser } from "@/api/user.js";
import { mapMutations,mapState } from "vuex";
export default {
  //在路由匹配渲染视图之前先处理中间件
  middleware: "authenticated",
  name: "settingsIndex",
  data() {
    return {
      myuser: {
        username: null,
        bio:null,
        image:null,
        email: null,
        password: null
      },
      errors: ""
    };
  },
  computed:{
    ...mapState(['user'])
  },
  created(){
    this.myuser = Object.assign(this.user)
  },
  methods: {
    ...mapMutations(["setUser"]),
    logout() {
      this.setUser(null);
      Cookies.remove("user");
      this.$router.push("/");
    },
    async update () {
      try {
        const {data} = await updateUser()
      } catch (error) {
        
      }
    }
  }
};
</script>