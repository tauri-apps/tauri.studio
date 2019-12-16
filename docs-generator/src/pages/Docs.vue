<template>
  <div>
    <div id="padding" style="padding-top:240px"></div>
    <h4 v-if="!menu && $route.name === 'docs'">Documentation - Table of Contents</h4>
  </div>
</template>
<script>
// use this to render the route at /docs
// and to create the dropdown / sidebar
// todo: import a JS list so we don't have to configure in 4 places
export default {
  name: 'DocsTOC',
  props: {
    menu: {
      type: Boolean,
      default: false
    }
  }
}
</script>
