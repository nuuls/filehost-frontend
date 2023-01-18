<template>
    <v-card class="upload-card ma-4">
     <v-container class="card-top-bar d-flex justify-center align-center">
      <v-card-title>
        <a :href="getUrl(upload)" target="_blank">
          {{ upload.filename }}
        </a>
      </v-card-title>
     </v-container>
     <v-container class="img-container d-flex justify-center align-center ma-0 pa-0">
      <v-img v-if="getFileType() === 'image'" :src="getUrl(upload)" class="card-img"></v-img>
      <video v-if="getFileType() === 'video'" :src="getUrl(upload)" controls class="card-img"></video>
      <audio v-if="getFileType() === 'audio'" :src="getUrl(upload)" controls class="card-img"></audio>
      <p v-if="getFileType() === 'unknown'">
        Preview unavailable
      </p>
     </v-container>
    </v-card>
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

const previewable = ['image', 'video', 'audio']

export default {
  props: ['upload'],
  methods: {
    getUrl(upload: Upload): string {
      return `${appStore.api.endpoint}/${upload.filename}`;
    },
    getFileType(): string {
      const part1 = this.upload.mimeType.split('/')[0]
      if (previewable.includes(part1)) {
        return part1
      }
      return 'unknown'
    }
  }
}
</script>
