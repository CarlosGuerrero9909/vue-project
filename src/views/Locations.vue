<template>
  <div class="main-locations">
    <h1 class="titulo">Locations Rick and Morty</h1>
    <va-button flat class="mr-4 mb-2" @click="abrirModal">
      <va-icon class="mr 1" name="filter_alt" color="" />
      <!--materialdesignicons o fontawesone icons -->
    </va-button>
    <div class="contenedor">
      <va-card
        stripe
        stripe-color="success"
        class="tarjeta"
        v-for="(location, index) in locations"
        :key="index"
        @click="abrirModalLocation(location)"
      >
        <va-card-title>{{ location.name }}</va-card-title>
        <va-card-content>{{ location.type }}</va-card-content>
        <va-badge
          v-if="location.dimension === 'unknown'"
          class="mr-4"
          transparent
          overlap
          text="!"
          color="warning"
        >
          Dimension: {{ location.dimension }}
        </va-badge>
        <va-badge v-else overlap dot color="#ad0">
          Dimension: {{ location.dimension }}
        </va-badge>
      </va-card>
    </div>
    <va-pagination
      class="paginacion"
      color="success"
      v-model="page"
      :pages="info.pages"
      :visible-pages="5"
      @click="getData()"
    />
    <modal-locations
      @_realizarBusquedaLocations="realizarBusquedaLocations"
      @_cerrarModal="cerrarModal"
      v-if="verModal"
    />
    <va-modal 
      v-model="verModalLocation"
      :title="dataModalLocation.name" 
    >
      <va-collapse header="Info">
        <p class="content-collapse"><strong>Name: </strong>{{ dataModalLocation.name }}</p>
        <p class="content-collapse"><Strong>Type: </Strong>{{ dataModalLocation.type }}</p>
        <p class="content-collapse"><Strong>Dimension: </Strong>{{ dataModalLocation.dimension }}</p>
      </va-collapse>
      <va-collapse header="Residents">
        <!-- <div class="content-collapse" v-for="(resident, i) in personajesLocation" :key="i">
          <img :src="resident" alt="">
        </div> -->
        <p class="content-collapse" v-for="(resident, i) in personajesLocation" :key="i">
                    {{ resident }}
        </p>
      </va-collapse>
    </va-modal>
  </div>
</template>


<script>
import ModalLocations from "@/components/locations/ModalLocations.vue";
export default {
  data() {
    return {
      verModal: false,
      locations: [],
      filtros: {
        name: "",
        type: "",
        dimension: "",
      },
      page: 1,
      info: [],
      verModalLocation: false,
      dataModalLocation: {},
      personajesLocation: [],
    };
  },
  methods: {
    getData() {
      const parameters = new URLSearchParams
      parameters.append("name", this.filtros.name)
      parameters.append("type", this.filtros.type)
      parameters.append("dimension", this.filtros.dimension)
      parameters.append("page", this.page);
      this.axios({
        method: "get",
        url: "https://rickandmortyapi.com/api/location",
        params: parameters,
      }).then((response) => {
          this.locations = response.data.results;
          this.info = response.data.info;
        });
    },
    abrirModal() {
      this.verModal = true;
    },
    cerrarModal(data) {
      this.verModal = data;
    },
    abrirModalLocation(location) {
      this.verModalLocation = true;
      this.dataModalLocation = location;
      this.getPersonaje(location.residents)
    },
    getPersonaje(personajes){
      this.personajesLocation = [];
      for(const p of personajes){
        this.axios({
          method: "get",
          url: `${p}`,
        }).then((response) => {
          //console.log(response);
          this.personajesLocation.push(response.data.name);
        });
      }
    },
    realizarBusquedaLocations(data) {
      //console.log(data)
      this.verModal = false;
      this.filtros.name = data[0];
      this.filtros.type = data[1];
      this.filtros.dimension = data[2];
      this.getData()
    },
  },
  mounted() {
    this.getData();
  },
  components: { ModalLocations },
};
</script>


<style scoped>
.titulo {
  color: #2c82e0;
  font-size: 1.5rem;
  margin: 15px;
}

.main-personajes {
  width: 95vw;
  margin: auto;
}

.contenedor {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.tarjeta {
  border: 1px solid gray;
  margin: 20px;
  width: 20%;
  border-color: #2a93bd;
  border-width: 1px;
}

.tarjeta:hover{
  box-shadow: 8px 8px 20px rgba(14, 201, 11, 0.418);
  transform: translateY(-5%);
  transition: all 300ms ease;
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
</style>
