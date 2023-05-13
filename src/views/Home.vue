<script setup lang="ts">
//Imports
import { computed, ref } from 'vue'
import Welcome from '@/components/common/Welcome.vue';
import LoginModal from '@/components/login/LoginModal.vue';
import RegisterModal from '@/components/login/RegisterModal.vue';
import { useFirestore } from '@/composables/useFirestore';
import type { Users } from "@/types/users";


const {getCollection, addDocument} = useFirestore()

let isModalOpen = ref(false)


const getRecords = async () => {
  const response = await getCollection('Medical-Orders')
  
}

const handleSubmit = async (document: string) => {
  const response = await addDocument("Medical-Orders", JSON.parse(document) as Users)
  getRecords()
}

</script>

<template>
  <div>
    <!-- Modal (This will be a component) -->
    <LoginModal :is-open="isModalOpen" @hide="isModalOpen = false" @save="handleSubmit"/>
  </div>
  <div>
    <!-- Modal (This will be a component) -->
    <RegisterModal :is-open="isModalOpen" @hide="isModalOpen = false" @save="handleSubmit"/>
  </div>
  
</template>


