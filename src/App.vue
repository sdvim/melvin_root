<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">{{ $root.strings.nav_tab_1 }}</router-link> |
      <router-link to="/melvin">{{ $root.strings.nav_tab_2 }}</router-link> |
      <router-link to="/family">{{ $root.strings.nav_tab_3 }}</router-link> |
      <router-link to="/connections">{{ $root.strings.nav_tab_4 }}</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: "IBM VGA 8x16";
  src: url(/fonts/Web_IBM_VGA_8x16.woff) format("woff");
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: "IBM VGA 8x16", monospace;
  font-weight: normal;
  font-size: 16px;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: none;
}

* {
  font-size: inherit;
  font-weight: inherit;
}

#nav {
  a {
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
