<template>
  <div>
    <div id="padding" style="padding-top:40px"></div>
    <div class="text-h4 text-center text-weight-thin q-ma-sm">Sponsors</div>
    <div class="row justify-center">
      <PartnerCard
        class="col-lg-3 col-md-4 col-sm-6 col-xs-12"
        v-for="partner in partners.sponsors"
        :key="partner.id"
        :title="partner.title"
        :tags="partner.tags"
        :url="partner.url"
        :logoUrl="$q.dark.isActive ? partner.logoUrl[0] : partner.logoUrl[1]"
        :description="partner.description"
        :flair="partner.flair"
      />
    </div>
    <q-separator class="q-my-lg" />
    <div class="text-h4 text-weight-thin text-center q-ma-sm">Collaborators</div>
    <div class="row justify-center">
      <PartnerCard
        class="col-lg-3 col-md-4 col-sm-6 col-xs-12 q-ma-md"
        v-for="collaborator in partners.collaborators"
        :key="collaborator.id"
        :title="collaborator.title"
        :tags="collaborator.tags"
        :url="collaborator.url"
        :logoUrl="$q.dark.isActive ? collaborator.logoUrl[0] : collaborator.logoUrl[1]"        :description="collaborator.description"
        :flair="collaborator.flair"
      />
    </div>
    <q-separator class="q-my-lg" />
    <div class="text-h4 text-center text-weight-thin q-ma-sm">Patrons</div>
    <div class="row justify-center">
      <q-list>
        <q-item v-for="patron in partners.patrons"
        :key="patron.id">
          <a v-if="patron.link" :href="patron.link" rel="noopener" target="_blank">
            <q-icon name="fas fa-star"></q-icon>
            &nbsp; {{ patron.name }} </a>
          <span v-else> {{ patron.name }} </span>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import PartnerCard from 'src/components/PartnerCard'
import partners from 'src/assets/partners'

export default {
  name: 'Partners',
  components: {
    PartnerCard
  },
  data () {
    return {
      partners: partners
    }
  },
  computed: {
    toc:
    {
      get () {
        return this.$store.state.common.toc
      },
      set (toc) {
        this.$store.commit('common/toc', toc)
      }
    }
  },

  methods: {
    onToc (toc) {
      this.toc = toc
    }
  }

}
</script>
