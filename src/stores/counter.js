import { defineStore } from 'pinia'
import axios from 'axios'

export const myStore = defineStore({
  id: 'myStore',
  state: () => ({
    // loginURL: "http://127.0.0.1:8000/api/user/login",
    loginURL: "https://kyro-recommender-backend.herokuapp.com/api/user/login",

    // logoutURL: "http://127.0.0.1:8000/api/userlogout",
    // logoutURL: "https://kyro-recommender-backend.herokuapp.com/api/userlogout",

    // registerURL: "http://127.0.0.1:8000/api/user/register",
    registerURL: "https://kyro-recommender-backend.herokuapp.com/api/user/register",

    // apiURL: "http://127.0.0.1:8000",
    apiURL: "https://kyro-recommender-backend.herokuapp.com",

    showsURL: "https://api.tvmaze.com/shows",
    totalShows: 249,
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