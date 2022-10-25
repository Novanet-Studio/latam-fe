<template>
  <input type="text" :id="id" class="formulario__form__input" v-model="value" @blur="isActive = false"
    @focus="isActive = true" />
</template>

<script lang="ts" setup>
type Props = {
  modelValue: string;
  id?: string;
};

type Emits = {
  (e: 'update:modelValue', value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isActive = ref(false);

const FORMAT_REGEX = /(\d)(?=(\d{3})+(?:\.\d+)?$)/g

const value = computed({
  get() {
    const currentValue = props.modelValue !== '' ? Number(props.modelValue) : 0;

    if (isActive.value) {
      return props.modelValue.toString()
    }

    const amount = currentValue
      .toFixed(2)
      .replace(FORMAT_REGEX, '$1.')
      .split('');

    const dotDecimalPosition = amount.length - 3

    amount.splice(dotDecimalPosition, 1, ',')

    return `Bs.S ${amount.join('')}`
  },
  set(newValue: string) {
    let currentValue = parseFloat(newValue.replace(/[^\d\,]/g, ''))

    if (isNaN(currentValue)) {
      currentValue = 0
    }

    emit('update:modelValue', String(currentValue))
  }
});
</script>