.<template>
  <div class="main-personajes">
    <h1 class="titulo">Characters Rick and Morty</h1>
    <va-button flat class="mr-4 mb-2" @click="abrirModal">
      <va-icon class="mr 1" name="filter_alt" color="" />
      <!--materialdesignicons o fontawesone icons -->
    </va-button>

    <div class="contenedor">
      <va-card
        class="tarjeta"
        v-for="(personaje, index) in personajes"
        :key="index"
      >
        <va-image :src="personaje.image" style="height: 200px" />
        <va-card-title>{{ personaje.name }}</va-card-title>
        <va-card-content>
          {{ personaje.species }} -
          <va-badge overlap dot :color="estatus[`${personaje.status}`]">
            {{ personaje.status }}
          </va-badge>
        </va-card-content>
      </va-card>
      <!-- <div class="tarjeta" v-for="(personaje, index) in personajes" :key="index" >
        <h3>{{ personaje.id }}</h3>
        <h1>{{ personaje.name }}</h1>
        <h2>{{ personaje.specie }}</h2>
        <img :src="personaje.image" alt="" />
      </div> -->
    </div>
    <modal-personajes
      @_realizarBusqueda="realizarBusqueda"
      @_cerrarModal="cerrarModal"
      v-if="verModal"
    />
  </div>
</template>

<script>
import ModalPersonajes from "@/components/characters/ModalPersonajes.vue";
export default {
  data() {
    return {
      verModal: false,
      personajes: [],
      estatus: { Alive: "#ad0", Dead: "danger", unknown: "warning" },
      filtros: {
        name: "",
        status: "",
        species: "",
        type: "",
        gender: "",
      },
    };
  },
  methods: {
    getData() {
      //pasar peticion con parametros
      const parameters = new URLSearchParams
      parameters.append("name",this.filtros.name)
      parameters.append("status",this.filtros.status)
      parameters.append("species",this.filtros.species)
      parameters.append("type",this.filtros.type)
      parameters.append("gender",this.filtros.gender)
      //axios accede al endpoind de la api y nos trae eso como response (consumimos api)
      this.axios({
        method: "get",
        url: "https://rickandmortyapi.com/api/character",
        params: parameters,
      }).then((response) => {
        this.personajes = response.data.results; //guardamos lo que axios nos trae de la api en personajes
        // results
        //console.log(response.data);
      });
    },
    abrirModal() {
      this.verModal = true;
    },
    cerrarModal(data) {
      this.verModal = data;
    },
    realizarBusqueda(data) {
      //console.log(data);
      this.verModal = false;
      //optimizar con for
      this.filtros.name = data[0];
      this.filtros.status = data[1];
      this.filtros.species = data[2];
      this.filtros.type = data[3];
      this.filtros.gender = data[4];
      this.getData()
    },
  },
  mounted() {
    this.getData();
  },
  components: { ModalPersonajes },
};
</script>

<style scoped>
.titulo {
  color: rgba(37, 97, 153, 0.849);
  font-size: 1.5rem;
  margin: 15px;
}

.tarjeta {
  border: 1px solid gray;
  margin: 20px;
  width: 11%;
  border-color: rgb(58, 211, 96);
  border-width: 2px;
}

.main-personajes {
  width: 95vw;
  margin: auto;
}

.contenedor {
  /* margin: 30px auto; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>