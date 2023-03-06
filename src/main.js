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
      developer: "SquareEnix",
      hasMultiplayer: "Não",
      protagonist: "Lara Croft",
      isCompetitive: "Não",
      platforms: "PC, Xbox 360, PS3",
      ageRating: "16",
      rating: "9",
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
