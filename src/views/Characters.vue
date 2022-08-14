<template>
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
        :bordered="false"
        @click="abrirModalPersonaje(personaje)"
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
    <va-pagination
      class="paginacion"
      color="success"
      v-model="page"
      :pages="info.pages"
      :visible-pages="5"
      @click="getData()"
    />
    <modal-personajes
      @_realizarBusqueda="realizarBusqueda"
      @_cerrarModal="cerrarModal"
      v-if="verModal"
    />

    <va-modal v-model="verModalPersonaje" no-padding size="small">
      <template #content="{ ok }">
        <va-image :ratio="1" :src="dataModalPersonaje.image" />
        <va-card-title> {{ dataModalPersonaje.name }} </va-card-title>
        <va-card-content>
          <va-accordion
            class="modal-accordion"
            v-model="despliegues"
            style="width: 400px"
            inset
          >
            <va-collapse :header="encabezados.title1">
              <p class="content-collapse"><strong>Status: </strong>{{ dataModalPersonaje.status }}</p>
              <p class="content-collapse"><Strong>Species: </Strong>{{ dataModalPersonaje.species }}</p>
              <p class="content-collapse"><Strong>Type: </Strong>{{ dataModalPersonaje.type }}</p>
              <p class="content-collapse"><strong>Gender: </strong>{{ dataModalPersonaje.gender }}</p>
            </va-collapse>
            <va-collapse :header="encabezados.title2">
              <p class="content-collapse" v-for="(nombre, i) in episodiosPersonajes" :key="i">
                {{ nombre }}
              </p>
            </va-collapse>
          </va-accordion>
        </va-card-content>
        <va-card-actions>
          <va-button @click="ok" color="warning">Ok!</va-button>
        </va-card-actions>
      </template>
    </va-modal>
  </div>
</template>

<script>
import ModalPersonajes from "@/components/characters/ModalPersonajes.vue";
export default {
  data() {
    return {
      verModal: false,
      verModalPersonaje: false,
      dataModalPersonaje: {},
      personajes: [],
      episodiosPersonajes: [],
      estatus: { Alive: "#ad0", Dead: "danger", unknown: "warning" },
      filtros: {
        name: "",
        status: "",
        species: "",
        type: "",
        gender: "",
      },
      page: 1,
      info: [],
      despliegues: [false, false, false],
      //encabezados: [title1: "Episodes", title2: "2", title3: "3"]
      encabezados: {
        title1: "Info",
        title2: "Episodes",
      },
    };
  },
  methods: {
    getData() {
      //pasar peticion con parametros
      const parameters = new URLSearchParams();
      parameters.append("name", this.filtros.name);
      parameters.append("status", this.filtros.status);
      parameters.append("species", this.filtros.species);
      parameters.append("type", this.filtros.type);
      parameters.append("gender", this.filtros.gender);
      parameters.append("page", this.page);
      //axios accede al endpoind de la api y nos trae eso como response (consumimos api)
      this.axios({
        method: "get",
        url: "https://rickandmortyapi.com/api/character",
        params: parameters,
      }).then((response) => {
        this.personajes = response.data.results; //guardamos lo que axios nos trae de la api en personajes
        this.info = response.data.info;
        // results
        //console.log(response.data);
      });
    },
    getEpisode(episodes) {
      this.episodiosPersonajes = [];
      for (const e of episodes) {
        this.axios({
          method: "get",
          url: `${e}`,
        }).then((response) => {
          //console.log(response);
          this.episodiosPersonajes.push(response.data.name);
        });
      }
    },
    abrirModalPersonaje(personaje) {
      this.verModalPersonaje = true;
      //agregar atributos a un objeto
      //this.dataModalPersonaje[`name`] = personaje.name
      this.dataModalPersonaje = personaje;
      this.getEpisode(personaje.episode);
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
      this.getData();
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
  color: #2c82e0;
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

.tarjeta:hover{
  box-shadow: 8px 8px 20px rgba(14, 201, 11, 0.418);
  transform: translateY(-5%);
  transition: all 300ms ease;
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

.paginacion {
  margin: auto;
  padding: 20px 0;
}

.modal-accordion {
  margin: auto;
}

.content-collapse{
  color: #af940e;
  font-size: 1rem;
  padding: 5px 0;
}

</style>