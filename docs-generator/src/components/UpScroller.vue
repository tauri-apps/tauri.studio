<template>
<q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
  <q-btn
    fab
    icon="keyboard_arrow_up"
    :class="{ 'text-black bg-grey-4': $q.dark.isActive, 'text-white bg-primary': !$q.dark.isActive }"
  />
</q-page-scroller>
</template>
<script>
export default {
  name: 'UpScroller'
}
</script>
