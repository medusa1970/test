<template>
  <q-dialog v-model="dialog" persistent>
    <q-card flat bordered style="width: 500px; min-height: 100px">
      <q-card-section class="row">
        <h6 class="text-h6 q-ma-none">
          <q-icon name="people_alt" color="blue-grey-8" size="1.3em" class="q-mr-xs" />
          Nuevo Punto Sii-Pi
        </h6>
      </q-card-section>
      <q-separator />

      <q-card-section class="q-ma-none q-pb-none">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="name"
            label="Nombre nuevo punto Sii-Pi *"
            hint="Mínimo 5, Máximo 30 caracteres"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 4) || 'Mínimo 6 caracteres',
              (val) => val.length < 31 || 'Máximo 30 caracteres',
            ]"
          />
          <q-input
            filled
            v-model="abbreviation"
            label="Abreviación del Nombre *"
            hint="Mínimo 2, Máximo 5 caracteres"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 1) || 'Mínimo 2 caracteres',
              (val) => val.length < 6 || 'Máximo 5 caracteres',
            ]"
          />
          <q-input
            filled
            v-model="address"
            label="Ubicación del Punto *"
            hint="Mínimo 4, Máximo 50 caracteres"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 3) || 'Mínimo 4 caracteres',
              (val) => val.length < 51 || 'Máximo 50 caracteres',
            ]"
          />
          <q-input
            filled
            type="number"
            v-model="phone"
            label="Numero de teléfono *"
            hint="Mínimo 7, Máximo 8 dígitos"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Ingrese un número de teléfono',
              (val) => (val > 20000000 && val < 89999999) || 'Ingrese un número válido',
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
  name: "PositionAdd",
  emits: ["cancelEvent"],
  setup(props, { emit }) {
    const name = ref("");
    const abbreviation = ref("");
    const address = ref("");
    const phone = ref("");

    //declare const Function onReset()
    const onReset = () => {
      name.value = "";
      abbreviation.value = "";
      address.value = "";
      phone.value = "";
    };

    return {
      name,
      abbreviation,
      address,
      phone,
      onReset,

      myFunction() {
        emit("addPoint", {
          name: name.value,
          abbreviation: abbreviation.value,
          address: address.value,
          phone: phone.value,
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
