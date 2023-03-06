<template>
  <div class="container">
    <div class="modal">
      <button @click="closeModal()" class="close-btn">
        <font-awesome-icon icon="fa-solid fa-x" class="fa-xl" />
      </button>
      <h2>{{ game.title }}</h2>

      <div class="game-info">
        <div class="info-item">
          <p class="info-title">Desenvolvedora:</p>
          <p>{{ game.developer }}</p>
        </div>
        <div class="info-item">
          <p class="info-title">Ano de lançamento:</p>
          <p>{{ game.releaseYear }}</p>
        </div>
        <div class="info-item">
          <p class="info-title">Gênero:</p>
          <p>{{ game.genre }}</p>
        </div>
        <div class="info-item">
          <p class="info-title">Possui multiplayer?</p>
          <p>{{ game.hasMultiplayer }}</p>
        </div>
        <div class="info-item">
          <p class="info-title">Protagonista:</p>
          <p>{{ game.protagonist }}</p>
        </div>
        <div class="info-item">
          <p class="info-title">É competitivo?</p>
          <p>{{ game.isCompetitive }}</p>
        </div>
        <div class="info-item">
          <p class="info-title">Plataformas:</p>
          <p>{{ game.platforms }}</p>
        </div>
        <div class="info-item">
          <p class="info-title">Faixa etária:</p>
          <p>{{ game.ageRating }}</p>
        </div>
        <div class="info-item">
          <p class="info-title">Nota:</p>
          <p>{{ game.rating }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameModal",

  props: {
    game: {
      type: String,
      require: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  }
};
</script>

<style>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background-color: white;
  max-width: 80%;
  width: 100%;
  padding: 2rem;
  max-height: 50%;
  border: 1px solid #42b983;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  overflow: scroll;
}
.game-info {
  display: flex;
  flex-wrap: wrap;
  column-gap: 5rem;
  justify-content: center;
}
.info-title {
  font-weight: 700;
}
.close-btn {
  width: fit-content;
  line-height: 0;
  padding: .3rem;
  position: absolute;
  right: 2rem;
  cursor: pointer;
  background-color: transparent;
  border: 0;
}

.close-btn:hover {
  color: #42b983;
}
</style>
