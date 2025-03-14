<script lang="ts" setup>
import RadialProgress from "vue3-radial-progress";

const breakpoints = useBreakpoints({
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
});

const props = defineProps<{
  checkDisabled?: (i: number) => boolean;
  stepper: any;
}>();

const completedSteps = computed(() => props.stepper.index.value + 1);
const totalSteps = computed(() => Object.keys(props.stepper.steps).length - 1);
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
            fontWeight:
              Number(stepper.index.value) === index ? 'bold' : 'unset',
          }"
        >
          <li class="stepper-nav__step">
            <a class="stepper-nav__label">
              <span
                class="stepper-nav__index"
                :class="[index <= stepper.index.value && 'active']"
              >
                {{ index + 1 }}
              </span>
              <span
                class="stepper-nav__text"
                :class="[index <= stepper.index.value && 'active']"
              >
                {{ step.title }}
              </span>
            </a>
          </li>
        </ol>
      </nav>
    </div>
    <div v-else class="radial-stepper">
      <RadialProgress
        :diameter="110"
        :completed-steps="completedSteps"
        :total-steps="totalSteps"
        inner-stroke-color="#e2e2e2"
        start-color="#c2d62e"
        stop-color="#c2d62e"
      >
        {{ completedSteps }} de {{ totalSteps }}
      </RadialProgress>
      <div v-if="!stepper.isLast.value">
        <h3>{{ stepper.current?.value?.title }}</h3>
        <p>Siguiente: {{ stepper.steps.value[stepper.next.value]?.title }}</p>
      </div>
      <h3 v-else>¡Completado!</h3>
    </div>
  </Transition>
</template>

<style scope lang="scss">
ol {
  list-style-type: none;
}

.radial-stepper {
  display: flex;
  justify-content: v-bind(
    "stepper.isLast.value ? 'flex-start' : 'space-between'"
  );
  gap: v-bind("stepper.isLast.value ? '1rem' : '0'");
  align-items: v-bind("stepper.isLast.value ? 'center' : 'flex-start'");
  width: min(100%, 500px);
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.stepper-nav {
  width: 100% !important;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  display: grid !important;
  grid-template-columns: repeat(5, 1fr) !important;
  position: relative;
  gap: 1rem;
}

.stepper-nav__steps {
  display: flex;
  flex-direction: row;
  z-index: 1;
  padding: 0;
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
  color: #1b4686;
  width: 2rem;
  height: 2rem;
  border: 1px solid #c2d62e;
  border-radius: 50%;
  transition: color 0.2s ease-in-out;

  &.active {
    background-color: #c2d62e;
    color: #1b4686;
    border: 1px solid #c2d62e;
    offset: 1px;
  }
}

.stepper-nav__text {
  font-weight: normal;
  border-bottom: 1px solid transparent;
  border-top: 1px solid transparent;
  margin-top: 1rem;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  color: #1b4686;

  &.active {
    font-weight: bold;
    border-bottom: 1px solid #c2d62e;
    border-top: 1px solid #c2d62e;
  }

  @media (max-width: 1300px) {
    font-size: 0.85rem;
  }

  @media (max-width: 1024px) {
    font-size: 0.75rem;
  }

  @media (max-width: 768px) {
    font-size: 0;
  }
}
</style>
