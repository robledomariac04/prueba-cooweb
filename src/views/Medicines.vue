<script setup lang="ts">
import { ref } from "vue"
import Welcome from '@/components/common/Welcome.vue';
import CustomTable from '@/components/shared/CustomTable.vue';
import MedicineModal from '@/components/medicines/MedicineModal.vue';

let isModalOpen = ref(false)

</script>


<template>
  <div class="columns is-multiline">
    <!-- Welcome message (This will be a component) -->
    <div class="column is-12 mt-5 mb-5">
      <Welcome message= "Bienvenido Camila"/>
    </div>

    <!-- Buttons -->
    <div class="column is-12 has-text-right">
      <button class="button is-primary" @click="isModalOpen = true">
        <span class="icon mr-1"> <i class="fa fa-plus"></i> </span> Agregar
      </button>
    </div>

    <!-- Table (This will be a component) -->
    <div class="column is-12">
      <CustomTable :rows="[]" :cols="[]" />
    </div>

    <!-- Modal -->
    <MedicineModal :is-open="isModalOpen" @hide="isModalOpen = false"/>

  </div>
</template>


