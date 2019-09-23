import orders from '@/services/orders'

export const state = {
  orders,
}

export const getters = {
  getOrderById: state => id =>
    state.orders.find(order => parseInt(order.id) === id),
}
