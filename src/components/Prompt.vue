<template>
  <div class="prompt__scrim">
    <div class="prompt">
      <h2 class="prompt__title">Update {{ currentPrompt.property }}:</h2>
      <div class="prompt__values" v-if="values">
        <label
          v-for="val in values"
          class="prompt__label"
          :key="`option-${val}`"
        >
          <input
            type="radio"
            v-model="currentPrompt.value"
            :value="val"
            :checked="val == currentPrompt.value"
          />
          <span>{{ val }}</span>
        </label>
      </div>
      <input
        class="prompt__input"
        v-bind="inputProps"
        v-model="currentPrompt.value"
        v-else
        ref="input"
      />
      <div class="prompt__options">
        <span>[Enter] Accept</span>
        <span>[Esc] Cancel</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Prompt",
  props: {
    currentPrompt: Object
  },
  computed: {
    values() {
      return this.currentPrompt.values
        ? this.currentPrompt.values.split(",")
        : null;
    },
    inputProps() {
      let props = {};
      switch (this.currentPrompt.type) {
        case "number":
          // TODO: add min, max, step
          props = { type: "number" };
          break;
        default:
          props = { type: "text" };
          break;
      }
      return props;
    }
  },
  mounted() {
    if (this.$refs.input) this.$refs.input.focus();
  }
};
</script>

<style scoped lang="scss">
.prompt {
  background: var(--fg-color);
  padding: 1em 2ch;
  &__scrim {
    background: var(--overlay-color);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__input,
  &__values {
    margin: 1em 0;
    min-width: 30ch;
    width: 100%;
  }
  &__options {
    display: flex;
    justify-content: space-between;
  }
  &__values {
    display: flex;
    flex-direction: column;
    input[type="radio"] {
      display: none;
      + ::before {
        content: "( ) ";
      }
      &:checked + ::before {
        content: "(+) ";
      }
    }
  }
}
</style>
