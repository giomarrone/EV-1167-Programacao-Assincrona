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
      <input type="text" v-model="rating" placeholder="Nota (0-10)" />
    </div>
    <button class="send-btn" @click="validateForm">Cadastrar</button>
    <div v-if="loading">
      <p>Carregando jogos...</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="game in dataGames" :key="game.id">
          <button class="li-item">
            {{ game.title }} ({{ game.developer }})
            <div class="item-options">
              <button v-bind="game" @click="openModal(game)" class="item-btn">
                <font-awesome-icon icon="fa-solid fa-eye" />
              </button>
              <button class="item-btn">
                <font-awesome-icon icon="fa-solid fa-pen-to-square" />
              </button>
              <button v-bind="game" @click="deleteGame(game)" class="item-btn">
                <font-awesome-icon icon="fa-solid fa-trash-can" />
              </button>
            </div>
          </button>
        </li>
      </ul>
    </div>
    <GameModal
      id="modal"
      :game="currentGame"
      @closeModal="isModal = false"
      v-show="isModal"
    ></GameModal>
  </div>
</template>

<script>
import axios from "axios";
import GameModal from "../views/Modal.vue";
import GameServices from "../Services/gameServices";

export default {
  name: "HelloWorld",

  data() {
    return {
      loading: true,
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
      isModal: false,
      currentGame: "{}",
    };
  },

  components: {
    GameModal,
  },

  methods: {
    validateForm() {
      if (
        this.title.length == 0 ||
        this.releaseYear.length == 0 ||
        this.genre.length == 0 ||
        this.developer.length == 0 ||
        this.hasMultiplayer.length == 0 ||
        this.protagonist.length == 0 ||
        this.isCompetitive.length == 0 ||
        this.platforms.length == 0 ||
        this.ageRating.length == 0 ||
        this.rating.length == 0
      ) {
        alert("Por favor, preencha todos os campos.");
      } else if (this.rating > 10) {
        alert("A nota máxima para o jogo deve ser 10");
      } else {
        this.postUser();
      }
    },
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
        this.loading = true
        console.log("Jogo cadastrado com sucesso");
      } catch {
        console.log("deu ruim");
      } finally {
        this.getUsers();
      }
    },
    async getUsers() {
      try {
        const response = await GameServices.get();
        this.dataGames = response.data.games;
        this.loading = false
      } catch (error) {
        console.log(error);
      }
    },
    async deleteGame(game) {
      try {
        await GameServices.delete(game.id);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("fim");
        this.getUsers();
      }
    },
    openModal(game) {
      this.currentGame = game;
      this.isModal = true;
    },
    closeModal() {
      this.$emit("closeModal");
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
  flex-wrap: wrap;
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
  transition: 0.2s;
}

li button:hover {
  border: 1px solid #42b983;
  box-shadow: 0px 0px 10px #42b983;
  color: #42b983;
  background-color: white;
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

.item-options {
  display: flex;
  gap: 0.5rem;
}

.item-btn {
  width: fit-content;
  padding: 0.5rem;
  border-radius: 1rem;
  color: gray;
}
button {
  cursor: pointer;
}

.li-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
