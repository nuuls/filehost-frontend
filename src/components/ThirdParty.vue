<template>
  <v-container class="d-flex flex-column flex-wrap justify-center w-100">
    <v-container class="d-flex justify-center flex-column">
      <h2 class="text-h4 text-center">
        ShareX
      </h2>
      <v-container class="d-flex justify-center">
        <p>
          Coming soon
        </p>
      </v-container>
    </v-container>
    <v-container>
      <h2 class="text-h4 text-center">
        Chatterino
      </h2>
      <v-container class="d-flex justify-center">
        <p>
          Coming soon
        </p>
      </v-container>
    </v-container>
    <v-container class="d-flex justify-center flex-column">
      <h2 class="text-h4 text-center">
        Other Uploaders
      </h2>
      <v-container class="d-flex flex-column justify-center fit-content">
        <v-btn class="ma-2" v-if="account" @click="showApiKey = !showApiKey">{{ showApiKey ? 'Hide' : 'Reveal' }} API Key</v-btn>
        <v-code class="ma-2">
          URL: https://i.nuuls.com/upload{{ queryParams }}
          <br>
          Method: POST
          <br>
          Headers: None
          <br>
          Body: multipart/form-data
          <br>
          Form field name: anything works
          <br>
          Image link: leave empty
          <br>
          Deletion link: leave empty
        </v-code>
      </v-container>
    </v-container>
  </v-container>
</template>

<style scoped>
.fit-content {
  max-width: fit-content;
}
</style>

<script lang="ts">
import { Account } from '@/store/api/api';
import { useAppStore } from '@/store/app';

const appStore = useAppStore()

export default {
  data: () => {
    return {
      uploaderQueryParams: '',
      showApiKey: false,
      shownApiKey: 'YOUR_KEY_GOES_HERE',
      account: null as Account | null,
    }
  },
  computed: {
    queryParams() {
      if (!this.account) {
        return ''
      }
      let key = 'YOUR_KEY_GOES_HERE'
      if (this.showApiKey) {
        key = this.account.apiKey
      }
      return `?api_key=${key}`
    }
  },
  async mounted() {
    this.account = await (appStore.account.catch(() => Promise.resolve(null)))
    if (this.account) {
      this.uploaderQueryParams = `?api_key=${this.account.apiKey}`
    }
  },
  methods: {
  }
}
</script>
