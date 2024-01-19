/** Type for steps. */
type Steps = {
  /** Label to display. Ex.: Step 04 */
  label: string;
  /** Enable/disable step. */
  disabled?: boolean;
  /** check if a step is valid. */
  isValid?: boolean;
};

type StepperOrientation = 'horizontal' | 'vertical';

/**
 * Props for build stepper.
 */
export type StepperProps = {
  /** List of steps. */
  steps: Steps[];
  /** Set if click is disabled. */
  disabledClick?: boolean;
  /** Current step selected. */
  currentStep?: number;
  /** Orientation. Default is horizontal. */
  orientation?: StepperOrientation;
};

/**
 * Types for the stepper state.
 */
export type StepperState = {
  /** returns the current step. */
  currentStep: number;
  /** Unique ID to the progress bar. */
  progressId: string;
  /** These ID you can use with a span element to represent the progress bar label. */
  labelId: string;
  /** Check if has previous step. */
  hasPreviousStep?: boolean;
  /** Check if is last step. */
  isLastStep?: boolean;
  /** Check if has next step. */
  hasNextStep?: boolean;
  /** Returns the total steps. */
  totalSteps: number;
};

/**
 * Hook to use stepper.
 */
export const useStepper = (props: StepperProps) => {
  const { steps, currentStep: initialCurrentStep, orientation = 'horizontal', disabledClick = false } = props;

  // IDs
  const stepperId = ref(crypto.randomUUID());
  const progressId = crypto.randomUUID();
  const labelId = `${crypto.randomUUID()}-label`;

  // States & Ref's
  const stepElementsRef = ref<HTMLElement[]>([]);
  const currentStepFocused = ref<number | null>(null);

  const state = reactive({
    labelId,
    progressId,
    currentStep: initialCurrentStep || 0,
    hasPreviousStep: false,
    hasNextStep: false,
    isLastStep: false,
    totalSteps: steps.length,
  });

  // Check previous and next step
  const checkSteps = () => {
    state.hasPreviousStep = state.currentStep > 0;
    state.hasNextStep = state.currentStep < steps.length - 1;
    state.isLastStep = state.currentStep === steps.length - 1;
  };

  // Handlers
  const guessNextAvailableStep = (currentIndex: number): number => {
    let nextIndex = currentIndex + 1;

    while (nextIndex < steps.length) {
      const nextStep = steps[nextIndex];

      if (!nextStep?.disabled) {
        return nextIndex;
      }

      nextIndex++;
    }

    return currentIndex;
  };

  const guessPreviousAvailableStep = (currentIndex: number): number => {
    let previousIndex = currentIndex - 1;

    while (previousIndex >= 0) {
      const previousStep = steps[previousIndex];

      if (!previousStep?.disabled) {
        return previousIndex;
      }

      previousIndex--;
    }

    return currentIndex;
  };

  const nextStep = () => {
    if (state.currentStep === steps.length - 1) return;

    state.currentStep = guessNextAvailableStep(state.currentStep);
  };

  const prevStep = () => {
    if (state.currentStep === 0) return;

    state.currentStep = guessPreviousAvailableStep(state.currentStep);
  };

  const _getNextArrayItem = (el: HTMLElement) => {
    const currentIndex = stepElementsRef.value.indexOf(el);
    const nextItem = (currentIndex + 1) % stepElementsRef.value.length;
    return stepElementsRef.value[nextItem];
  };
  
  const _getPreviousArrayItem = (el: HTMLElement) => {
    const currentIndex = stepElementsRef.value.indexOf(el);
    const previousItem =
      (currentIndex - 1 + stepElementsRef.value.length) %
      stepElementsRef.value.length;
    return stepElementsRef.value[previousItem];
  };

  const handleKeydown = (event: KeyboardEvent, index: number) => {
    const kbLeftRightArrowsKeys = [37, 39];
    const kbEnterSpaceKeys = [13, 32];
    const previousElement = stepElementsRef.value[index - 1];
    const nextElement = stepElementsRef.value[index + 1];
    const nextElToFocus = _getNextArrayItem(nextElement);
    const prevElToFocus = _getPreviousArrayItem(previousElement);

    // Only focus if the next element is not disabled
    const isNextElementDisabled = nextElement?.getAttribute('aria-disabled');
    const isNextElementDisabledBoolean = isNextElementDisabled === 'true';
    const isPreviousElementDisabled = previousElement?.getAttribute('aria-disabled');
    const isPreviousElementDisabledBoolean = isPreviousElementDisabled === 'true';

    if (kbLeftRightArrowsKeys.includes(event?.keyCode)) {
      event?.preventDefault();

      // Focus prev or next step when user press left or right arrow
      if (event?.keyCode === 39) {
        if (isNextElementDisabledBoolean) {
          nextElToFocus?.focus();
          currentStepFocused.value = stepElementsRef.value.findIndex(
            (el) => el.id === nextElToFocus.id
          );
          return;
        }

        stepElementsRef.value[index + 1]?.focus();
        currentStepFocused.value = index + 1;
      }

      if (event?.keyCode === 37) {
        if (isPreviousElementDisabledBoolean) {
          prevElToFocus?.focus();
          currentStepFocused.value = stepElementsRef.value.findIndex(
            (el) => el.id === prevElToFocus.id
          );
          return;
        }

        stepElementsRef.value[index - 1]?.focus();
        currentStepFocused.value = index - 1;
      }
    }

    if (kbEnterSpaceKeys.includes(event?.keyCode)) {
      // If the user presses enter or space, go to the next step
      state.currentStep = currentStepFocused.value as number;
    }
  };

  // Build the stepper props
  const stepperProps = reactive({
    role: 'tablist',
    'aria-orientation': orientation,
  });

  // Build the steps props
  const stepsProps = computed(() => {
    return steps?.map((step, index) => {
      return {
        role: 'tab',
        tabIndex: index === state.currentStep ? 0 : -1,
        id: `${stepperId.value}-${index}`,
        'aria-posinset': index + 1,
        'aria-setsize': steps.length,
        'aria-disabled': step?.disabled,
        'aria-current': index === state.currentStep ? 'step' : undefined,
        'aria-selected': index === state.currentStep,
        onKeyDown: (event: any) => handleKeydown(event, index),
        onClick: () => (step.disabled || disabledClick ? null : (state.currentStep = index)),
        ref: (element: HTMLElement) => (stepElementsRef.value[index] = element),
      };
    });
  });

  // Build the progress bar props
  const progressProps = reactive({
    'aria-valuenow': state.currentStep,
    'aria-valuemin': 0,
    'aria-valuemax': steps.length - 1,
    role: 'progressbar',
    'aria-labelledby': labelId,
    tabIndex: -1, // prevent focus
  });

  // Watchers
  watchEffect(() => {
    checkSteps();
  });

  // Lifecycle Hooks
  onMounted(() => {
    state.totalSteps = steps.length;
  });

  onBeforeUnmount(() => {
    // Clean up
  });

  // Public API
  return {
    stepperProps,
    stepsProps,
    progressProps,
    state,
    nextStep,
    prevStep,
    setStep: (step: number) => (state.currentStep = step),
  };
};
