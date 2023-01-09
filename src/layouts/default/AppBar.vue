<template>
  <v-app-bar flat>
    <v-app-bar-title @click="goToMain()">
      i.nuuls.com
    </v-app-bar-title>
    <v-btn v-if="!username" @click="goToSignup()">
      Login / Signup
    </v-btn>
    <v-btn v-if="username" class="justify-self-right" @click="goToProfile()">
      {{ username }}
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import router from '@/router';
import { useAppStore } from '@/store/app';
import { computed } from 'vue';

export default {
  data: () => {
    const appStore = useAppStore();
    return {
      appStore,
      username: computed(() => appStore.account?.username),
    }
  },
  async mounted() {
      await this.appStore.fetchLoggedInUser()
  },
  methods: {
    async fakeLogin() {
      await this.appStore.login()
    },
    goToSignup() {
      router.push('/auth')
    },
    goToProfile() {
      router.push('/profile')
    },
    goToMain() {
      router.push('/')
    }
  }
}
</script>
