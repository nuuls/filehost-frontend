<template>
    <v-card class="upload-card ma-4">
     <v-container class="card-top-bar d-flex justify-space-around align-center">
      <div>
        <v-icon icon="mdi-eye"></v-icon>
        {{ upload.views }}
        <v-tooltip activator="parent" location="bottom">
          At least {{ upload.views }} views. Cached requests are not counted.
        </v-tooltip>
      </div>
      <v-card-title>
        <a :href="getUrl(upload)" target="_blank">
          {{ upload.filename }}
        </a>
      </v-card-title>
      <v-btn color="error">
        Delete
        <v-dialog v-model="deleteDialog" activator="parent" class="d-flex">
          <v-card class="d-flex confirm-dialog align-self-center">
            <v-card-text>
              Are you sure about that?
            </v-card-text>
            <v-alert v-if="deleteError" color="error" icon="$error" class="ma-2">
              {{ deleteError }}
            </v-alert>
            <div class="d-flex justify-space-between">
              <v-btn color="error" @click="deleteUpload(upload)" class="ma-2">
                Delete
              </v-btn>
              <v-btn color="info" @click="deleteDialog = false" class="ma-2">
                Cancel
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
      </v-btn>
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

.confirm-dialog {
  max-width: fit-content;
}

</style>

<script lang="ts">
import { APIError, Upload } from '@/store/api/api';
import { useAppStore } from '@/store/app';
import FileViewer from './FileViewer.vue';

const appStore = useAppStore()

export default {
    props: ["upload", "removeSelf"],
    data: () => {
      return {
        deleteDialog: false,
        deleteError: ''
      }
    },
    methods: {
        getUrl(upload: Upload): string {
            return `${appStore.api.endpoint}/${upload.filename}`;
        },
        async deleteUpload(upload: Upload) {
          try {
            const acc = await appStore.account
            await appStore.api.deleteUpload(upload.filename, acc.apiKey)
            this.removeSelf()
            this.deleteDialog = false
          } catch (err: APIError|any) {
            this.deleteError = err?.body?.message || 'An unexpected error occurred';
          }
        }
    },
    components: { FileViewer }
}
</script>
