<template>
    <main id="main">
        <div class="heading">
            <span>Recommend a </span><br>
            <span>Show</span>
        </div>
        <div class="my-buttons">
            <div class="row">
                <button type="button" class="btn btn-outline-dark" @click="routeRandomShow()">Random Show</button>
                <button type="button" class="btn btn-outline-dark" @click="routeShowsByGenre()">Shows by Genre</button>
            </div>
            <div class="row">
                <button type="button" class="btn btn-outline-dark" @click="routeShowsStreamingNow()">Shows streaming now</button>
                <button type="button" class="btn btn-secondary" disabled>Shows for you</button>
            </div>
        </div>
        <p style="text-align:center; color: red">Shows for you is not available now.</p>
    </main>
</template>

<script>
import router from '../router';
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
        routeRandomShow(){
            router.push("/random-show")
        },

        routeShowsByGenre(){
            router.push("/shows-by-genre")
        },

        routeShowsStreamingNow(){
            router.push("/shows-streaming-now")
        },
        
        async getUserEmail(){
            await axios.get(this.store.baseURL+"/api/user", {'headers' : { 
                    "Content-Type": "application/json",
                    "Authorization": this.$cookies.get("access_token")
                }})
                .then((response) => {
                    this.store.email = response.data["email"]
                    localStorage.setItem("email_id", response.data["email"])
                })
        },
    },
    created(){
        this.getUserEmail()
    }
}
</script>

<style lang="scss">
    main{
        margin: auto;

        .heading{
            text-align: center;
            text-shadow: 4px 4px black;

            @media (max-width: 1024px) {
                text-shadow: 2px 2px black;
            }

            span{
                font-size:100px;
                font-weight: bold;
                font-style: italic;
                color: #1aae9f;

                @media (max-width: 1024px) {
                    font-size:10vw;
                }
            }
        }

        .my-buttons{
            margin-top: 25%;
            display: flex;
            // width: 25px;

            @media (max-width: 1204px) {
                flex-direction: column;
            }

            .row{
                display: flex;
                flex-direction: column;
                flex-wrap: space-around;
                margin: auto;

                // @media (max-width: 1024px) {
                //     flex-direction: row;
                // }

                button{
                    margin-bottom: 10%;
                    width: 17.5rem;

                    @media (max-width: 1024px) {
                        width: 15rem;
                    }
                }
            }
        }

        @media (max-width: 1024px) {
            margin-top: 20%;
        }
    }
</style>