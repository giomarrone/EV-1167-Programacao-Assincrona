import { createServer, Model } from "miragejs";
import { createApp } from "vue";
import App from "./App.vue";

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
      rating: "4.8 / 5",
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

createApp(App).mount("#app");
