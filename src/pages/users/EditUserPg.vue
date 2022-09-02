<template>
  <div>
    <div class="q-gutter-y-md">
      <q-tabs
        v-model="tab"
        inline-label
        class="bg-orange text-white shadow-2"
        align="left"
      >
        <q-tab name="data" label="Datos personales" icon="switch_account" />
        <q-tab
          name="role"
          label="Roles"
          icon="account_tree"
          v-if="Object.keys(userStore.newUser).length !== 0"
        />
        <q-tab name="observations" label="Observaciones" icon="event_note" />
        <q-tab name="references" label="Referencias" icon="support_agent" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="data">
          <user-data-put />
        </q-tab-panel>

        <q-tab-panel name="role">
          <user-role-add />
        </q-tab-panel>

        <q-tab-panel name="observations">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="references">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>
<script>
import { ref, defineComponent, onMounted } from "vue";
import UserDataPut from "src/components/users/UserDataPut.vue";
import UserRoleAdd from "src/components/users/UserRoleAdd.vue";
import { useUserStore } from "stores/user-store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AddUserPg",
  components: { UserDataPut, UserRoleAdd },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    onMounted(() => {
      if (Object.keys(userStore.newUser).length === 0) {
        router.push("/admin/users");
      }
    });

    return {
      tab: ref("data"),
      userStore,
      router,
    };
  },
});
</script>
