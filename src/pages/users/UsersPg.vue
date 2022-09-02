<template>
  <div class="q-pa-md">
    <q-table
      title="Usuarios"
      :rows="userStore.Users"
      :columns="columns"
      no-data-label="No existen datos para mostrar"
      row-key="id"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <!-- BOTON PARA AGREGAR NUEVO USUARIO  -->
        <q-btn icon="add" color="primary" to="add-user" class="q-ml-lg" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-ma-none">
          <q-btn icon="edit" color="primary" flat round @click="myedit(props.row)" />
          <q-btn icon="delete" color="red" flat round @click="mydelete(props.row)" />
        </q-td>
      </template>
      <template></template>
    </q-table>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import { useUserStore } from "stores/user-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const columns = [
  {
    name: "first_name",
    required: true,
    label: "Nombre(s)",
    align: "left",
    field: (row) => row.first_name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "last_name",
    align: "left",
    label: "Apellido(s)",
    field: (row) => row.last_name,
    sortable: true,
  },
  {
    name: "username",
    label: "Usuario",
    field: "username",
    align: "left",
    sortable: true,
  },
  { name: "type", label: "Tipo", field: "type", align: "left", sortable: true },
  {
    name: "state",
    label: "Estado",
    field: "state",
    align: "left",
    sortable: true,
  },
  {
    name: "actions",
    label: "Acciones",
    align: "right",
    sortable: false,
  },
];

export default defineComponent({
  name: "UsersPg",

  setup() {
    const $q = useQuasar();
    const rows = ref([]);
    const userStore = useUserStore();
    const router = useRouter();

    onMounted(async () => {
      await userStore.users();
    });

    return {
      filter: ref(""),
      columns,
      rows,
      userStore,
      router,

      myedit(row) {
        userStore.editUser(row._id);
        router.push("edit-user");
      },
      mydelete(row) {
        $q.dialog({
          title: "Confirm",
          message: `${row.first_name.toUpperCase()} ${row.last_name.toUpperCase()} sera eliminada, esta seguro?`,
          cancel: true,
          persistent: true,
        })
          .onOk(() => {
            userStore.deleteUser(row._id);
            router.push("users");
          })
          .onOk(() => {
            // console.log('>>>> second OK catcher')
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      },
    };
  },
});
</script>
