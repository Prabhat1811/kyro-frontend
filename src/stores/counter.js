import { defineStore } from 'pinia'
import axios from 'axios'

export const myStore = defineStore({
  id: 'myStore',
  state: () => ({
    baseURL: "https://gloomy-night.onrender.com",
    // baseURL: "http://127.0.0.1:8000",

    showsURL: "https://api.tvmaze.com",

    backupImgURL: "https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg",
    totalShows: 250,
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
