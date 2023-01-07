<template>
  <v-container class="justify-center align-start flex-column h-screen">
    <v-file-input class="input" label="Select file" :model-value="files" @update:modelValue="fileSelected">
    </v-file-input>
    <v-container v-if="filename" class="">
      <v-container class="d-flex justify-space-between align-center">
        <h1>
          {{ filename }}
        </h1>
        <h1>
          {{ fileSize }}
        </h1>
        <v-btn v-if="!uploading && !uploadComplete" @click="uploadFile()" color="success">
          Upload
        </v-btn>
        <v-progress-circular v-if="uploading" v-model="uploadProgress" striped color="blue"></v-progress-circular>
        <v-code v-if="uploadComplete">
          {{ fileUrl }}
        </v-code>
      </v-container>
      <!-- TODO: handle non-img data (text, sound, video) -->
      <v-img v-if="previewSrc" :src="previewSrc" class="preview"></v-img>
    </v-container>
  </v-container>
</template>

<style scoped>
.preview {
  max-height: 400px;
  max-width: 100%;
}
</style>

<script lang="ts">
import { humanFileSize } from '@/utils/utils';

export default {
  setup() {
  },
  data: () => {
    return {
      files: [],
      previewSrc: '',
      filename: '',
      fileSize: '',
      previewLoading: false,
      uploading: false,
      uploadProgress: 0,
      uploadComplete: false,
      fileUrl: '',
    }
  },
  mounted() {
    // TODO: this will probably bite me in the ass at some point?
    const body = document.body
    body.ondragover = this.handleDragOver
    body.ondrop = this.handleDrop

    // TODO: handle onpaste
  },
  methods: {
    fileSelected(files: File[]) {
      const file = files[0]

      this.filename = file.name;
      this.fileSize = humanFileSize(file.size)
      this.previewLoading = true
      this.previewSrc = ''

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const dataStr = reader.result?.toString();
        if (!dataStr) return
        this.previewSrc = dataStr
        this.previewLoading = false
      }
    },
    handleDrop(event: DragEvent) {
      event.preventDefault()
      console.log(event)
      const dataTransfer = event.dataTransfer
      if (!dataTransfer) return
      const file = dataTransfer.files[0]
      if (!file) return
      this.fileSelected([file])
    },
    handleDragOver(event: Event) {
      event.preventDefault()
    },
    uploadFile() {
      this.uploading = true
      setInterval(() => {
        this.uploadProgress += 1;
        if (this.uploadProgress > 100) {
          this.completeUpload('https://i.nuuls.com/SfS9q.png')
        }
      }, 50)
    },
    completeUpload(fileUrl: string) {
      this.uploadComplete = true
      this.fileUrl = fileUrl
      this.uploading = false
      this.uploadProgress = 0
    }
  },
}
</script>
