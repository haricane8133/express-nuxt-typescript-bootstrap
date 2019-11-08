<template>
  <div>
    <Hydrate on-click><p>{{ this.var }}</p></Hydrate>
    <client-only><p>{{ this.var }}</p></client-only>
  </div>
</template>

<script>
// refer https://github.com/znck/lazy-hydration for usage of this library
// This allows you to render whatever you want in the server and whatever you want in the client
import Hydrate from 'lazy-hydration';

export default {
  name: 'Root',
  components: {
    Hydrate
  },
  data() {
    return {
      var: 'Narayana '
    }
  },
  created() {
    ;
  },
  mounted() {
    setInterval(() => {
      this.var = this.var + 'Hare Krishna ';
    }, 1000)
    // this.var = 'Rama';
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
