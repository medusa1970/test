<template>
  <div class="q-pa-md">
    <q-table
      title="Usuarios"
      :rows="rows"
      :columns="columns"
      no-data-label="No existen datos para mostrar"
      row-key="id"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn icon="add" color="primary" to="add-user" class="q-ml-lg" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-ma-none">
          <q-btn
            icon="edit"
            color="primary"
            flat
            round
            @click="myedit(props.row)"
          />
          <q-btn
            icon="delete"
            color="red"
            flat
            round
            @click="mydelete(props.row._id)"
          />
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
import { api } from "boot/axios";

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
    const rows = ref([]);
    const userStore = useUserStore();
    const router = useRouter();

    onMounted(async () => {
      await userStore.users();
      rows.value = userStore.Users;
    });

    return {
      filter: ref(""),
      columns,
      rows,
      userStore,
      router,
      myedit(row) {
        router.push("/admin/" + row._id);
      },
      mydelete(row) {
        console.log(row);
      },
    };
  },
});
</script>
