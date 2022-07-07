<template>
  <div class="row">
    <div class="q-ma-lg col-6 q-gutter-md">
      <div class="row">
        <h6 class="col-9 q-my-none">Lista de materiales</h6>
        <q-btn
          v-if="!show"
          class="col-3"
          color="primary"
          label="Agregar lista"
          @click="show = true"
        />
        <q-btn
          v-else
          class="col-3"
          color="secondary"
          label="Cerrar"
          @click="show = false"
        />
      </div>
      <q-form v-if="show" class="q-gutter-md q-ml-none" @submit="addItem">
        <q-input label="Nuevo Articulo" outlined v-model="newArticle" />
        <q-select
          label="Materias"
          outlined
          v-model="matter"
          :options="subjects"
        />
        <q-input label="Precio" outlined v-model="price" />
        <q-input label="Cantidad" outlined v-model="amount" />
        <q-checkbox label="Importante" v-model="high" />
        <q-btn label="Agregar" color="primary" type="submit" />
      </q-form>
      <q-list bordered separator>
        <q-item
          clickable
          v-for="({ id, name, matter, price, amount, high }, index) in items"
          :key="id"
        >
          <q-item-section :class="{ 'text-secondary': high }"
            >{{ index + 1 }}.- {{ name }}-{{ matter }} Bs. {{ price }} Cant.
            {{ amount }}
            >
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const show = ref(false);
    const addItem = () => {
      items.value.push({
        id: items.value.length + 1,
        name: newArticle,
        matter: matter,
        price: price,
        amount: amount,
        high: high,
      });
      this.newArticle = "";
      this.price = "";
      this.amount = "";
      this.high = false;
    };
    const newArticle = ref("");
    const subjects = ref(["Matematicas", "Fisica", "Quimica"]);
    const price = ref("");
    const amount = ref("");
    const high = ref(false);
    const matter = ref("");
    const items = ref([
      {
        id: 1,
        name: "Matematicas",
        matter: "Matematicas",
        price: "10",
        high: false,
      },
      { id: 2, name: "Fisica", matter: "Fisica", price: "20", high: true },
      { id: 3, name: "Quimica", matter: "Quimica", price: "30", high: false },
    ]);
    return {
      show,
      newArticle,
      matter,
      subjects,
      price,
      amount,
      addItem,
      high,
      items,
    };
  },
});
</script>
