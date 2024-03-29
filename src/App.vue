<template>
  <div id="app">
    <header>
      <h1>{{ $root.strings.nav_title }}</h1>
      <nav>
        <router-link
          v-for="page in pages"
          tabindex="-1"
          :key="`page-${page.title}`"
          :to="page.path"
          :class="{ focus: $route.path === page.path }"
        >
          {{ page.title }}
        </router-link>
      </nav>
    </header>
    <main>
      <h2>{{ currentPage.extended_title }}</h2>
      <hr />
      <router-view />
    </main>
    <footer class="footer">
      <ul class="footer__keys" v-if="this.$store.state.string_pairs">
        <li
          v-for="pair in this.$store.state.string_pairs.footer_keys"
          :key="`key-${pair.k}`"
          class="shortcut"
        >
          <span class="shortcut__key" v-html="pair.k">{{ pair.k }}</span>
          <span class="shortcut__title">{{ pair.v }}</span>
        </li>
      </ul>
      <div class="footer__info">
        <span>{{ $root.strings.footer_version }}</span>
        <span>{{ $root.strings.footer_copyright }}</span>
        <span>{{ $root.strings.footer_company }}</span>
      </div>
    </footer>
    <Prompt v-if="currentPrompt" :currentPrompt="currentPrompt" />
    <div v-if="blackout" class="blackout">
      {{ $root.strings.blackout_text }}
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Prompt from "./components/Prompt.vue";

export default {
  name: "App",
  components: {
    Prompt
  },
  data() {
    return {
      blackout: false,
      currentPrompt: null
    };
  },
  computed: {
    currentPage() {
      // HACK: should probably be refactored into router
      return this.pages.length > 0
        ? this.pages.find(page => page.path === this.$route.path)
        : {};
    },
    pages() {
      return this.$store.state.pages;
    }
  },
  methods: {
    ...mapActions(["updateRow"]),
    navigate(event) {
      const promptKeys = ["Enter", "Escape", "Y", "N", "y", "n"];
      const horizontalKeys = ["ArrowRight", "ArrowLeft"];
      const verticalKeys = ["ArrowDown", "ArrowUp"];
      if (this.blackout) this.blackout = false;
      if (
        !this.currentPrompt &&
        event.key === "Reset" &&
        document.querySelector(".stat")
      ) {
        document.querySelector(".stat.focus").classList.remove("focus");
        document
          .querySelectorAll(".stat:not(.stat--heading)")[0]
          .classList.add("focus");
        return;
      }
      if (
        !this.currentPrompt &&
        [...horizontalKeys, ...verticalKeys].includes(event.key)
      ) {
        const selector = horizontalKeys.includes(event.key)
          ? "nav a"
          : ".stat:not(.stat--heading)";
        const items = document.querySelectorAll(selector);
        let i;
        for (i = 0; i < items.length; i++) {
          if (items[i].classList.contains("focus")) break;
        }
        if (!items[i]) return false;
        switch (event.key) {
          case "ArrowDown":
          case "ArrowRight":
            i++;
            if (!items[i]) i = 0;
            break;
          case "ArrowUp":
          case "ArrowLeft":
            i--;
            if (!items[i]) i = items.length - 1;
            break;
        }
        items[i].click();
        if (horizontalKeys.includes(event.key)) {
          this.navigate({ key: "Reset" });
        }
        if (verticalKeys.includes(event.key)) {
          const view = document.querySelector("main > div");
          const y =
            items[i].offsetTop -
            view.offsetTop -
            Math.floor(view.offsetHeight / 2);
          view.scroll(0, y);
        }
        return;
      }
      if (promptKeys.includes(event.key)) {
        if (!this.currentPrompt) {
          if (event.key === "Enter") {
            const item = document.querySelector(".stat.focus");
            const property = item.querySelector(".stat__title").textContent;
            const value = item
              .querySelector(".stat__value")
              .getAttribute("data-value");
            const values = item
              .querySelector(".stat__value")
              .getAttribute("data-values");
            const type = item
              .querySelector(".stat__value")
              .getAttribute("data-type");
            this.currentPrompt = { property, value, values, type };
            return;
          }
          if (event.key === "Escape") {
            const title = this.$root.strings.prompt_exit_title;
            this.currentPrompt = { title };
            return;
          }
        }
        if (this.currentPrompt) {
          if (event.key === "Enter") {
            // HACK: sloppy dom traversal, could be much cleaner!
            const sectionTitle = document.querySelector(".stat.focus")
              .parentElement.firstElementChild.textContent;
            this.updateRow({ ...this.currentPrompt, sectionTitle });
            this.currentPrompt = null;
            return;
          }
          if (event.key.toLowerCase() === "y") {
            this.blackout = true;
          }
          if (event.key === "Escape" || event.key.toLowerCase() === "n") {
            this.currentPrompt = null;
            return;
          }
        }
      }
      if (this.currentPrompt && verticalKeys.includes(event.key)) {
        const radios = document.querySelectorAll(
          '.prompt__label input[type="radio"]'
        );
        if (radios.length > 0) {
          const delta = event.key === "ArrowUp" ? -1 : 1;
          let i;
          for (i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
              radios[i].checked = false;
              break;
            }
          }
          const index = Math.max(0, Math.min(i + delta, radios.length - 1));
          radios[index].click();
        }
      }
    }
  },
  created() {
    window.addEventListener("keydown", this.navigate);
  },
  destroyed() {
    window.removeEventListener("keydown", this.navigate);
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "IBM VGA 8x16";
  src: url(/fonts/Web_IBM_VGA_8x16.woff) format("woff");
  font-weight: normal;
  font-style: normal;
}

:root {
  --bg-color: grey;
  --fg-color: red;
  --text-color: white;
  --body-text-color: black;
  --overlay-color: rgba(128, 128, 128, 0.9);
  --highlight-color: yellow;
}

html {
  background: var(--bg-color);
  color: white;
  box-sizing: border-box;
  font-family: "IBM VGA 8x16", monospace;
  font-weight: normal;
  font-size: 16px;
  line-height: 1;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: none;
}

*,
*::before,
*::after {
  box-sizing: inherit;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  border: 0;
  margin: 0;
  padding: 0;
  outline: none;
}

a {
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}

input {
  color: var(--body-text-color);
  font-family: inherit;
  text-align: right;
}

hr {
  border: none;
  background: linear-gradient(to right, var(--fg-color), var(--fg-color))
    no-repeat center;
  background-size: 100% 2px;
  height: 2em;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

header {
  background: var(--fg-color);
  padding: 1em 2ch 0;
  h1 {
    text-align: center;
  }
  a {
    margin-right: 1ch;
    &:last-child {
      margin-right: 0;
    }
    &::before {
      content: "[ ";
    }
    &::after {
      content: " ]";
    }
    &.focus {
      background: var(--bg-color);
    }
  }
}

@mixin border {
  padding: 1em 1ch;
  margin: 1em 1ch;
  border: 2px solid var(--fg-color);
}

main {
  @include border;
  flex: 1;
  color: var(--body-text-color);
  overflow: hidden;
  padding-right: 0;
  display: flex;
  flex-direction: column;
  > div {
    flex: 1;
    overflow-y: auto;
    pointer-events: none;
    &::-webkit-scrollbar {
      width: 1ch;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--fg-color);
    }

    &::-webkit-scrollbar-track {
      background: var(--text-color);
    }

    &::-webkit-scrollbar-button {
      background: var(--fg-color);
      height: 1ch;
      border-radius: 50%;
    }
  }
}

.footer {
  background: var(--fg-color);
  text-decoration: none;
  padding: 1em 2ch 1em;
  display: flex;
  justify-content: space-between;
  &__keys {
    display: flex;
  }
  .shortcut {
    margin-right: 5ch;
    &:last-child {
      margin-right: 0;
    }
    &__key {
      color: var(--body-text-color);
      &::after {
        content: ": ";
      }
    }
  }
}

// HACK: should be refactored into separate component
.blackout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--body-text-color);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
