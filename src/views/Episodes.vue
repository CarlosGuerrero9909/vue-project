<template>
  <div class="main-episodes">
    <h1 class="titulo">Episodes Rick and Morty</h1>
    <va-button flat class="mr-4 mb-2" @click="abrirModal">
      <va-icon class="mr 1" name="filter_alt" color="" />
    </va-button>
    <div class="contenedor">
      <div class="va-table-responsive">
        <table class="va-table va-table--hoverable">
          <thead>
            <tr class="va-table-reg">
              <th>Id</th>
              <th>Name</th>
              <th>Air date</th>
              <th>Episode</th>
            </tr>
          </thead>
          <tbody>
            <tr class="va-table-reg" v-for="episode in episodes" :key="episode.id" @click="abrirModalEpisode(episode)">
              <td>{{ episode.id }}</td>
              <td>{{ episode.name }}</td>
              <td>{{ episode.air_date }}</td>
              <td>
                <va-badge :text="episode.episode" color="success" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <va-pagination
      class="paginacion"
      color="success"
      v-model="page" 
      :pages="info.pages" 
      :visible-pages="3"
      @click="getData()"
    />
    <ModalEpisodes
      @_realizarBusquedaEpisodes="realizarBusquedaEpisodes"
      @_cerrarModal="cerrarModal"
      v-if="verModal"
    />
    <va-modal 
      v-model="verModalEpisode"
      :title="dataModalEpisode.name" 
    >
      <va-collapse header="Info">
        <p class="content-collapse"><strong>Name: </strong>{{ dataModalEpisode.name }}</p>
        <p class="content-collapse"><Strong>Type: </Strong>{{ dataModalEpisode.air_date }}</p>
        <p class="content-collapse"><Strong>Dimension: </Strong>{{ dataModalEpisode.episode }}</p>
      </va-collapse>
      <va-collapse header="Characters">
        <!-- <div class="content-collapse" v-for="(resident, i) in personajesLocation" :key="i">
          <img :src="resident" alt="">
        </div> -->
        <p class="content-collapse" v-for="(character, i) in personajesEpisode" :key="i">
                    {{ character }}
        </p>
      </va-collapse>
    </va-modal>
  </div>
</template>

<script>
import ModalEpisodes from "@/components/episodes/ModalEpisodes.vue";
export default {
  data() {
    return {
      episodes: [],
      page: 1,
      info: [],
      filtros: {
        name: "",
        episode: "",
      },
      verModal: false,
      verModalEpisode: false,
      dataModalEpisode: {},
      personajesEpisode: [],
    };
  },
  methods: {
    getData() {
      const parameters = new URLSearchParams
      parameters.append("name", this.filtros.name)
      parameters.append("episode", this.filtros.episode)
      parameters.append("page", this.page)
      this.axios({
        method: "get",
        url: "https://rickandmortyapi.com/api/episode",
        params: parameters,
      }).then((response) => {
          this.episodes = response.data.results;
          this.info = response.data.info;
        });
    },
    abrirModal() {
      this.verModal = true;
    },
    cerrarModal(data) {
      this.verModal = data;
    },
    abrirModalEpisode(episode) {
      this.verModalEpisode = true;
      this.dataModalEpisode = episode;
      this.getPersonaje(episode.characters)
    },
    getPersonaje(personajes){
      this.personajesEpisode = [];
      for(const p of personajes){
        this.axios({
          method: "get",
          url: `${p}`,
        }).then((response) => {
          //console.log(response);
          this.personajesEpisode.push(response.data.name);
        });
      }
    },
    realizarBusquedaEpisodes(data) {
      //console.log(data)
      this.verModal = false;
      this.filtros.name = data[0];
      this.filtros.episode = data[1];
      this.getData()
    },
  },
  mounted() {
    this.getData();
  },
  components: { ModalEpisodes },
};
</script>

<style scoped>
.titulo {
  color: #2c82e0;
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

.paginacion{
  margin: auto;
  padding: 20px 0;
}

.content-collapse{
  color: #2c82e0; 
  font-size: 1rem;
  padding: 5px 0;
  width: 300px;
}

.va-table-reg:hover{
  box-shadow: 4px 4px 4px rgba(14, 201, 11, 0.418);
  transform: translateY(-5%);
  transition: all 300ms ease;
}
</style>