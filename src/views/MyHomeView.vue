<template>
    <main id="main">
        <div class="heading">
            <span>Recommend a </span><br>
            <span>Show</span>
        </div>
        <div class="my-buttons">
            <div class="row">
                <button type="button" class="btn btn-outline-dark" @click="routeRandomShow">Random Show</button>
                <button type="button" class="btn btn-secondary" disabled>Shows by Choice</button>
            </div>
            <div class="row">
                <button type="button" class="btn btn-secondary" disabled>Shows for you</button>
                <button type="button" class="btn btn-secondary" disabled>Shows streaming now</button>
            </div>
        </div>
        <p style="text-align:center; color: red">As of now only Random show functionality works. Other functionalities will be available later.</p>
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
        async routeRandomShow() {
            router.push("/random-show")
        },

        async getUserEmail(){
            await axios.get(this.store.apiURL+"/api/user", {'headers' : { 
                    // "Content-Type": "application/json",
                    "Authorization": this.$cookies.get("access_token")
                }})
                .then((response) => {
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