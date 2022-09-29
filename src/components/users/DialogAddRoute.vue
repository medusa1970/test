<template>
  <q-dialog v-model="dialog" persistent>
    <q-card flat bordered style="width: 500px; min-height: 100px">
      <q-card-section class="row">
        <h6 class="text-h6 q-ma-none">
          <q-icon name="people_alt" color="blue-grey-8" size="1.3em" class="q-mr-xs" />
          Acceso a rutas
        </h6>
      </q-card-section>
      <q-separator />

      <q-card-section class="q-ma-none q-pb-none">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="name"
            label="Nombre de la ruta (Programador) *"
            hint="Mínimo 3, Máximo 30 caracteres"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 2) || 'Mínimo 6 caracteres',
              (val) => val.length < 31 || 'Máximo 30 caracteres',
            ]"
          />
          <q-input
            filled
            v-model="description"
            label="Descripción de de la acción de la ruta *"
            hint="Mínimo 10, Máximo 50 caracteres"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 9) || 'Mínimo 11 caracteres',
              (val) => val.length < 51 || 'Máximo 50 caracteres',
            ]"
          />
          <q-separator />
          <q-btn
            color="orange"
            label="Agregar"
            glossy
            class="q-mr-sm"
            @click="myFunction"
          />
          <q-btn
            color="grey-6"
            label="Cancelar"
            type="reset"
            glossy
            @click="cancelEvent"
          />
          <q-btn color="grey-6" label="Reset" type="reset" glossy />
        </q-form>
      </q-card-section>

      <q-separator class="q-mt-md" />
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "DialogAddRoute",
  emits: ["cancelEvent"],
  setup(props, { emit }) {
    const name = ref("");
    const description = ref("");
    //declare const Function onReset()
    const onReset = () => {
      name.value = "";
      description.value = "";
    };

    return {
      name,
      description,
      onReset,

      myFunction() {
        emit("addRoute", {
          name: name.value,
          description: description.value,
        });
        onReset();
        emit("cancelEvent");
      },

      cancelEvent() {
        onReset();
        emit("cancelEvent");
      },
    };
  },
});
</script>
