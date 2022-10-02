<template>
    <nav class="navbar navbar-expand-lg fixed-top bg-light my-navbar">
        <div class="container-fluid">
            <a class="navbar-brand full-text" href="/">Show Recommender</a>
            <a class="navbar-brand short-text" href="/">SR</a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" />

            <div class="dropstart" v-if="store.isLoggedIn">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Options
                </button>
                <ul class="dropdown-menu my-dropdown" style="text-overflow: ellipsis;">
                    <li class="dropdown-item disabled my-item my-email" style="color:black">Hello, {{ this.store.email_id }}</li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item my-item" @click="routeLikedShows">Liked Shows</a></li>
                    <li><a class="dropdown-item my-item" @click="routeHistory">History</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item my-item" @click="logoutUser">Sign out</a></li>
                </ul>
            </div>

        </div>
    </nav>
</template>

<script>
import { myStore } from '@/stores/counter'
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

        }
    },

    methods: {
        async logoutUser(){
            this.store.isLoggedIn = false
            this.$cookies.remove("is_logged_in")
            this.$cookies.remove("access_token")
            this.$router.push('/about')
            localStorage.clear()
      },
      routeLikedShows(){
        this.$router.push('/liked-shows')
      },
      routeHistory(){
        this.$router.push('/history')
      }
    }
}
</script>

<style lang="scss" scoped>
    .my-navbar{
        background-color: #8dd7cf !important;
        padding: 0.5% 10%;
        
        .navbar-brand{
            font-weight: bold;
            background-color: white;
            padding: 0 1%;
            border-style: groove;
            font-style: italic;
        }

        .my-dropdown{
            max-width: 15vw;
            
            .my-item{
                user-select: none;
            }

            .my-email{
                max-width: 95%;
                overflow: hidden;
            }
        }
        
    }
    @media (max-width: 1024px) {
        .my-navbar{
            background-color: #8dd7cf;
            padding-left: 0;
            padding-right: 0;
        }
    }

    @media (min-width: 345px) {
        .short-text{
                display: none;
        }
    }

    @media (max-width: 345px) {
        .full-text{
            display: none;
        }
        .short-text{
            display: inline-block;
        }
    }

</style>