<template>
  <div>
    <ul v-for="(row, index) in rows" :key="`stat-${index}`">
      <li class="stat stat--heading">
        <span class="stat__title">{{ row.title }}</span>
        <span class="stat__value" v-if="row.value">{{ normalize(row) }}</span>
      </li>
      <li
        v-for="(item, itemIndex) in row.items"
        class="stat stat--detailed"
        :class="index === 0 && itemIndex === 0 ? 'focus' : ''"
        :key="`row-item-${itemIndex}`"
        :tabindex="-1"
        @click="setFocused"
      >
        <span class="stat__title">{{ item.title }}</span>
        <span
          class="stat__value"
          v-if="item.value !== undefined"
          :data-type="item.type"
          :data-value="item.value"
          >{{ normalize(item) }}</span
        >
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
    rows() {
      const thisPage = this.$store.state.pages.find(
        page => page.path === this.$route.path
      );
      return thisPage ? thisPage.rows : [];
    }
  },
  methods: {
    normalize(stat) {
      let result = "";
      switch (stat.type) {
        case "number":
          switch (stat.unit) {
            case "lb":
            case "ft":
            case "mi":
              result = `${Number(stat.value).toLocaleString()} ${stat.unit}`;
              break;
            case "USD":
              result = `USD ${Number(stat.value).toLocaleString(undefined, {
                minimumFractionDigits: 2
              })}`;
              break;
            default:
              result = Number(stat.value).toLocaleString();
              break;
          }
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
    },
    setFocused(e) {
      this.$el.querySelector(".focus").classList.remove("focus");
      e.target.classList.add("focus");
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
  &.focus,
  &.focus &__title,
  &.focus &__value {
    background: var(--highlight-color);
    color: var(--bg-color);
  }
  &__title {
    padding-right: 1ch;
    background: var(--bg-color);

    @at-root .stat--heading {
      color: var(--text-color);
    }

    @at-root .stat--detailed &::before {
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
  }
  &--heading::before {
    content: "----------------------------------------"
      "----------------------------------------"
      "----------------------------------------"
      "----------------------------------------";
  }
  &--detailed::before {
    content: "........................................"
      "........................................"
      "........................................"
      "........................................";
  }
}
</style>
