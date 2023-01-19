<template>
  <v-img v-if="getFileType() === 'image'" :src="src" class="card-img"></v-img>
  <video v-if="getFileType() === 'video'" :src="src" controls class="card-img"></video>
  <audio v-if="getFileType() === 'audio'" :src="src" controls class="card-img"></audio>
  <p v-if="getFileType() === 'unknown'">
    Preview unavailable
  </p>
</template>

<style scoped>
.card-img {
  max-height: 100%;
  max-width: 100%;
}
</style>

<script lang="ts">

const previewable = ['image', 'video', 'audio']

export default {
  props: ['mimeType', 'src'],
  methods: {
    getFileType(): string {
      const part1 = this.mimeType.split('/')[0]
      if (previewable.includes(part1)) {
        return part1
      }
      return 'unknown'
    }
  }
}
</script>
