<template>
  <v-container class="justify-center align-start flex-column">
    <v-file-input class="input" label="Select file" :model-value="files" @update:modelValue="updatePreview">
    </v-file-input>
    <v-img v-if="previewSrc" :src="previewSrc" class="preview"></v-img>
  </v-container>
</template>

<style scoped>
.input {
}
.preview {
  max-height: 400px;
}
</style>

<script lang="ts">
export default {
  data: () => {
    return {
      files: [],
      previewSrc: ''
    }
  },
  methods: {
    updatePreview(files: File[]) {
      console.log('xd called')
      const file = files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        console.log(reader.result)
        const dataStr = reader.result?.toString();
        if (!dataStr) return
        this.previewSrc = dataStr
      }
    }
  }
}
</script>
