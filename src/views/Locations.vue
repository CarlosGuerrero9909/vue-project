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
    <modal-locations
      @_realizarBusquedaLocations="realizarBusquedaLocations"
      @_cerrarModal="cerrarModal"
      v-if="verModal"
    />
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
    };
  },
  methods: {
    getData() {
      const parameters = new URLSearchParams
      parameters.append("name", this.filtros.name)
      parameters.append("type", this.filtros.type)
      parameters.append("dimension", this.filtros.dimension)
      this.axios({
        method: "get",
        url: "https://rickandmortyapi.com/api/location",
        params: parameters,
      }).then((response) => {
          this.locations = response.data.results;
          //console.log(response.data);
        });
    },
    abrirModal() {
      this.verModal = true;
    },
    cerrarModal(data) {
      this.verModal = data;
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
  color: rgba(37, 97, 153, 0.849);
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
</style>
