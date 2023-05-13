<script lang="ts">
import Welcome from '@/components/common/Welcome.vue';
import { computed, defineComponent, ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from "@vuelidate/validators";
import type { Users } from "../../types/users";

export default defineComponent({
    name: 'RegisterModal',
    props: { 
        isOpen: { type: Boolean, required: true}
    },
    emits: ['hide'],
    setup(props, { emit }) { 

        const isLoading = ref(false)

        const isModalOpen = computed(() => props.isOpen)

        const user = ref<Users>({ 
            usuario: '',
            contraseña: ''
        })

        const rules = computed(() => ({
            usuario: { required },
            contraseña: { required },
        }))

        //Para que aplique las validaciones sobre los campos determiados se usa la siguiente linea de codigo
        const v$ = useVuelidate(rules, user);

        //Boton para guardar información 
        const handleSubmit = async () => {
            const isFormValid = await v$.value.$validate()

            console.log(isFormValid)

            if (!isFormValid){
                return
            }

            isLoading.value = true
        }

        return {
            v$,
            emit,
            isLoading,
            isModalOpen,
            handleSubmit
        }
    }
})



</script>

<template>
    
    <div>
        <div class="notification title is-size-5 is-primary">Registrese</div>

        <input v-model="v$.usuario.$model" type="text" placeholder="Usuario">
        <p v-if="v$.usuario.$error" class="has-text-danger">Campo obligatorio</p>

        <input v-model="v$.contraseña.$model" type="password" placeholder="Password">
        <p v-if="v$.contraseña.$error" class="has-text-danger">Campo obligatorio</p>

        <button class="button is-primary is-fullwidth" :class="{'id-loading': isLoading}" @click="handleSubmit">Registrar</button>
    </div>
    
    
    <div class="close" @click="() => emit('hide')">
        <i class="fa fa-times"></i>
    </div>
      
</template> 

<style scoped>
.custom-modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
    z-index: 9999;
  }
  
  .custom-modal {
    background-color: white;
    height: 600px;
    width: 700px;
    margin-top: 10%;
    padding: 40px 0;
    border-radius: 10px;
  }
  .close {
    margin: 10.5% 0 0 -25px;
    cursor: pointer;
  }
</style>