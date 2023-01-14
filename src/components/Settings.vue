<template>
  <v-container class="d-flex flex-column justify-center align-center h-100 flex-wrap settings-container">
    <v-container v-if="account">
      <h2 class="text-h4">Account Info</h2>
      <v-container class="flex-column">
        <div class="d-flex align-center">
          Username:
          <v-code class="ma-1">
            {{ account.username }}
          </v-code>
        </div>
        <div class="d-flex align-center">
          User ID:
          <v-code class="ma-1">
            {{ account.id }}
          </v-code>
        </div>
        <div class="d-flex align-center">
          API Key:
          <div class="ma-1">
            <v-btn v-if="!showApiKey" @click="showApiKey = true">
              Show API Key
            </v-btn>
            <v-code v-if="showApiKey">
              {{ account.apiKey }}
            </v-code>
          </div>
        </div>
      </v-container>
    </v-container>
    <v-container>
      <h2 class="text-h4">Domain settings</h2>
      <v-container class="flex-column" v-if="domain">
        <div class="d-flex align-center">
          Currently using:
          <v-code class="ma-1">
            {{ domain.domain }}
          </v-code>
        </div>
      </v-container>
    </v-container>
    <v-container>
      <h2 class="text-h4">Upload settings</h2>
      <v-container class="flex-column" v-if="account">
        <div class="d-flex align-center">
          Files expire after:
          <v-code class="ma-1">
            {{ humanDefaultExpiry }}
          </v-code>
        </div>
      </v-container>
    </v-container>
  </v-container>
</template>

<style scoped>
.settings-container {
  max-width: fit-content;
}
</style>

<script lang="ts">
import { Account, Domain } from '@/store/api/api';
import { useAppStore } from '@/store/app';
import { humanDuration } from '@/utils/utils'
const appStore = useAppStore();

export default {
  data: () => {
    return {
      showApiKey: false,
      account: null as Account | null,
      domain: null as Domain | null,
      humanDefaultExpiry: ''
    }
  },
  async mounted() {
    this.account = await appStore.account
    this.domain = await appStore.defaultDomain
    this.humanDefaultExpiry = humanDuration(this.account.defaultExpiryHours * 60 * 60)
  },
  methods: {
    nam() {}
  }
}
</script>
