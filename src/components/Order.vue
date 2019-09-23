<template>
  <modal v-show="show" :show="show" @onModalClose="onOrderCloseEmmit">
    <div class="order">
      <div class="order__head">
        <picture>
          <source media="(min-width: 440px)" :srcset="fullSizeImage" />
          <img
            :src="thumbnailImage"
            alt="Order image"
            class="order__head-cover"
          />
        </picture>
        <button
          class="order__close-btn"
          @click="onOrderCloseEmmit"
          title="Close order"
        >
          <img src="../assets/images/arrow-left.svg" alt="Arrow left" />
        </button>
      </div>
      <div class="order__content">
        <div class="order__hero">
          <div class="order__hero-title">
            <p>{{ name }}</p>
          </div>
          <a
            :href="publication"
            class="order__hero-link"
            rel="noreferrer nofollow"
            target="_blank"
          >
            {{ publication }}
          </a>
          <div class="order__hero-subtitle">
            <p>{{ description }}</p>
          </div>
        </div>
        <ValidationObserver
          ref="observer"
          v-slot="{ invalid }"
          tag="form"
          @submit.prevent="submit()"
          @reset="resetForm"
          class="order__form"
          novalidate
        >
          <transition name="fade">
            <div v-if="orderDetails.length" class="order__form-row">
              <div
                v-for="orderDetailsItem in orderDetails"
                :key="orderDetailsItem.id"
                class="order__form-row-item"
                :class="generateOrderFormControlClass(orderDetailsItem.name)"
              >
                <div
                  v-if="orderDetailsItem.name === 'source'"
                  class="order__form-control"
                >
                  <ValidationProvider rules="required|url" v-slot="{ errors }">
                    <v-input
                      v-model="form.source"
                      label="source"
                      label-for="order-source"
                      :name="orderDetailsItem.name"
                      :placeholder="orderDetailsItem.placeholder"
                      type="url"
                    />
                    <div class="order__form-control-error">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>
                <div
                  v-else-if="orderDetailsItem.name === 'instructions'"
                  class="order__form-control"
                >
                  <ValidationProvider
                    rules="required|maxInstructions:30"
                    v-slot="{ errors }"
                  >
                    <v-textarea
                      v-model="form.instructions"
                      label="instructions"
                      label-for="order-instructions"
                      :name="orderDetailsItem.name"
                      :placeholder="orderDetailsItem.placeholder"
                    />
                    <div class="order__form-control-error">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>
                <div
                  v-else-if="orderDetailsItem.name === 'number_writers'"
                  class="order__form-control"
                >
                  <custom-select
                    label="number of writers"
                    label-for="order-number-of-writers"
                  >
                    <v-select
                      id="order-number-of-writers"
                      v-model="form.numberOfWriters"
                      :name="orderDetailsItem.name"
                      :options="numberOfWritersOptions"
                      :placeholder="orderDetailsItem.placeholder"
                      :searchable="false"
                      :clearable="false"
                      class="custom-select"
                    />
                  </custom-select>
                </div>
                <div
                  v-else-if="orderDetailsItem.name === 'budget'"
                  class="order__form-control"
                >
                  <ValidationProvider
                    rules="required|betweenCurrency:5,500"
                    v-slot="{ errors }"
                  >
                    <v-input
                      v-model="form.budget"
                      label="budget (USD)"
                      label-for="order-budget"
                      :name="orderDetailsItem.name"
                      :placeholder="orderDetailsItem.placeholder"
                      currency="$"
                      type="number"
                      :max="500"
                      :min="5"
                      input-mode="decimal"
                    />
                    <div class="order__form-control-error">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>
              </div>
            </div>
          </transition>
          <div class="order__form-options">
            <div class="order__form-options-head">
              <p>Please select options (optional)</p>
            </div>
            <div
              class="order__form-options-item"
              v-for="option in options"
              :key="option.id"
            >
              <div class="order__form-options-item-title">
                <p>
                  {{ option.name }}
                </p>
                <span v-if="option.increase">
                  {{ `(add ${option.increase}%)` }}
                </span>
                <span v-else>
                  {{ `(add $${option.price})` }}
                </span>
              </div>
              <div class="order__form-options-item-control">
                <v-checkbox
                  v-model="form.options"
                  :label="option.name"
                  :label-for="option.name"
                  :name="option.name"
                  :variant="formattedOption(option)"
                />
              </div>
            </div>
          </div>
          <div class="order__form-bottom">
            <v-button type="submit" is-wide>
              <span class="btn__before">
                <img src="../assets/images/cart.svg" alt="Cart" />
              </span>
              <span class="btn__center">submit</span>
              <span class="btn__after"> $ {{ totalPrice }} </span>
            </v-button>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/controls/Modal'
import VInput from '@/components/controls/VInput'
import VTextarea from '@/components/controls/VTextarea'
import VButton from '@/components/controls/VButton'
import VSelect from '@/components/controls/VSelect'
import VCheckbox from '@/components/controls/VCheckbox'

export default {
  name: 'Order',
  components: {
    Modal,
    VInput,
    VTextarea,
    VButton,
    'custom-select': VSelect,
    VCheckbox,
  },
  props: {
    order: {
      type: Object,
      default: () => {},
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    numberOfWritersOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    form: {
      source: '',
      instructions: '',
      numberOfWriters: 1,
      budget: 5,
      options: [],
    },
  }),
  computed: {
    fullSizeImage() {
      return this.order && this.order.images.full_size
    },
    thumbnailImage() {
      return this.order && this.order.images.thumbnail
    },
    name() {
      return this.order && this.order.name
    },
    publication() {
      return this.order && this.order.publication
    },
    description() {
      return this.order && this.order.description
    },
    options() {
      return this.order && this.order.options
    },
    orderDetails() {
      return this.order ? this.order.order_details : []
    },
    totalPrice() {
      return this.calculateTotalPrice()
    },
  },
  methods: {
    onOrderCloseEmmit() {
      this.resetForm()
      this.$emit('onOrderClose')
    },
    formattedOption(option) {
      return {
        id: option.id,
        name: option.name.toString().toLowerCase(),
        type: option.increase ? 'increase' : 'price',
        value: option.increase ? option.increase : option.price,
      }
    },
    generateOrderFormControlClass(name) {
      return name === 'number_writers'
        ? 'order__form-row-item--size-l'
        : name === 'budget'
        ? 'order__form-row-item--size-s'
        : 'order__form-row-item--size-w'
    },
    calculateTotalPrice() {
      let totalPrice = this.form.numberOfWriters * this.form.budget
      if (this.form.options.length) {
        this.form.options.forEach(option => {
          const optionValue = parseInt(option.value)
          if (option.type === 'increase') {
            totalPrice *= optionValue / 100 + 1
          } else {
            totalPrice += optionValue
          }
        })
      }
      const hasDecimalPlace = totalPrice - Math.floor(totalPrice) !== 0

      return hasDecimalPlace ? totalPrice.toFixed(2) : totalPrice
    },
    async submit() {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
        this.onOrderCloseEmmit()
      }
    },
    resetForm() {
      this.form = {
        source: '',
        instructions: '',
        numberOfWriters: 1,
        budget: 5,
        options: [],
      }
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
      })
    },
  },
}
</script>

<style scoped lang="scss">
.order {
  position: relative;
  max-width: 1240px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid $secondary;
  background-color: $white;
  &__head {
    position: relative;
    width: 100%;
    height: 130px;
    overflow: hidden;
    &-cover {
      width: 100%;
      min-height: 100%;
      height: auto;
      object-fit: cover;
    }
  }
  &__close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 9px;
    top: 13px;
    width: 37px;
    height: 36px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background-color: $white;
    cursor: pointer;
    transition: opacity 0.3s ease-in 0s;
    will-change: opacity;
    &:hover {
      opacity: 0.9;
    }
    img {
      width: 16px;
    }
  }
  &__hero {
    padding: 11px 10px 12px;
    border-bottom: 1px solid #e2e2ea;
    &-title {
      color: $black;
      font-family: 'Poppins', sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 21px;
    }
    &-link {
      display: inline-block;
      padding: 4px 4px 5px;
      background: $light;
      border-radius: 5px;
      color: #3dd598;
      font-family: 'Roboto', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 10px;
      line-height: 12px;
    }
    &-subtitle {
      margin-top: 10px;
      color: $primary;
      font-family: 'Roboto', sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 10px;
      line-height: 12px;
    }
  }
  &__form {
    $self: &;
    padding: 10px 0 22px;
    &-control {
      padding-left: 10px;
      padding-right: 18px;
      margin-bottom: 10px;
      &-error {
        padding-top: 5px;
        color: $danger;
        font-family: 'Poppins', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 8px;
        line-height: 12px;
        letter-spacing: 0.1px;
      }
    }
    &-row {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-left: 5px;
      padding-right: 12px;
      &-item {
        padding-left: 7px;
        padding-right: 7px;
        &--size-l {
          width: 55%;
        }
        &--size-s {
          width: 45%;
        }
        &--size-w {
          width: 100%;
        }
        #{$self}-control {
          padding-left: 0;
          padding-right: 0;
        }
      }
    }
    &-options {
      margin-top: 15px;
      padding-bottom: 23px;
      &-head {
        margin-bottom: 2px;
        padding: 10px 13px 7px;
        background-color: $secondary;
        color: $text-dark;
        font-family: 'Poppins', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 8px;
        line-height: 12px;
        letter-spacing: 0.1px;
      }
      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        padding: 13px 31px 13px 10px;
        &::after {
          @include pseudo;
          left: 2px;
          right: 2px;
          bottom: 0;
          height: 1px;
          background-color: #e2e2ea;
        }
        &-title {
          padding-right: 10px;
          p,
          span {
            display: inline-block;
            font-family: 'Poppins', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 18px;
            letter-spacing: 0.1px;
          }
          p {
            min-width: 112px;
            color: $text-dark;
          }
          span {
            color: $text-light;
          }
        }
        &:last-of-type {
          &::after {
            display: none;
          }
        }
      }
    }
    &-bottom {
      padding-left: 14px;
      padding-right: 18px;
    }
  }
  @include media-below('xs') {
    &__form {
      &-row {
        display: block;
        &-item {
          padding-left: 0;
          padding-right: 0;
          &--size-l,
          &--size-s {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
