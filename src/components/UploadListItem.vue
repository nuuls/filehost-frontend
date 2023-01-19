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
      <FileViewer :src="getUrl(upload)" :mime-type="upload.mimeType"></FileViewer>
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

</style>

<script lang="ts">
import { Upload } from '@/store/api/api';
import { useAppStore } from '@/store/app';
import FileViewer from './FileViewer.vue';

const appStore = useAppStore()

const previewable = ['image', 'video', 'audio']

export default {
    props: ["upload"],
    methods: {
        getUrl(upload: Upload): string {
            return `${appStore.api.endpoint}/${upload.filename}`;
        },
    },
    components: { FileViewer }
}
</script>
