<template>
  <v-container class="d-flex">
    <v-card v-for="upload in uploads" class="upload-card ma-4">
     <v-container class="card-top-bar d-flex justify-center align-center">
      <v-card-title>
        {{ upload.filename }}
      </v-card-title>
     </v-container>
     <v-container class="img-container d-flex justify-center align-center flex-grow-1 ma-0 pa-0">
      <v-img :src="getUrl(upload)" class="card-img"></v-img>
     </v-container>
    </v-card>
  </v-container>
</template>

<style scoped>
.upload-card {
  height: 340px;
  width: 400px;
}
.card-top-bar {
  height: 60px;
}
.img-container {
  height: 280px;
}
.card-img {
  max-height: 100%;
  max-width: 100%;
}
</style>

<script lang="ts">
import { Upload } from '@/store/api/api';
import { useAppStore } from '@/store/app';

const appStore = useAppStore()

export default {
  data: () => {
    return {
      loaded: false,
      uploads: [] as Upload[]
    }
  },
  async mounted() {
    appStore.$subscribe((mut, state) => {
      if (state.account && !this.loaded) {
        this.loadUploads().then()
      }
    })
  },
  methods: {
    async loadUploads() {
      const apiKey = appStore.account?.apiKey;
      if (!apiKey) return
      const res = await appStore.api.getUploads(apiKey)
      this.uploads = res.data
      this.loaded = true
    },
    getUrl(upload: Upload): string {
      if (Math.random() > 0.5) {
        return 'https://i.nuuls.com/iwg-H.png'
      } else {
        return 'https://i.nuuls.com/TH0Js.png'
      }
      return `http://localhost:7417/${upload.filename}`
    }
  }

}
</script>
