<template>
  <div class="row">
    <div>
      <div class="self-center">
        <q-btn
          round
          color="deep-orange"
          icon="add"
          size="md"
          @click="dialog = true"
        />
      </div>
    </div>
    <!-- quiero poner un tamaño fijo al dialog -->

    <q-dialog v-model="dialog" persistent>
      <q-card flat bordered style="width: 500px; min-height: 100px">
        <q-card-section class="row">
          <h6 class="text-h6 q-ma-none">
            <q-icon
              name="people_alt"
              color="blue-grey-8"
              size="1.3em"
              class="q-mr-xs"
            />
            Agregar tipo de usuario
          </h6>
        </q-card-section>
        <q-separator />

        <q-card-section class="q-ma-none q-pb-none">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="name"
              label="Your name *"
              hint="Name and surname"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />

            <q-input
              filled
              type="number"
              v-model="age"
              label="Your age *"
              lazy-rules
              :rules="[
                (val) => (val !== null && val !== '') || 'Please type your age',
                (val) => (val > 0 && val < 100) || 'Please type a real age',
              ]"
            />
          </q-form>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-btn color="green-14" label="Agregar" glossy class="q-mr-sm" />
          <q-btn color="orange-14" label="Cancelar" glossy />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useRoleStore } from "stores/RoleStore";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const roleStore = useRoleStore();
    const newItem = ref("");
    const icon = ref("");

    return {
      lorem: "Lorem ipsum dolor sit amet.",
      dialog: ref(false),
    };
  },
});
</script>
