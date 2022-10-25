<template>
  <div class="formulario__form__grupo">
    <label class="formulario__form__label" :for="id">
      {{ labelText }}
    </label>
    <!-- <input class="formulario__form__input" :id="id" type="text" v-model="value" /> -->
    <select v-model="value" :id="id">
      <option selected disabled>{{ defaultText }}</option>
      <option v-for="(opt, index) in options" :key="index" :value="opt.value">{{ opt.text }}</option>
      <!-- <option value="transferencia_bancaria">Transferencia bancaria</option>
      <option value="pago_movil">Pago móvil</option> -->
    </select>
    <div class="error">{{ errorMessage }}</div>
  </div>
</template>

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
  labelText: string;
  defaultText: string;
};

const props = defineProps<Props>();

const { value, errorMessage } = useField(props.name);
</script>
