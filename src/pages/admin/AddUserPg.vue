<template>
  <div>
    <AddUser :="{ title: 'Agregar nuevo usuario' }" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AddUser from "components/users/AddUserComp.vue";
export default defineComponent({
  name: "AddUserPg",
  components: {
    AddUser,
  },
  setup() {
    return {};
  },
});
</script>
