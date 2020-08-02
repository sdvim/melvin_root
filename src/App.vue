<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
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
