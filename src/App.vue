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
      <router-view />
    </main>
    <footer>
      <span>{{ $root.strings.footer_version }}</span>
      <span>{{ $root.strings.footer_copyright }}</span>
      <span>{{ $root.strings.footer_company }}</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
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

html {
  background: grey;
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

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background: blue;
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
      background: grey;
    }
  }
}

main {
  flex: 1;
  padding: 1em 2ch;
}

footer {
  background: blue;
  text-decoration: none;
  padding: 1em 2ch 1em;
  text-align: right;
}
</style>
