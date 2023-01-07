<template>
    <v-container class="justify-center align-start flex-column">
      <v-file-input class="input" label="Select file" :model-value="files" @update:modelValue="fileSelected">
      </v-file-input>
      <v-container v-if="filename">
        <v-container class="d-flex justify-space-between">
          <h1>
            {{ filename }}
          </h1>
          <h1>
            {{ fileSize }}
          </h1>
        </v-container>
        <v-img v-if="previewSrc" :src="previewSrc" class="preview"></v-img>
      </v-container>
    </v-container>
    <div class="dropzone" :ondrop="handleDrop" :ondragover="handleDragOver">
    </div>
</template>

<style scoped>
.preview {
  max-height: 400px;
  max-width: 100%;
}
.dropzone {
  position: fixed;
  height: 100vh;
  width: 100vw;
}
</style>

<script lang="ts">import { humanFileSize } from '@/utils/utils';
import { ref } from 'vue';

const rootElement = ref(null)

export default {
  setup() {
  },
  data: () => {
    return {
      files: [],
      previewSrc: '',
      filename: '',
      fileSize: '',
      previewLoading: false
    }
  },
  mounted() {

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
    }
  },
}
</script>
