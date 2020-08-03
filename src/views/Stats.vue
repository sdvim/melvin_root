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
        <span class="stat__value">{{ normalize(stat) }}</span>
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
      return this.$store ? this.$store.state.stats : [];
    }
  },
  methods: {
    normalize(stat) {
      let result = "";
      switch (stat.type) {
        case "number":
          result = Number(stat.value).toLocaleString();
          break;
        case "length":
          result = Number(stat.value).toLocaleString() + " mi";
          break;
        case "time":
          result = `${parseInt(stat.value / 86400)}d ${new Date(
            stat.value * 1000
          )
            .toISOString()
            .substr(11, 2)}h`;
          break;
        case "string":
        default:
          result = stat.value;
          break;
      }
      if (stat.type == "time") {
        let sec = parseInt(stat.value, 10);
        const y = Math.floor(sec / (60 * 60 * 24 * 365));
        sec %= 60 * 60 * 24 * 365;
        const d = Math.floor(sec / (60 * 60 * 24));
        sec %= 60 * 60 * 24;
        const h = Math.floor(sec / (60 * 60));
        sec %= 60 * 60;
        const m = Math.floor(sec / 60);

        result = "";
        const units = { y, d, h, m };
        for (const [key, value] of Object.entries(units)) {
          if (value > 0) result += ` ${value}${key}`;
        }
      }
      return result;
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
  &:focus,
  &:focus &__title,
  &:focus &__value {
    background: var(--highlight-color);
    color: var(--bg-color);
  }
  &__title {
    padding-right: 1ch;
    background: var(--bg-color);

    &::before {
      content: "\25B8";
      margin-right: 1ch;
    }
  }
  &__value {
    float: right;
    padding-left: 1ch;
    background: var(--bg-color);
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
