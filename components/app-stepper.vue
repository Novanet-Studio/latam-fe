<script lang="ts" setup>
import RadialProgress from 'vue3-radial-progress';

const breakpoints = useBreakpoints({
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
})

defineProps<{
  checkDisabled?: (i: number) => boolean,
  stepper: any
}>();
</script>

<template>
  <Transition name="fade">
    <div v-if="breakpoints.isGreater('tablet')">
      <nav class="stepper-nav" style="display: flex">
        <ol
          class="stepper-nav__steps"
          v-for="(step, id, index) in stepper.steps.value"
          :key="id"
          :style="{
            fontWeight: Number(stepper.index.value) === index ? 'bold' : 'unset',
          }"
        >
          <li class="stepper-nav__step">
            <a class="stepper-nav__label">
              <span class="stepper-nav__index" :class="[index <= stepper.index.value && 'active']">
                {{ index + 1 }}
              </span>
              <span class="stepper-nav__text" :class="[index <= stepper.index.value && 'active']">
                {{ step.title }}
              </span>
            </a>
          </li>
        </ol>
      </nav>
    </div>
    <div v-else class="radial-stepper">
      <RadialProgress
        :diameter="130"
        :completed-steps="stepper.index.value + 1"
        :total-steps="stepper.steps.value.length - 1"
        inner-stroke-color="#e2e2e2"
        start-color="#c2d62e"
        stop-color="#c2d62e"
      >
        {{ stepper.index.value + 1 }} de {{ Object.keys(stepper.steps).length - 1 }}
      </RadialProgress>
      <div>
        <h3>{{ stepper.current?.value?.title }}</h3>
        <p v-if="!stepper.isLast.value">Siguiente: {{ stepper.steps.value[stepper.next.value]?.title }}</p>
      </div>
    </div>
  </Transition>
</template>

<style scope lang="scss">
ol {
  list-style-type: none;
}

.radial-stepper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.stepper-nav {
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: relative;
}

.stepper-nav__steps {
  grid-column: span -1;
  display: flex;
  flex-direction: row;
  z-index: 1;
}

.stepper-nav__step {
  text-align: center;
  flex: 1 0 auto;
}

.stepper-nav__label {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:focus {
    outline: none;
  }
}

.stepper-nav__index {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: #1B4686;
  width: 2rem;
  height: 2rem;
  border: 1px solid #C2D62E;
  border-radius: 50%;
  transition: color 0.2s ease-in-out;

  &.active {
    background-color: #C2D62E;
    color: #1B4686;
    border: 1px solid #C2D62E;
    offset: 1px;
  }
}

.stepper-nav__text {
  font-weight: normal;
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;
  margin-top: 1rem;
  transition: all 0.2s ease-in-out;
  color: #1B4686;

  &.active {
    font-weight: bold;
    border-bottom: 1px solid #C2D62E;
    border-top: 1px solid #C2D62E;
  }
}
</style>