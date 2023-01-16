<template>
  <v-container class="d-flex flex-column justify-center">
    <Upload/>
    <v-container class="w-100 d-flex justify-center text-wrap">
      <router-link to="/3rdPartyUploaders">Want to use this with ShareX, Chatterino or another App?</router-link>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import Upload from '@/components/Upload.vue'
</script>

<script lang="ts" setup>
</script>
