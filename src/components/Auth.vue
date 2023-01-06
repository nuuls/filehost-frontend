<template>
  <v-container class="d-flex flex-row justify-center align-center h-screen">
    <v-form class="auth-form" ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="username" label="Username" required></v-text-field>
      <v-text-field v-model="password" label="Password" required></v-text-field>
      <v-container class="d-flex w-100 justify-space-around">
        <v-btn @click="login()">
          Login
        </v-btn>
        <v-btn @click="signup()">
          Sign up
        </v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script lang="ts">

export default {
  data: () => {
    return {
      valid: true,
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      console.log('logging in XD')
    },
    signup() {
      console.log('signing up XD')
    },
  }
}

</script>

<style scoped>
.auth-form {
  max-width: 400px;
  width: 90%;
}
</style>
