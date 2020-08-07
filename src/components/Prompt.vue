<template>
  <div class="prompt__scrim">
    <div class="prompt">
      <h2 class="prompt__title">Update {{ currentPrompt.property }}:</h2>
      <input
        class="prompt__input"
        type="text"
        v-model="currentPrompt.value"
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
  mounted() {
    this.$refs.input.focus();
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
  &__input {
    margin: 1em 0;
    min-width: 30ch;
    width: 100%;
  }
  &__options {
    display: flex;
    justify-content: space-between;
  }
}
</style>
