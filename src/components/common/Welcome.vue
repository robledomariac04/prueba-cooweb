<script lang="ts">

import { computed, defineComponent } from "vue";

export default defineComponent({
    name: 'Welcome',
    props: {
        message: { type: String, required: true }
    },
    setup(props) {
        //Variables
        const welcomeMessage = computed(() => props.message)

        return {
            welcomeMessage
        }
    }
})

</script>

<template>
    <div class="notification title is-size-5 is-primary">{{ welcomeMessage }}</div>
</template>