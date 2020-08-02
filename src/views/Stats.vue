<template>
  <div>
    <ul>
      <li
        class="stat"
        v-for="(stat, index) in stats"
        :key="`stat-${index}`"
        :tabindex="index + 100"
      >
        <span class="stat__title">{{ stat.title }}</span>
        <span class="stat__value">{{
          Number(stat.value).toLocaleString()
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  // components: {
  // HelloWorld
  // }
  computed: {
    stats() {
      return this.$store.state.stats;
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  max-width: 80ch;
  overflow-x: hidden;
}
.stat {
  margin-bottom: 1em;
  &:last-child {
    margin-bottom: 0;
  }
  &:focus &__value {
    background: yellow;
    color: grey;
  }
  &__title {
    padding-right: 1ch;
    background: grey;

    &::before {
      content: "\25B8";
      margin-right: 1ch;
    }
  }
  &__value {
    float: right;
    padding-left: 1ch;
    background: grey;
  }
  &::before {
    float: left;
    width: 0;
    white-space: nowrap;
    content: "........................................"
      "........................................"
      "........................................"
      "........................................";
  }
}
</style>
