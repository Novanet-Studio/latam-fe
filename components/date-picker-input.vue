<template>
  <div class="formulario__form__grupo">
    <label class="formulario__form__label">{{ labelText }}</label>
    <!-- <ClientOnly> -->
    <Datepicker v-model="value" :format="format" />
    <!-- <Datepicker :placeholder="placeholder" v-model="value" :format="format" :locale="locale" /> -->
    <!-- </ClientOnly> -->
    <div class="error">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts" setup>
import Datepicker from '@vuepic/vue-datepicker';
import { useField } from 'vee-validate';
import '@vuepic/vue-datepicker/dist/main.css';

type Props = {
  labelText: string;
  name: string;
  placeholder?: string;
  format?: string;
  locale?: string;
};

const props = defineProps<Props>();

const { value, errorMessage } = useField<Date>(props.name);
</script>

<style lang="scss" scoped>
:deep(.dp__input_wrap > input.dp__pointer) {
  padding-left: 2em;
}
</style>