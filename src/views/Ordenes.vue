<script setup lang="ts">
//Imports
import { computed, ref } from 'vue'
import Welcome from '@/components/common/Welcome.vue';
import CustomTable from '@/components/shared/CustomTable.vue';
import MedicalOrderModal from '@/components/medical-orders/MedicalOrderModal.vue';
import { useFirestore } from '@/composables/useFirestore';
import type { BaseColumn } from '@/types/common';
import type { MedicalOrder } from "@/types/medical-orders";


/* //Variables
const name = ref('Maria')
const LastName = ref('Robledo')
//Propiedades comutadas
const getFullname = computed(() => name.value + ' ' + LastName.value) */

const {getCollection, addDocument, deleteDocument} = useFirestore()

let isModalOpen = ref(false)

const columns = ref<BaseColumn[]>([
  {
    label: "Nombre",
    field: "name"
  },
  {
    label: "Comentario",
    field: "idNumber"
  },
  {
    label: "Eps",
    field: "eps"
  },
  {
    label: "Asignado",
    field: "doctorSignature"
  }
])

const rows = ref<MedicalOrder[]>([])

const range = ref({
  start : null,
  end: null
})

const getRecords = async () => {
  const response = await getCollection('Medical-Orders')
  rows.value = response
}

const handleSubmit = async (document: string) => {
  const response = await addDocument("Medical-Orders", JSON.parse(document) as MedicalOrder)
  getRecords()
}

</script>

<template>
    <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
        <a class="navbar-item"> <RouterLink to="/ordenes"> Órdenes Médicas </RouterLink></a>
        <a class="navbar-item"> <RouterLink to="/medicamentos"> Medicamentos </RouterLink> </a>
        </div>
    </div>

  <div class="columns is-multiline">
    <!-- Welcome message (This will be a component) -->
    <div class="column is-12 mt-5 mb-6">
      <Welcome message= "Bienvenido Camila"/>
      <!-- <div class="notification title is-size-5 is-primary">Bienvenid@ {{ getFullname }}</div> -->
    </div>

    <!-- Buttons -->
    <div class="column is-5">
      <VDatePicker v-model="range" is-range :masks="{ input: 'DD/MM/YYYY' }">
        <template #default="{ inputValue, inputEvents }">
          <div class="field has-addons">
            <div class="control">
              <input class="input" :value="inputValue.start" v-on="inputEvents.start" />
            </div>
            <div class="control">
              <button class="button is-primary">
                <span class="icon"> <i class="fa fa-arrow-right"></i> </span>
              </button>
            </div>
            <div class="control">
              <input class="input" :value="inputValue.end" v-on="inputEvents.end" />
            </div>
            <div class="control">
              <button class="button is-primary">
                <span class="icon mr-2"> <i class="fa fa-search"></i> </span> Consultar
              </button>
            </div>
          </div>
        </template>
      </VDatePicker>
    </div>
    <div class="column is-7 has-text-right">
      <button class="button is-primary" @click="isModalOpen = true">
        <span class="icon mr-1"> <i class="fa fa-plus"></i> </span> Agregar
      </button>
    </div>

    <!-- Table (This will be a component) -->
    <!-- TODO: add a button to download the pdf -->
    <div class="column is-12">
      <CustomTable :rows="rows" :cols="columns" />
    </div>

    <!-- Modal (This will be a component) -->
    <MedicalOrderModal :is-open="isModalOpen" @hide="isModalOpen = false" @save="handleSubmit"/>
  </div>
</template>


