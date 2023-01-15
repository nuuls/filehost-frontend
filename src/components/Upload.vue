<template>
  <v-container class="upload-main justify-center align-center flex-column h-screen">
    <v-file-input class="input" label="Select file" :model-value="files" @update:modelValue="fileSelected">
    </v-file-input>
    <v-container v-if="filename" class="meta-container">
      <v-container class="d-flex flex-wrap justify-space-around align-center">
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
        <a :href="fileUrl" target="_blank" v-if="uploadComplete">
          {{ fileUrl }}
        </a>
        <!-- TODO: add copy url button -->
        <v-btn color="success" v-if="fileUrl" @click="copyUrl()">
          Copy
        </v-btn>
        <!-- TODO: add error messages -->
      </v-container>
      <!-- TODO: handle non-img data (text, sound, video) -->
      <v-img v-if="previewSrc" :src="previewSrc" class="preview"></v-img>
    </v-container>
  </v-container>
</template>

<style scoped>
.upload-main {
  max-width: 800px;
}
.meta-container * {
  margin-left: 4px;
  margin-right: 4px;
}
.preview {
  max-height: 400px;
  max-width: 100%;
}
</style>

<script lang="ts">
import { humanFileSize } from '@/utils/utils';
import { useAppStore } from '@/store/app';

const appStore = useAppStore()

function initialState() {
  return {
    files: [],
    selectedFile: null as File | null,
    previewSrc: '',
    filename: '',
    fileSize: '',
    previewLoading: false,
    uploading: false,
    uploadProgress: 0,
    uploadComplete: false,
    fileUrl: '',
  }
}

export default {
  setup() {
  },
  data: () => {
    return initialState()
  },
  mounted() {
    // TODO: this will probably bite me in the ass at some point?
    const body = document.body
    body.ondragover = this.handleDragOver
    body.ondrop = this.handleDrop
    body.onpaste = this.handlePaste


    // TODO: remove handlers on unmount?
  },
  methods: {
    resetState() {
      Object.assign(this.$data, initialState())
    },
    fileSelected(files: File[]) {
      this.resetState()

      const file = files[0]
      this.selectedFile = file

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
      this.handleDataTransfer(event.dataTransfer)
    },
    handlePaste(event: ClipboardEvent) {
      event.preventDefault()
      console.log(event)
      this.handleDataTransfer(event.clipboardData)
    },
    handleDragOver(event: Event) {
      event.preventDefault()
    },
    handleDataTransfer(dataTransfer: DataTransfer|null) {
      if (!dataTransfer) return
      const file = dataTransfer.files[0]
      if (!file) return
      this.fileSelected([file])
    },
    async uploadFile() {
      this.uploading = true
      if (!this.selectedFile) return
      const acc = await (appStore.account.catch(() => Promise.resolve(null)))
      const res = await appStore.api.uploadFile(this.selectedFile, acc?.apiKey, progess => this.uploadProgress = progess)
      this.completeUpload(res)
    },
    completeUpload(fileUrl: string) {
      this.uploadComplete = true
      this.fileUrl = fileUrl
      this.uploading = false
      this.uploadProgress = 0
    },
    copyUrl() {
      navigator.clipboard.writeText(this.fileUrl)
      // TODO: show toast: copied to clipboard or something
    }
  },
}
</script>
