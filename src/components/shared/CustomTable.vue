<script lang="ts">

import { computed } from '@vue/reactivity';
import { defineComponent, type PropType } from 'vue';
import type { BaseColumn } from "@/types/common";
import type { MedicalOrder } from "@/types/medical-orders";
import type { Medicine } from "@/types/medicines";



export default defineComponent({
    name: 'CustomTable',
    props: {
        cols: { type: Array as PropType<BaseColumn[]>, required: true},
        rows: { type: Array as PropType<MedicalOrder[] | Medicine[]>, required: true},
        emptyMessage: { type: String, required: false}
    },
    setup(props) {

        const colsInfo = computed(() => props.cols)
        const rowsInfo = computed(() => props.rows)
        const emptyState = computed(() => props.emptyMessage)

        return{
            colsInfo,
            rowsInfo,
            emptyState
        }
    }
})

</script>

<template>
    <vue-good-table
        :columns="colsInfo"
        :rows="rowsInfo"
        :sort-options="{
          enabled: true
        }"
        :search-options="{
          enabled: true
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 5,
          position: 'top',
          perPageDropdown: [10, 20, 50],
          dropdownAllowAll: false,
          setCurrentPage: 1,
          nextLabel: 'Siguiente',
          prevLabel: 'Anterior',
          rowsPerPageLabel: 'Filas por página',
          ofLabel: 'de',
          allLabel: 'Todas'
        }"
    >
        <template #emptystate>{{ emptyState ?? 'No hay datos disponibles para mostrar' }}</template>
    </vue-good-table>
</template>