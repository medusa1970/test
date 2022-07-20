<template>
  <div class="row q-pa-md justify-center">
    <div class="col-4">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <h6 class="q-mb-sm">Datos de acceso</h6>
        <q-input
          filled
          v-model="name"
          label="Ingresa tu nombre completo *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Ingresa tu nombre completo',
          ]"
        />
        <q-input
          filled
          v-model="phone"
          label="Ingresa tu numero de telefono *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Ingresa tu numero de telefono',
          ]"
        />
        <q-input
          filled
          v-model="email"
          label="Ingresa tu email *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Ingresa tu email']"
        />
        <q-input
          filled
          v-model="username"
          label="Ingresa tu usuario *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Ingresa tu usuario']"
        />
        <q-input
          filled
          type="password"
          v-model="password"
          label="Ingresa tu password *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Ingresa el password']"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
      <q-separator class="q-mt-lg" />
      <q-btn
        to="/myapp"
        icon="key"
        flat
        label="Ingresar"
        class="col-4 q-my-md"
      />
    </div>
  </div>
</template>
