<template>
    <main>
        <div class="heading">
            <span>Recommend a </span><br>
            <span>Show</span>
        </div>
        <div class="tag">
            <p><strong>Recommend a Show helps you discover new TV shows.</strong></p>
        </div>
        <div class="my-buttons"  v-if="!store.isLoggedIn">
            <button type="button" class="btn btn-outline-dark" @click="routeLogin">Sign In</button>
        </div>
    </main>
</template>

<script>
import { myStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import router from '../router';
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
    components: {
    },
    methods: {
        async WakeBackend(){
            await axios.get(this.store.baseURL+"/", {'headers' : {
                "Content-Type": "application/json",
            }})
        },
        async routeLogin() {
            router.push("/login")
        }
    },
    beforeMount(){
        this.WakeBackend()
    }
}
</script>

<style lang="scss">
    main{
        width: auto;

        .heading{
            text-align: center;

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
        .tag{
            p{
                text-align: center;
            }
        }

        .my-buttons{
            margin-top: 25%;
            display: flex;
            justify-content:space-between;

            @media (max-width: 1204px) {
                flex-direction: column;
            }

            button{
                    margin: auto;
                    width: 100%;
                }
        }

        @media (max-width: 1024px) {
            margin-top: 20%;
        }
    }
</style>
