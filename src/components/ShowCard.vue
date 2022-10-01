<template>

    <div class="my-card card w-65">
        <img :src= image class="card-img-top my-image" alt="image">
        <div class="my-card-body">
            <div class="card-body">
                <h5 class="card-title"><strong>{{ name }}</strong></h5>
                <p class="card-text" v-html=summary></p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"></li>
                <li class="list-group-item"><strong>Type</strong> - {{ type }}</li>
                <li class="list-group-item"><strong>Language</strong> - {{ language }}</li>
                <li class="list-group-item"><strong>Genre</strong> - {{ genre }}</li>
                <li class="list-group-item"><strong>Status</strong> - {{ status }}</li>
                <li class="list-group-item"><strong>Rating</strong> - {{ rating }}</li>
                <li class="list-group-item"></li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link">
                    <span class="material-icons my-heart" @click="likeShow()">favorite_border</span>
                </a>
                <!-- <span class="material-icons card-link" @click="likeShow()">favorite_border</span> -->
            </div>
        </div>
    </div>
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
    props: [
        'id',
        'name',
        'type',
        'language',
        'genre',
        'status',
        'rating',
        'image',
        'summary'
    ],
    data() {
        return {
        }
    },
    methods: {
        async likeShow(){

            $('.card-link').click(function($e){
                $e.preventDefault()
            })

            const headers = {
                "Content-Type": "application/json",
                "Authorization": $cookies.get("access_token")
            }

            const data = {
                "show_id": this.id,
            }

            await axios({
                method: "post",
                url: this.store.baseURL+"/api/liked_shows",
                data: data,
                headers: headers
            })
            .then(() => {

                // Change the color of heart
                // $('.my-heart').css('color', 'red');
                // $('.my-heart').css('background-color', '');

            })
            .catch((response) => {
                //handle error
                console.log(response)
            })
        },
    }
}
</script>

<style lang="scss">

    .my-card{
        margin: auto auto;
        margin-bottom: 15px;
        display: flex;
        flex-direction: row;
        width: auto;

        padding: 10px;
        border: 1px solid #999;
        box-shadow:  -1px 1px #999,
            -2px 2px #999,
            -3px 3px #999,
            -4px 4px #999,
            -5px 5px #999;

        @media (max-width: 1024px) {
            margin: auto;
            flex-direction: column;
        }

        .my-image{
            margin: auto;
            width: auto;
        }

        .my-card-body{
            display: flex;
            flex-direction: column;
        }

        .my-heart{
            color: red;
        }

        a:hover{
            background-color: transparent;
        }
    }
    

</style>