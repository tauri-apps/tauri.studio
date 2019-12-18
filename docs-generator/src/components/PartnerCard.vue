<template>
  <q-card flat bordered class="no-shadow">
    <q-ribbon v-if="flair" position="right" leaf-color="#55ADE4" background-color="#BAE5F2" style="margin-top:10px">
      <small class="q-pa-md text-black text-weight-bold">{{ flair }}</small>
    </q-ribbon>
    <q-card-section>
      <q-item>
        <q-item-section avatar>
          <img :src="logoUrl" style="max-width:80px">
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <a class="q-ml-sm text-h5 text-weight-bold" :href="url" rel="noopener" target="_blank">{{ title }}</a>
          </q-item-label>
          <div class="row">
            <q-badge class="q-ma-xs" v-for="tag in tags" :key="tag.id"
          :label="tag" />
          </div>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section>
      <q-item-label v-html="description" />
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: 'SponsorCard',
  props: {
    title: String,
    tags: Array,
    url: String,
    logoUrl: Array,
    description: String,
    flair: String
  }
}
</script>
