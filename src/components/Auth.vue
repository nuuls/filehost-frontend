<template>
  <v-container class="d-flex flex-row justify-center align-center h-100">
    <v-form class="auth-form" ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="username" type="username" label="Username" required></v-text-field>
      <v-text-field v-model="password" type="password" label="Password" required></v-text-field>
      <v-text-field v-if="mode === 'signup'" v-model="passwordConfirm" type="password" label="Confirm Password" required></v-text-field>
      <v-container class="d-flex w-100 justify-space-around">
        <v-btn v-if="mode === 'login'" @click="login()">
          Login
        </v-btn>
        <v-btn v-if="mode === 'signup'" @click="signup()">
          Sign up
        </v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import router from '@/router'
import { useAppStore } from '@/store/app'

export default {
  data: () => {
    const appStore = useAppStore()
    return {
      valid: true,
      username: '',
      password: '',
      passwordConfirm: '',
      appStore
    }
  },
  props: ['mode'],
  methods: {
    async login() {
      await this.appStore.login(this.username, this.password)
      router.push('/')
    },
    async signup() {
      if (this.password !== this.passwordConfirm) {
        alert('Passwords do not match XD')
        return
      }
      await this.appStore.signup(this.username, this.password)
      router.push('/')
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
