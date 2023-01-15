<template>
  <v-app-bar class="">
    <div class="d-flex justify-space-between w-100 h-100 align-center">
      <router-link to="/" class="logo mx-4">
        <img src="/nuuls-logo.png" class="logo">
      </router-link>
      <div class="d-flex justify-space-between flex-wrap">
        <router-link v-if="!account" class="invis-link" to="/signup">
          <v-btn>
            Sign up
          </v-btn>
        </router-link>
        <router-link v-if="!account" class="invis-link" to="/login">
          <v-btn>
            Login
          </v-btn>
        </router-link>
        <router-link v-if="account" to="/settings" class="invis-link mx-2">
            <v-btn class="justify-self-right">
              <v-icon icon="mdi-wrench">
              </v-icon>
              <p class="mx-2 hidden-sm-and-down">Settings</p>
            </v-btn>
        </router-link>
        <router-link v-if="account" to="/profile" class="invis-link mx-2">
            <v-btn class="justify-self-right">
              <v-icon icon="mdi-account-circle">
              </v-icon>
              <p class="mx-2 hidden-sm-and-down">My Uploads</p>
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
import { Account } from '@/store/api/api';
import { useAppStore } from '@/store/app';

const appStore = useAppStore()

export default {
  data: () => {
    return {
      account: null as Account | null
    }
  },
  async mounted() {
    this.account = await (appStore.account.catch(() => Promise.resolve(null)))
  },
  methods: {
  }
}
</script>
