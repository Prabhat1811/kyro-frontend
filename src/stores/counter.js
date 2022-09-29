import { defineStore } from 'pinia'
import axios from 'axios'

export const myStore = defineStore({
  id: 'myStore',
  state: () => ({
    // loginURL: "http://127.0.0.1:8000/login?include_auth_token",
    loginURL: "https://kyro-show-recommender-backend.herokuapp.com/login?include_auth_token",

    // logoutURL: "http://127.0.0.1:8000/logout",
    logoutURL: "https://kyro-show-recommender-backend.herokuapp.com/logout",

    // registerURL: "http://127.0.0.1:8000/register",
    registerURL: "https://kyro-show-recommender-backend.herokuapp.com/register",

    // apiURL: "http://127.0.0.1:8000",
    apiURL: "https://kyro-show-recommender-backend.herokuapp.com",

    showsURL: "https://api.tvmaze.com/shows",
    totalShows: 249,
    // totalShows: 1,
    availableShows: [],
    history: [],
    likedShows: [],
    email_id: localStorage.getItem("email_id"),
    isLoggedIn: ($cookies.get("is_logged_in") === null) ? (false) : ($cookies.get("is_logged_in")),

  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    updateHistory(value){
      Object.assign(this.history, value)
    }
  }
})