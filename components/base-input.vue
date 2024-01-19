<template>
  <div class="formulario__form__grupo">
    <label class="formulario__form__label" :for="id">
      {{ labelText }}
    </label>
    <input class="formulario__form__input" :class="[errorMessage && 'input-error']" :id="id" :type="type"
      v-model="value" />
    <div class="error">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate';

type Props = {
  labelText: string;
  name: string;
  id: string;
  type: 'text' | 'password';
};

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
});

const { value, errorMessage } = useField(props.name);
</script>
