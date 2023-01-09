<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <router-link to="/" class="invis-link">
        i.nuuls.com
      </router-link>
    </v-app-bar-title>
    <v-btn v-if="!username" @click="goToSignup()">
      Login / Signup
    </v-btn>
    <router-link to="/profile" class="invis-link">
      <v-btn v-if="username" class="justify-self-right">
        {{ username }}
      </v-btn>
    </router-link>
  </v-app-bar>
</template>

<style scoped>
.invis-link {
  text-decoration: none;
  color: inherit;
}
</style>

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
