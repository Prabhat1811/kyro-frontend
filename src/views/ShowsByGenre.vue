<template>
    <main style="padding: 0; margin: 0; height: 100vh;">

        <div class="my-page">
            <h3 class="my-header"><strong>Shows By Genre</strong></h3>

            <div class="my-checks">
                <h4>Genre</h4>

                <div class="my-flex-div">

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Drama" id="flexCheckChecked">
                        <label class="form-check-label" for="Drama">
                            Drama
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Action" id="flexCheckChecked">
                        <label class="form-check-label" for="Action">
                            Action
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Western" id="flexCheckChecked">
                        <label class="form-check-label" for="Western">
                            Western
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Music" id="flexCheckChecked">
                        <label class="form-check-label" for="Music">
                            Music
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Thriller" id="flexCheckChecked">
                        <label class="form-check-label" for="Thriller">
                            Thriller
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Science-Fiction" id="flexCheckChecked">
                        <label class="form-check-label" for="Science-Fiction">
                            Science-Fiction
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Horror" id="flexCheckChecked">
                        <label class="form-check-label" for="Horror">
                            Horror
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Romance" id="flexCheckChecked">
                        <label class="form-check-label" for="Romance">
                            Romance
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Mystery" id="flexCheckChecked">
                        <label class="form-check-label" for="Mystery">
                            Mystery
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Crime" id="flexCheckChecked">
                        <label class="form-check-label" for="Crime">
                            Crime
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Adventure" id="flexCheckChecked">
                        <label class="form-check-label" for="Adventure">
                            Adventure
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Comedy" id="flexCheckChecked">
                        <label class="form-check-label" for="Comedy">
                            Comedy
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Supernatural" id="flexCheckChecked">
                        <label class="form-check-label" for="Supernatural">
                            Supernatural
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Anime" id="flexCheckChecked">
                        <label class="form-check-label" for="Anime">
                            Anime
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Fantasy" id="flexCheckChecked">
                        <label class="form-check-label" for="Fantasy">
                            Fantasy 
                        </label>
                    </div>

                </div>


                <button type="button" class="btn btn-primary" @click="fetchShows()">Find Shows</button>

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
            showInfo: []
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
            // this.showSpinner()
            this.showInfo = []

            let genreSelected = []
            $('.my-checks input:checked').each(function() {
                genreSelected.push($(this).attr('value'))
            });

            if (genreSelected.length != 0){
                this.showSpinner()
            }
            
            for (let i = 1; i < this.store.totalShows; i++){

                await axios.get(this.store.showsURL+"/shows/"+i)
                .then((response) => {

                    if (response.data["status"] != "404" & response.data["genres"].some(r => genreSelected.indexOf(r) >= 0)){
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
                    }
                })
                .catch((response) => {

                })
            }
            this.hideSpinner()
        },
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