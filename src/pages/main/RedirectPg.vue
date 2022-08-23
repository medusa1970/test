<template>
  <div class="row q-pa-md justify-center">
    <div
      class="col-xs-10 col-sm-6 col-md-5 col-lg-3 col-xl-2 column items-center"
    >
      <q-btn
        rounded
        glossy
        color="amber-9"
        size="lg"
        label="Cliente Sii-Pi"
        class="q-mt-xl"
        icon="shopping_cart"
        @click="$router.push('/')"
      />
      <q-btn
        rounded
        glossy
        color="green-14"
        size="lg"
        label="colaborador Sii-Pi"
        icon="miscellaneous_services"
        class="q-mt-lg"
        @click="$router.push(`/${authStore.loggedIn.type}`)"
      />
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useAuthStore } from "stores/auth-store";

export default {
  data() {
    const $q = useQuasar();
    const router = useRouter();
    const authStore = useAuthStore();

    return {
      authStore,
      router,
    };
  },
};
</script>
