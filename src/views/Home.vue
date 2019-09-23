<template>
  <div class="home">
    <v-button @click="createNewContent">
      create new content
    </v-button>
    <order
      :show="orderModal.show"
      :order="order"
      @onOrderClose="toggleOrderModal(false)"
    />
  </div>
</template>

<script>
import VButton from '@/components/controls/VButton'
import Order from '@/components/Order.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  components: {
    Order,
    VButton,
  },
  data: () => ({
    orderId: 22,
    order: null,
    orderModal: {
      show: false,
    },
  }),
  computed: {
    ...mapGetters('orders', ['getOrderById']),
  },
  methods: {
    createNewContent() {
      this.order = this.getOrderById(this.orderId)
      this.toggleOrderModal(true)
    },
    toggleOrderModal(state) {
      this.orderModal.show = state
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
}
</style>
