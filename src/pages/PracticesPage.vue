<template>
  <div class="q-ma-md row">
    <div class="q-gutter-md col-4">
      <div class="row justify-between">
        <h6 class="q-my-none col-6">Lista de compras</h6>
        <q-btn
          v-if="!editing"
          color="secondary"
          label="Add Item"
          @click="
            (editing = true),
              (modify = false),
              (newItem = ''),
              (price = ''),
              (high = false)
          "
          icon="shopping_cart"
          no-caps
        />
        <q-btn
          v-else
          color="orange"
          label="Finalizar"
          @click="editing = false"
          icon="block"
          no-caps
        />
      </div>
      <q-form v-if="editing" class="q-gutter-md q-mx-none" @submit="addItem">
        <q-input
          outlined
          label="Nuevo Item"
          v-model="newItem"
          :hint="characterCount + '/40 caracteres'"
        />
        <q-input outlined label="Precio" v-model="price" />
        <q-checkbox label="Checkbox" v-model="high" />
        <q-btn
          :disable="newItem.length < 3 || price.length < 1"
          type="submit"
          color="secondary"
          label="Agregar"
        />
      </q-form>
      <q-form
        v-if="modify"
        class="q-gutter-md q-mx-none"
        @submit="editItem(selectedItem)"
      >
        <q-input
          outlined
          label="Nuevo Item"
          v-model="newItem"
          :hint="characterCount + '/40 caracteres'"
        />
        <q-input outlined label="Precio" v-model="price" />
        <q-checkbox label="Checkbox" v-model="high" />
        <q-btn
          :disable="newItem.length < 3 || price.length < 1"
          type="submit"
          color="primary"
          label="Modificar"
        />
      </q-form>

      <q-list bordered separator v-if="items.length > 0">
        <q-item
          clickable
          v-for="(
            { id, name, price, priority, purchase }, index
          ) in reversedItems"
          :key="id"
        >
          <q-item-section
            @click="togglePurchase(reversedItems[index])"
            :class="{
              'text-secondary': priority,
              'text-strike text-blue-grey-3': purchase,
            }"
          >
            {{ index + 1 }}.- {{ name }} Bs. {{ price }}</q-item-section
          >
          <q-item-section side>
            <q-btn
              flat
              round
              color="secondary"
              icon="edit"
              @click="showEdit(reversedItems[index])"
            />
          </q-item-section>
          <q-item-section side>
            <q-btn
              flat
              round
              color="primary"
              icon="delete"
              @click="deleteItem(reversedItems[index])"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <div v-else><h6 class="q-my-none">No hay items en la lista</h6></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useQuasar, QSpinnerGears } from "quasar";
export default defineComponent({
  name: "PracticesPage",
  setup() {
    const $q = useQuasar();
    const selectedItem = ref(null);
    const modify = ref(false);
    const confirm = ref(false);
    const editing = ref(false);
    const newItem = ref("");
    const price = ref("");
    const high = ref(false);
    const characterCount = computed(() => newItem.value.length);
    const reversedItems = computed(() => {
      return [...items.value].reverse();
    });
    const items = ref([
      {
        id: 1,
        name: "Maracuya",
        price: "5",
        priority: true,
        purchase: false,
      },
      {
        id: 2,
        name: "Higo",
        price: "4",
        priority: false,
        purchase: true,
      },
      {
        id: 3,
        name: "Tembe",
        price: "7",
        priority: false,
        purchase: false,
      },
    ]);
    const addItem = () => {
      items.value.push({
        id: items.value.length + 1,
        name: newItem.value,
        price: price.value,
        priority: high.value,
      });
      newItem.value = "";
      price.value = "";
      high.value = false;
    };
    const deleteItem = (item) => {
      $q.dialog({
        title: "Eliminar Item",
        message: "Esta seguro de eliminar el item?",
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          items.value = items.value.filter((i) => i.id !== item.id);
          $q.notify({
            spinner: QSpinnerGears,
            message: "Se elimino correctamente...",
            timeout: 2000,
            color: "positive",
          });
        })
        .onCancel(() => {
          $q.notify({
            group: false,
            message: "No fue eliminado nada.",
            color: "purple",
          });
        });
    };

    const showEdit = (item) => {
      modify.value = true;
      editing.value = false;
      newItem.value = item.name;
      price.value = item.price;
      high.value = item.priority;
      selectedItem.value = item;
    };
    const editItem = (item) => {
      items.value[items.value.indexOf(item)] = {
        id: item.id,
        name: newItem.value,
        price: price.value,
        priority: high.value,
        purchase: item.purchase,
      };
    };

    const togglePurchase = (item) => {
      item.purchase = !item.purchase;
    };

    return {
      items,
      newItem,
      price,
      high,
      addItem,
      editing,
      togglePurchase,
      characterCount,
      reversedItems,
      deleteItem,
      showEdit,
      editItem,
      confirm,
      modify,
      selectedItem,
    };
  },
});
</script>
