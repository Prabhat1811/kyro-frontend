<template>
    <main style="padding: 0; margin: 0; height: 100vh;">

        <div class="my-page">
            <h3 class="my-header"><strong>Streaming Now</strong></h3>

            <div class="my-checks">
                <h4>Country</h4>

                <div class="my-flex-div">

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="countryCodes" value="IN" id="India">
                        <label class="form-check-label" for="India">
                            India
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="countryCodes" value="US" id="USA">
                        <label class="form-check-label" for="USA">
                            USA
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="countryCodes" value="GB" id="United Kingdom">
                        <label class="form-check-label" for="United Kingdom">
                            United Kingdom
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="countryCodes" value="JP" id="Japan">
                        <label class="form-check-label" for="Japan">
                            Japan
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="countryCodes" value="TR" id="Turkey">
                        <label class="form-check-label" for="Turkey">
                            Turkey
                        </label>
                    </div>

                </div>


                <button type="button" class="btn btn-primary" @click="fetchShows()">Get Shows</button>

            </div>


            <div class="spinner-border" role="status" id="my-spinner">
                <span class="visually-hidden">Loading...</span>
            </div>


            <div class="my-div">
                <div class="my-div" id="my-div" :key="show.id" v-for="show in this.showInfo">
                    <ShowCard :id="show.id" :name="show.name" :type="show.type" :language="show.language" :genre="show.genre"
                        :status="show.status" :rating="show.rating" :image="show.image" :summary="show.summary" />
                </div>
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
            </div>
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
            episodes: [],
            showInfo: [],
            showName: [],
            distinctShows: []
        }
    },
    components: {
        ShowCard
    },
    methods: {
        showSpinner(){
            document.getElementById("my-spinner").style.display = "block"
            document.getElementById("error").style.display = "none"
        },
        hideSpinner(){
            document.getElementById("my-spinner").style.display = "none"
        },
        onError(){
            document.getElementById("my-spinner").style.display = "none"
            document.getElementById("error").style.display = "block"

        },

        async fetchShows() {
            this.showSpinner()
            this.showInfo = []

            let country = $(".my-checks input:checked").val();

            let today = new Date().toISOString().slice(0, 10)


            // Get all episodes streaming now
            await axios.get(this.store.showsURL+"/schedule?date="+today+"&country="+country)
            .then((response) => {
                this.episodes = response.data
            })
            .catch((response) => {
                this.hideSpinner()
            })


            // Extract Show information from Episodes
            for (let i = 0; i < this.episodes.length; i++){

                const index = this.distinctShows.indexOf(this.episodes[i]["show"]["id"]);

                if (index == -1) {
                    let imgURL = ""
                    if (this.episodes[i]["show"]["image"] != null && "medium" in this.episodes[i]["show"]["image"]){
                        imgURL = this.episodes[i]["show"]["image"]["medium"]
                    }
                    else{
                        imgURL = "https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg"
                    }
                
                    const data = {
                        "id": this.episodes[i]["show"]["id"],
                        "name": this.episodes[i]["show"]["name"],
                        "type": this.episodes[i]["show"]["type"],
                        "language": this.episodes[i]["show"]["language"],
                        "genre": this.episodes[i]["show"]["genres"].join(", "),
                        "status": this.episodes[i]["show"]["status"],
                        "rating": this.episodes[i]["show"]["rating"]["average"],
                        // "image": this.episodes[i]["show"]["image"]["medium"],
                        "image": imgURL,
                        "summary": this.episodes[i]["show"]["summary"]
                    }

                    this.showInfo = [...this.showInfo, data]
                    this.distinctShows = [...this.distinctShows, this.episodes[i]["show"]["id"]]
                }
            }

                this.hideSpinner()
        }

    },
    mounted() {
        this.hideSpinner()
    }
}

</script>

<style lang="scss">
    #my-spinner{
        margin: auto;
        margin-left: 60%;
        margin-bottom: 10px;
        
        @media (max-width: 1024px) {
            margin: auto;
            margin-bottom: 10px;
        }
    }


    .my-page{

        width: 75rem;

        .my-header{
            display: flex;
            justify-content: space-between;
            position: sticky;
            top: 5rem;

            h3{
                text-align: center;
                margin-top: 10%;
                font-weight: bold;
                margin-bottom: 25px;

                @media (max-width: 1024px) {
                    margin-top: 0;
                    margin-bottom: 5%;
                }
            }
            @media (max-width: 1024px) {
                position: relative;
                top: 0;
            }
        }


        .my-checks{
            float:left;
            width: 20%;
            position: sticky;
            top: 7.5rem;

            margin-right: 10%;
            border-right: 1px solid grey;
            height: 80%;

            h4{
                margin-bottom: 15px;
            }

            .my-flex-div{
                display: flex;
                flex-wrap: wrap;

                .form-check{
                    margin: 5px;
                }

                @media (min-width: 720px) {
                    flex-direction: column;
                }
            }

            button{
                margin-top: 25px;
                max-width: 150px;
                @media (max-width: 720px) {
                    margin-bottom: 10px;
                }

            }

            @media (max-width: 720px) {
                min-width: 100%;
                border-bottom: 1px solid grey;
                float: none;
                width: auto;
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                border-right: 0;
                margin-bottom: 25px;
                position: relative;
                top: 0;
            }

        }

        .my-div{
            display: flex;
            flex-direction: column;
            margin-right: 5%;
            margin-bottom: 25px;

            @media (max-width: 720px) {
                margin: 0;
                margin-bottom: 25px;
            }
        }

        .error{
            display: none;
            width: auto;
            margin: auto;
        }
        
        @media (max-width: 720px) {
            width: 100%;
        }

    }
</style>