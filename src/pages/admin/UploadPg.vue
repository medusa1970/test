<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-file v-model="file" filled label="Select poster image" />
      <q-input filled v-model="title" label="Title" />
      <q-input
        filled
        v-model="description"
        label="Description"
        name="description"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>

    <q-card v-if="submitEmpty" flat bordered class="q-mt-md bg-grey-2">
      <q-card-section> Submitted form contains empty formData. </q-card-section>
    </q-card>
    <q-card
      v-else-if="submitResult.length > 0"
      flat
      bordered
      class="q-mt-md bg-grey-2"
    >
      <q-card-section
        >Submitted form contains the following formData (key =
        value):</q-card-section
      >
      <q-separator />
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >
          {{ item.name }} = {{ item.value }}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";

export default {
  setup() {
    const submitEmpty = ref(false);
    const submitResult = ref([]);
    const file = ref(null);
    const title = ref("");
    const description = ref("");

    return {
      file,
      title,
      description,
      submitEmpty,
      submitResult,

      async onSubmit(evt) {
        evt.preventDefault();
        const formData = new FormData();
        formData.append("file", file.value);
        formData.append("title", title.value);
        formData.append("description", description.value);
        await api
          .post("/api/auth/upload", formData)
          .then((res) => {
            console.log(res);
            submitResult.value = res.data;
            submitEmpty.value = false;
          })
          .catch((err) => {
            submitEmpty.value = true;
          });
      },
    };
  },
};
</script>
