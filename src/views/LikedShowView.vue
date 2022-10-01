<template>
    <main>
        <h1 class="my-header"><strong>Liked Shows</strong></h1>

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
            likedShows: [],
            showInfo: []
        }
    },
    components: {
        ShowCard
    },
    methods: {

        async fetchLikedShows(){
            await axios.get(this.store.baseURL+"/api/liked_shows", {'headers' : { 
                "Content-Type": "application/json",
                "Authorization": $cookies.get("access_token")
            }})
            .then(response => this.likedShows = response.data)

            for (let i = 0; i < this.likedShows.length; i++){

                const id = this.likedShows[i]["show_id"]

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
        }
    },
    beforeMount(){
        this.fetchLikedShows()
    }
}

</script>

<style lang="scss">
    main{
        margin: auto;
        min-height: 100vh;
        margin-top: 5rem;
        width: 75rem;

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
        }
        
        .my-div{
            display: flex;
            flex-direction: column;

            @media (max-width: 1024px) {
                margin-bottom: 25px;
            }
        }
        @media (max-width: 1024px) {
            margin-top: 5%;
            width: 20rem;
        }
    }
</style>