<script lang="ts" setup>
import { vMaska } from 'maska';

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
const binded = reactive<{
  masked?: string;
  unmasked?: string;
  completed?: string;
}>({});

const value = computed(() => props.modelValue);

watch(binded, () => {
  emit('update:modelValue', binded?.masked ?? '');
});
</script>

<template>
  <div class="currency" :class="isActive ? 'active' : ''">
    <label :for="id" class="currency__label">Bs</label>
    <input type="text" :id="id" class="formulario__form__input" v-model="value" @blur="isActive = false"
      @focus="isActive = true" v-maska="binded" data-maska="Bs 9.99#,##" data-maska-tokens="9:[0-9]:repeated"
      data-maska-reversed />
  </div>
</template>

<style lang="scss" scoped>
.currency {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid transparent;

  &__label {
    padding-left: 1rem;
    font-weight: 500;
    color: #7e7e7e;
  }
}

.active {
  border: 1px solid #2767aa;
}

:deep(.formulario__form__input) {
  &:focus {
    outline: none;
  }
}
</style>
