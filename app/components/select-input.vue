<script lang="ts" setup>
import { useField } from 'vee-validate';

type Options = {
  text: string;
  value: string;
}

type Props = {
  id: string;
  name: string;
  options: Options[];
  label: string;
  defaultText: string;
};

const props = defineProps<Props>();

const { value, errorMessage } = useField(props.name);
</script>

<template>
  <div class="formulario__form__grupo">
    <label class="formulario__form__label" :for="id">
      {{ label }}
    </label>
    <!-- <input class="formulario__form__input" :id="id" type="text" v-model="value" /> -->
    <select v-model="value" :id="id">
      <option disabled selected>{{ defaultText }}</option>
      <option v-for="(opt, index) in options" :key="index" :value="opt.value">{{ opt.text }}</option>
      <!-- <option value="transferencia_bancaria">Transferencia bancaria</option>
      <option value="pago_movil">Pago móvil</option> -->
    </select>
    <div class="error">{{ errorMessage }}</div>
  </div>
</template>
