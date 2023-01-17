<template>
  <v-container class="d-flex flex-row justify-center align-center h-100">
    <v-form class="auth-form" ref="form" :submit="submit" v-model="valid" lazy-validation>
      <v-text-field v-model="username" type="username" label="Username" required></v-text-field>
      <v-text-field v-model="password" type="password" label="Password" required></v-text-field>
      <v-text-field v-if="mode === 'signup'" v-model="passwordConfirm" type="password" label="Confirm Password" required></v-text-field>
      <input type="submit" hidden>
      <v-alert v-if="errorMessage" color="error" icon="$error">
        {{ errorMessage }}
      </v-alert>
      <v-container class="d-flex w-100 justify-space-around">
        <v-btn v-if="mode === 'login'" @click="submit()">
          Login
        </v-btn>
        <v-btn v-if="mode === 'signup'" @click="submit()">
          Sign up
        </v-btn>
      </v-container>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import router from '@/router'
import { APIError } from '@/store/api/api'
import { useAppStore } from '@/store/app'

export default {
  data: () => {
    const appStore = useAppStore()
    return {
      valid: true,
      username: '',
      password: '',
      passwordConfirm: '',
      errorMessage: '',
      appStore
    }
  },
  props: ['mode'],
  methods: {
    async submit() {
      try {
        if (this.mode === 'login') {
          await this.appStore.login(this.username, this.password)
          router.push('/')
          return
        }

        if (this.password !== this.passwordConfirm) {
          alert('Passwords do not match XD')
          return
        }

        await this.appStore.signup(this.username, this.password)
        router.push('/')
      } catch (err: APIError|any) {
        const message = err?.body?.message || 'An unexpected error occurred';
        this.errorMessage = message
        setTimeout(() => {
          // dont reset if another error occurred in the meanwhile
          if (this.errorMessage === message) {
            this.errorMessage = ''
          }
        }, 3000)
      }
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
