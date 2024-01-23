<script lang="ts" setup>
import { useField } from 'vee-validate';

type Props = {
  label: string;
  name: string;
  id: string;
};

const props = defineProps<Props>();

const { value, errorMessage } = useField<string>(props.name);
</script>

<template>
  <div class="formulario__form__grupo">
    <label class="formulario__form__label" :for="id">{{ label }}</label>
    <!-- <input type="text" v-model="form.mount" /> -->
    <currency-input v-model="value" :id="id" />
    <div class="error">{{ errorMessage }}</div>
  </div>
</template>
