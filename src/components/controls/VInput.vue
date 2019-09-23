<template>
  <div class="field-control">
    <label v-if="label" :for="labelFor">
      {{ label }}
    </label>
    <div class="field-control__element">
      <span v-if="currency" class="field-control__element-prepend-figure">
        {{ currency }}
      </span>
      <input
        :id="labelFor"
        :name="name"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :inputmode="inputMode"
        :min="min"
        :max="max"
        :class="{ 'is-with-currency': currency }"
        @input="input"
        @change="change"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VInput',
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    labelFor: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'text-field',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    min: Number,
    max: Number,
    inputMode: {
      type: String,
      default: 'text',
    },
    currency: {
      type: String,
      default: '',
    },
  },
  methods: {
    input(e) {
      this.$emit('input', e.target.value)
    },
    change(e) {
      this.$emit('change', e.target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.field-control {
  &__element {
    position: relative;
    &-prepend-figure {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      color: $text-dark;
      font-family: 'Poppins', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      letter-spacing: 0.1px;
    }
  }
  label {
    display: inline-block;
    color: $text-dark;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.1px;
  }
  input {
    height: 30px;
    width: 100%;
    padding: 0 7px;
    background-color: $light;
    border: 0;
    border-radius: 5px;
    color: $text-dark;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    letter-spacing: 0.1px;
    @include input-placeholder {
      color: $text-light;
      font-family: 'Poppins', sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      letter-spacing: 0.1px;
    }
    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &.is-with-currency {
      padding-left: 26px;
    }
  }
}
</style>
