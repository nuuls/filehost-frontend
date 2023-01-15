<template>
  <div class="d-flex flex-wrap justify-center w-100">
    <v-card v-for="upload in uploads" class="upload-card ma-4">
     <v-container class="card-top-bar d-flex justify-center align-center">
      <v-card-title>
        {{ upload.filename }}
      </v-card-title>
     </v-container>
     <v-container class="img-container d-flex justify-center align-center ma-0 pa-0">
      <v-img :src="getUrl(upload)" class="card-img"></v-img>
     </v-container>
    </v-card>
  </div>
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
    await this.loadUploads()
  },
  methods: {
    async loadUploads() {
      const apiKey = (await appStore.account).apiKey;
      if (!apiKey) return
      const res = await appStore.api.getUploads(apiKey)
      this.uploads = res.data
      this.loaded = true
    },
    getUrl(upload: Upload): string {
      return `${appStore.api.endpoint}/${upload.filename}`
    }
  }

}
</script>
