<template>
  <transition>
    <div class="mascara-modal">
      <div class="envoltura-modal">
        <div class="tarjeta-modal">
          <h1 class="titulo-modal">Filter Characters</h1>
          <va-form class="modal-form" @submit.prevent="hacerBusqueda" tag="form">
            <va-input label="Name" v-model="namer" />
            <va-select
              class="mt-3"
              label="Status"
              v-model="valueStatus"
              :options="optionsStatus"
              clearable
            />
            <va-input class="mt-3" label="Specie" v-model="specie" />
            <va-input class="mt-3" label="Type" v-model="type" />
            <va-select
              class="mt-3"
              label="Gender"
              v-model="valueGender"
              :options="optionsGender"
              clearable
            />
            <va-button type="submit" class="mt-3"> Search </va-button>
          </va-form>
        </div>
        <div class="close-modal" @click="cerrarModal"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      namer: "",
      valueStatus: "",
      specie: "",
      type: "", 
      valueGender: "",
      optionsStatus: ["Alive", "Dead", "Unknown"],
      optionsGender: ["Female", "Male", "Genderless", "Unknown"],
    };
  },
  methods: {
    cerrarModal() {
      this.$emit("_cerrarModal", false);
    },
    //Pasar parametros al componente padre
    hacerBusqueda() {
      this.$emit("_realizarBusqueda", [this.namer, this.valueStatus, this.specie, this.type, this.valueGender]);
    },
  },
};
</script>

<style scoped>
.mascara-modal {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #00000085;
  transition: opacity 0.3 ease;
  overflow-y: auto;
  overflow-x: hidden;
}
.envoltura-modal {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 150;
}
.tarjeta-modal {
  min-width: 50%;
  max-width: 90%;
  padding: 15px;
  background-color: #efebe6d8;
  border-radius: 5px;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
}
.close-modal {
  width: 100vw;
  height: 100vh;
}

.titulo-modal {
  font-size: 1.8rem;
}

.modal-form {
  width: 70%;
  margin: 20px auto;
}
</style>