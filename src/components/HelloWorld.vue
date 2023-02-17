<template>
  <div class="hello">
    <h1>Registro de jogos</h1>
    <div class="inputs">
      <input type="text" v-model="title" placeholder="Título" />
      <input
        type="text"
        v-model="releaseYear"
        placeholder="Ano de lançamento"
      />
      <input
        type="text"
        v-model="genre"
        placeholder="Gênero (ex.: Ação e Aventura)"
      />
      <input type="text" v-model="developer" placeholder="Desenvolvedora" />
      <input
        type="text"
        v-model="hasMultiplayer"
        placeholder="Tem multiplayer?"
      />
      <input type="text" v-model="protagonist" placeholder="Protagonista" />
      <input type="text" v-model="isCompetitive" placeholder="É competitivo?" />
      <input
        type="text"
        v-model="platforms"
        placeholder="Plataformas (ex.: PC, PS4, Xbox One)"
      />
      <input
        type="text"
        v-model="ageRating"
        placeholder="Faixa etária (ex.: 16+)"
      />
      <input type="text" v-model="rating" placeholder="Nota" />
    </div>
    <button class="send-btn" @click="postUser">Cadastrar</button>
    <ul>
      <li v-for="game in dataGames" :key="game.id">
        <button>
          {{ game.title }} ({{ game.developer }})
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",

  data() {
    return {
      dataGames: [],
      title: "",
      releaseYear: "",
      genre: "",
      developer: "",
      hasMultiplayer: "",
      protagonist: "",
      isCompetitive: "",
      platforms: "",
      ageRating: "",
      rating: "",
    };
  },
  methods: {
    postUser() {
      try {
        axios.post("http://localhost:8080/api/games", {
          title: this.title,
          releaseYear: this.releaseYear,
          genre: this.genre,
          developer: this.developer,
          hasMultiplayer: this.hasMultiplayer,
          protagonist: this.protagonist,
          isCompetitive: this.isCompetitive,
          platforms: this.platforms,
          ageRating: this.ageRating,
          rating: this.rating,
        });
        console.log("Jogo cadastrado com sucesso");
      } catch {
        console.log("deu ruim");
      } finally {
        this.getUsers();
      }
    },
    async getUsers() {
      try {
        const response = await axios.get("http://localhost:8080/api/games");
        this.dataGames = response.data.games;
        console.log(response);
      } catch {
        console.log("teste");
      }
    },
  },

  mounted() {
    this.getUsers();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  align-items: center;
}
.inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around;
}
input {
  width: 47%;
  padding: 8px;
}
h1 {
  margin-bottom: 2rem;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
}
li button {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  list-style: none;
  border: 1px solid transparent;
  margin: 0;
  background-color: #eeeeee;
  transition: .2s;
}

li button:hover {
  border: 1px solid #42b983;
  box-shadow: 0px 0px 10px #42b983;

}

a {
  color: #42b983;
}
.send-btn {
  margin-top: 2rem;
  width: fit-content;
  padding: 1rem 2rem;
  border: 0;
  border-radius: 10px;
  color: white;
  font-weight: 700;
  background-color: #42b983;
  transition: 0.2s;
}

.send-btn:hover {
  background-color: #80d3ae;
}
button {
  cursor: pointer;
}
</style>
