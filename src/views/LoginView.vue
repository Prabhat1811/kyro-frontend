<template>
  <main class="login-page">
    <div class="form-outer">
      <p style="text-align:center; color: green">Initially, please expect a delay in fulfilling the request, as I am currently operating under a free plan, which may result in longer processing times.</p>
      <div class="form-inner">
        <form class="row g-3 needs-validation border rounded" id="myForm" method="POST" @submit.prevent="onSubmit">
          <h1>Sign in</h1>

          <div class="mb-3" id="email">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="email">
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password">
          </div>

          <button type="submit" class="btn btn-primary" value="Login" id="submit">Login</button>

          <p class="error-msg">{{ errorMessage }}</p>
        </form>

        Don't have an account? <a href="/register">Register</a>
      </div>
    </div>
  </main>
</template>

<script>

import { myStore }  from '@/stores/counter'
import { storeToRefs } from 'pinia'
import axios from 'axios'

export default {
    setup(){
      const store = myStore()
      const { newStore } = storeToRefs(store)
      return { store }
    },
    data() {
      return {
        email: "",
        password: "",
        errorMessage: ""
      }
    },

    methods: {
      async onSubmit(e){
        
        this.errorMessage = ""

        const loginData = {
                "email": this.email,
                "password": this.password
              }

        await axios.post(this.store.baseURL+"/api/user/login",
          loginData,
          { "Content-Type": "application/json" }
          )
          .then((response) => { 
              this.store.isLoggedIn = true;
              $cookies.set("is_logged_in", true)
              $cookies.set("access_token", "Bearer".concat(" ", response.data["access_token"]))
              this.$router.push('/')
          })
          .catch((response) => {
            //handle error
            this.errorMessage = response.response.data["msg"]
          });

      }
    },
    mounted() {
    }
  }

</script>

<style lang="scss" scoped>
 
  .login-page{
    padding: 0;
    margin: 0;

    .form-outer{
      display: flex;
      flex-direction: column;
      width: 65%;
      margin: 0 auto;
      padding: 1rem;

      @media (max-width: 768px) {
        width: 100%;
        margin-top: 20%;
      }

      h1{
        padding:0;
        margin: 0;
        text-align: center;
        word-wrap: break-word;
      }

      .form-inner{
        margin: 1rem 0;

        form{
          padding: 2rem;

        }

        a{
          text-align: center;
        }

        .error-msg{
          color: #ED4956;
          padding: 0;
          margin: 0;
          margin-top: 0.5rem;
        }

      }

    }
    
  }
</style>
