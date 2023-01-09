<template>
  <v-app-bar class="">
    <div class="d-flex justify-space-between w-100 h-100 align-center">
      <router-link to="/" class="logo mx-4">
        <img src="/nuuls-logo.png" class="logo">
      </router-link>
      <div class="d-flex justify-space-between">
        <router-link v-if="!username" class="invis-link" to="/signup">
          <v-btn>
            Sign up
          </v-btn>
        </router-link>
        <router-link v-if="!username" class="invis-link" to="/login">
          <v-btn>
            Login
          </v-btn>
        </router-link>
        <router-link to="/profile" class="invis-link mx-4">
            <v-btn v-if="username" class="justify-self-right">
              {{ username }}
            </v-btn>
        </router-link>
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped>
.invis-link {
  text-decoration: none;
  color: inherit;
}
.logo {
  height: 64px;
}
</style>

<script lang="ts">
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
  }
}
</script>
