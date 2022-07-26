<template>
  <div class="main-episodes">
    <h1 class="titulo">Episodes Rick and Morty</h1>
    <div class="contenedor">
      <div class="va-table-responsive">
        <table class="va-table va-table--hoverable">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Air date</th>
              <th>Episode</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="episode in episodes" :key="episode.id">
              <td>{{ episode.id }}</td>
              <td>{{ episode.name }}</td>
              <td>{{ episode.air_date }}</td>
              <td>
                <va-badge :text="episode.episode" :color="episode.episode" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      episodes: [],
    };
  },
  methods: {
    getData() {
      this.axios
        .get("https://rickandmortyapi.com/api/episode")
        .then((response) => {
          this.episodes = response.data.results;
          console.log(response.data);
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
.titulo {
  color: rgba(37, 97, 153, 0.849);
  font-size: 1.5rem;
  margin: 15px;
}

.main-episodes {
  width: 95vw;
  margin: auto;
}

.contenedor {
  width: 100%;
  display: flex;
}

.va-table-responsive {
  overflow: auto;
  margin: auto;
}
</style>