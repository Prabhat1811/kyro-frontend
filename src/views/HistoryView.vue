<template>
    <main>
        <div class="my-header">
            <h1>History</h1>
            <button type="button" class="btn btn-danger" @click="deleteHistory">Delete History</button>
        </div>

        <div class="my-div" :key="show.id" v-for="show in this.showInfo">
            <ShowCard :id="show.id" :name="show.name" :type="show.type" :language="show.language" :genre="show.genre"
                :status="show.status" :rating="show.rating" :image="show.image" :summary="show.summary" />
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
            showInfo: []
        }
    },
    components: {
        ShowCard
    },
    methods: {

        async getHistory(){
            await axios.get(this.store.apiURL+"/api/history", {'headers' : {
                "Content-Type": "application/json",
                "Authentication-Token": this.$cookies.get("auth_token")
            }})
            .then(response => this.store.history = response.data)
        },

        async fetchLikedShows(){

            await this.getHistory()

                for (let i = 0; i < this.store.history.length; i++){

                const id = this.store.history[i]["show_id"]

                await axios.get(this.store.showsURL+"/"+id)
                .then((response) => {
                    const data = {
                        "id": response.data["id"],
                        "name": response.data["name"],
                        "type": response.data["type"],
                        "language": response.data["language"],
                        "genre": response.data["genres"].join(", "),
                        "status": response.data["status"],
                        "rating": response.data["rating"]["average"],
                        "image": response.data["image"]["medium"],
                        "summary": response.data["summary"]
                    }
                    this.showInfo = [...this.showInfo, data]
                })
            }
        },
        async deleteHistory(){

            const headers = {
                "Content-Type": "application/json",
                "Authentication-Token": $cookies.get("auth_token")
            }

            await axios({
                method: "delete",
                url: this.store.apiURL+"/api/history",
                headers: headers
            })
            .then(() => {
                this.store.history = []
                this.history = []
                this.showInfo = []
            }
            )
            .catch((response) => {
                //handle error
                // this.errorMessage = response.response.data.response.errors[0]
                console.log(response)
            })
        }
    },
    beforeMount(){
        this.fetchLikedShows()
    }
}

</script>

<style lang="scss">
    main{
        
        min-height: 100vh;
        margin-top: 2%;
        width: 75em;

        .my-header{

            display: flex;
            justify-content: space-between;


            h1{
                text-align: center;
                margin-top: 10%;
                font-weight: bold;
                @media (max-width: 1024px) {
                    margin-top: 0;
                    margin-bottom: 5%;
                }
            }
            button{
                margin-top: 10%;
                @media (max-width: 1024px) {
                    margin-top: 0;
                    margin-bottom: 5%;
                }
            }
        }
        
        .my-div{
            display: flex;
            flex-direction: column;
            button{
                width: auto;
                margin-bottom: 50px;
                
                @media (max-width: 1024px) {
                    width: 100%;
                    margin: auto;
                }
            }
        }
        @media (max-width: 1024px) {
            margin-top: 5%;
            width: 75em;
        }
    }
</style>