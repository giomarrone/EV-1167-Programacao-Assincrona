import { createServer, Model } from "miragejs";
import { createApp } from "vue";
import App from "./App.vue";

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faTrashCan, faEye, faPenToSquare, faX } from '@fortawesome/free-solid-svg-icons'

library.add(faTrashCan, faEye, faPenToSquare, faX)

createServer({
  models: {
    game: Model,
  },
  seeds(server) {
    server.create("game", {
      title: "Tomb Raider",
      releaseYear: "2013",
      genre: "Ação e Aventura",
      developer: "Square Enix",
      hasMultiplayer: "Não",
      protagonist: "Lara Croft",
      isCompetitive: "Não",
      platforms: "PC, Xbox 360, PS3",
      ageRating: "16",
      rating: "9",
    });
    server.create("game", {
      title: "Mortal Kombat 11",
      releaseYear: "2019",
      genre: "Luta",
      developer: "NetherRealm",
      hasMultiplayer: "Sim",
      protagonist: "Não tem",
      isCompetitive: "Sim",
      platforms: "PC, Xbox One, Xbox Series X/S, PS4, PS5",
      ageRating: "18",
      rating: "9",
    });
    server.create("game", {
      title: "Spyro: Reignited Trilogy",
      releaseYear: "2018",
      genre: "Família e Crianças",
      developer: "Insomniac",
      hasMultiplayer: "Não",
      protagonist: "Spyro",
      isCompetitive: "Não",
      platforms: "Nintendo Switch, PS4, Xbox One, Xbox Series X/S, PC",
      ageRating: "Livre",
      rating: "10",
    });
    server.create("game", {
      title: "Rise of The Tomb Raider",
      releaseYear: "2016",
      genre: "Ação e Aventura",
      developer: "Square Enix",
      hasMultiplayer: "Não",
      protagonist: "Lara Croft",
      isCompetitive: "Não",
      platforms: "PC, Xbox One, Xbox Series X/S, PS4, PS5",
      ageRating: "16",
      rating: "7",
    });
    server.create("game", {
      title: "LEGO Star Wars: The Skywalker Saga",
      releaseYear: "2022",
      genre: "Família e Crianças",
      developer: "TT Games",
      hasMultiplayer: "Sim",
      protagonist: "Não tem",
      isCompetitive: "Não",
      platforms: "PC, Xbox One, Xbox Series X/S , PS4, PS5",
      ageRating: "Livre",
      rating: "9",
    });
    server.create("game", {
      title: "The Last of Us Parte II",
      releaseYear: "2020",
      genre: "Ação",
      developer: "NaughtyDog",
      hasMultiplayer: "Não",
      protagonist: "Joel & Ellie",
      isCompetitive: "Não",
      platforms: "PC, PS4, PS5",
      ageRating: "18+",
      rating: "10",
    });
  },
  routes() {
    this.namespace = "api";

    this.get(
      "/games",
      (schema) => {
        return schema.games.all();
      },
      { timing: 2000 }
    );

    this.post("/games", (schema, request) => {
      let game = JSON.parse(request.requestBody);

      return schema.games.create(game);
    });

    this.delete("/games/:id", (schema, request) => {
      let id = request.params.id
      console.log(id)
    
      return schema.db.games.remove(id)
    })

    this.get(
      "/games/:id",
      (schema, request) => {
        let data = JSON.parse(request.requestBody);
        let id = request.params.id;
        let game = schema.games.find(id);

        return game.update(data);
      },
      { timing: 2000 }
    );
  },
});

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount("#app");
