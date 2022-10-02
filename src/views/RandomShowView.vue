<template>
    <main style="padding: 0; margin: 0; height: 100vh;">
        <div class="my-header">
            <h1><strong>Random Show</strong></h1>
        </div>

        <div class="spinner-border" role="status" id="my-spinner">
            <span class="visually-hidden">Loading...</span>
        </div>

        <div class="my-div" id="my-div">
            <ShowCard :id="id" :name="name" :type="type" :language="language" :genre="genre"
                :status="status" :rating="rating" :image="image" :summary="summary" class="show-card"/>
            <button type="button" class="btn btn-outline-dark" @click="fetchShow()" id="next-button">Next Show</button>
         </div>
         <div class="error" id="error">
            <div>

                <ul class="my-list">
                    <li>This error occured because of one of the following reasons:</li>
                    <li>
                        <ul>
                            <li>A show with this id doesn't exists</li>
                            <li>You have seen all shows. To see more shows clear your history</li>
                        </ul>
                    </li>
                    <li>Simply, click next show. If the issue still persists, Try clearing your history.</li>
                </ul>

            </div>
            <button type="button" class="btn btn-outline-dark" @click="fetchShow()">Next Show</button>
        </div>
    </main>
</template>

<script>

import { myStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import ShowCard from '@/components/ShowCard.vue'
import axios from 'axios'

export default {
    setup(){
      const store = myStore()
      const { newStore } = storeToRefs(store)

      return { store }
    },
    data() {
        return {
            id: "",
            name: "",
            type: "",
            language: "",
            genre: {},
            status: "",
            rating: "",
            image: "",
            summary: "",
        }
    },
    components: {
        ShowCard
    },
    methods: {
        showSpinner(){
            document.getElementById("my-spinner").style.display = "block"
            document.getElementById("my-div").style.display = "none"
            document.getElementById("error").style.display = "none"
        },
        hideSpinner(){
            document.getElementById("my-spinner").style.display = "none"
            document.getElementById("my-div").style.display = "flex"
        },
        onError(){
            document.getElementById("my-div").style.display = "none"
            document.getElementById("my-spinner").style.display = "none"
            document.getElementById("error").style.display = "block"

        },
        moreShows(){
        if (this.store.availableShows.length >= this.store.totalShows.length){
                this.onError()
                return false
            }
            return true
        },
        async initShows(){

            await axios.get(this.store.baseURL+"/api/history", {'headers' : {
                "Content-Type": "application/json",
                "Authorization": $cookies.get("access_token")
            }})
            .then(response => this.store.history = response.data)

            this.store.availableShows = []
            for (let i = 1; i < this.store.totalShows; i++){
                this.store.availableShows.push(i)
            }
            
            for (let i = 0; i < this.store.history.length; i++){
                const id = this.store.history[i]["show_id"]

                const index = this.store.availableShows.indexOf(id);
                if (index > -1) {
                    this.store.availableShows.splice(index, 1);
                }
            }
        },

        async fetchShow() {
            this.showSpinner()
            this.moreShows()

            this.id = this.store.availableShows[Math.floor((Math.random() * (this.store.availableShows.length-1)))]

            // Remove show from available shows
            const index = this.store.availableShows.indexOf(this.id);
            if (index > -1) {
                this.store.availableShows.splice(index, 1);
            }

            const show = await axios.get(this.store.showsURL+"/shows/"+this.id)
            .then(response => response.data)
            .catch((response) => {
                this.onError();
            })

            this.name = show["name"]
            this.type = show["type"]
            this.language = show["language"]
            this.genre = show["genres"].join(", ")
            this.status = show["status"]
            this.rating = show["rating"]["average"]
            this.image = show["image"]["medium"]
            this.summary = show["summary"]


            const headers = {
                "Content-Type": "application/json",
                "Authorization": $cookies.get("access_token")
            }

            const data = {
                "show_id": this.id,
            }

            await axios({
                method: "post",
                url: this.store.baseURL+"/api/history",
                data: data,
                headers: headers
            })
            .then(
                this.store.history = [...this.store.history, data]
            ).catch((response) => {
                this.hideSpinner();
            })


            this.hideSpinner();
        },
        async initialShow(){

            if (this.moreShows() === false){
                
            }
            this.showSpinner()
            await this.initShows()
            await this.fetchShow()
            this.hideSpinner()
        }
    },
    mounted() {
        this.initialShow()
    }
}

</script>

<style lang="scss">
    #my-spinner{
        margin: auto;
    }

    .my-header{

            h1{
                text-align: center;
                margin-bottom: 10px;
                
            }

            @media (max-width: 1024px) {
                    margin-top: 0;
                    margin-bottom: 5%;
                }
        }

    .error{
        display: none;
        width: auto;

        p{
            font-weight: bold;
            text-align: center;
            margin-bottom: 0;
        }
        .my-list{
            list-style: none;
        }
        button{
            padding: 10px;
            border: 1px solid red;
            box-shadow:  -1px 1px red,
                -2px 2px red,
                -3px 3px red,
                -4px 4px red,
                -5px 5px red;

            width: 100%;
            margin-bottom: 50px;
            @media (max-width: 1024px) {
                width: 100%;
                margin: auto;
                margin-bottom: 25px;
            }
        }
    }
    .my-div{
        display: flex;
        flex-direction: column;

        button{
            padding: 10px;
            border: 1px solid #77aaff;
            box-shadow:  -1px 1px #77aaff,
                -2px 2px #77aaff,
                -3px 3px #77aaff,
                -4px 4px #77aaff,
                -5px 5px #77aaff;

            width: auto;
            margin-bottom: 50px;
            @media (max-width: 1024px) {
                width: 100%;
                margin: auto;
                margin-bottom: 25px;
            }
        }
    }
</style>