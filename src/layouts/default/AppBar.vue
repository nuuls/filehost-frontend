<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <router-link to="/" class="invis-link">
        nuuls.com
      </router-link>
    </v-app-bar-title>
    <router-link v-if="!username" class="invis-link" to="/auth">
      <v-btn>
        Login / Signup
      </v-btn>
    </router-link>
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
