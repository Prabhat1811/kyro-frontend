<template>

    <div class="my-card card w-65">
        <img :src= image class="card-img-top" alt="image">
        <div class="my-card-body">
            <div class="card-body">
                <h5 class="card-title"><strong>{{ name }}</strong></h5>
                <p class="card-text" v-html=summary></p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"></li>
                <li class="list-group-item">Type - {{ type }}</li>
                <li class="list-group-item">Language - {{ language }}</li>
                <li class="list-group-item">Genre - {{ genre }}</li>
                <li class="list-group-item">Status - {{ status }}</li>
                <li class="list-group-item">Rating - {{ rating }}</li>
                <li class="list-group-item"></li>
            </ul>
            <div class="card-body">
                <a href="#" class="card-link" @click="likeShow(id)">Like</a>
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

            const headers = {
                "Content-Type": "application/json",
                "Authentication-Token": $cookies.get("auth_token")
            }

            const data = {
                "show_id": this.id,
            }

            await axios({
                method: "post",
                url: this.store.apiURL+"/api/liked_shows",
                data: data,
                headers: headers
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
        margin-top: 4vw;
        margin-bottom: 15px;
        display: flex;
        flex-direction: row;
        width: auto;

        // 77aaff

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

        .my-card-body{
            display: flex;
            flex-direction: column;
        }
    }
    

</style>