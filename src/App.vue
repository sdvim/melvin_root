<template>
  <div id="app">
    <header>
      <h1>{{ $root.strings.nav_title }}</h1>
      <nav>
        <router-link
          v-for="page in pages"
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
      <ul class="footer__keys">
        <li
          v-for="(title, key) in $root.strings.footer_keys"
          :key="`key-${key}`"
          class="shortcut"
        >
          <span class="shortcut__key" v-html="key">{{ key }}</span>
          <span class="shortcut__title">{{ title }}</span>
        </li>
      </ul>
      <div class="footer__info">
        <span>{{ $root.strings.footer_version }}</span>
        <span>{{ $root.strings.footer_copyright }}</span>
        <span>{{ $root.strings.footer_company }}</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
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
  --fg-color: blue;
  --text-color: white;
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
  min-height: 100vh;
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
    &:focus,
    &.focus {
      background: var(--bg-color);
    }
  }
}

@mixin border {
  padding: 1em 1ch;
  margin: 1em 1ch;
  box-shadow: 0 0 0 1px inset var(--fg-color), 0 0 0 1px var(--fg-color);
}

main {
  @include border;
  flex: 1;
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
      color: var(--bg-color);
      &::after {
        content: ": ";
      }
    }
  }
}
</style>
