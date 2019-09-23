<template>
  <div class="field-control">
    <label v-if="label" :for="labelFor">
      {{ label }}
    </label>
    <textarea
      :id="labelFor"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      :inputmode="inputMode"
      @input="input"
      @change="change"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'VTextarea',
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
      default: 'textarea-field',
    },
    value: {
      type: String,
      default: '',
    },
    inputMode: {
      type: String,
      default: 'text',
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
  textarea {
    resize: none;
    min-height: 50px;
    width: 100%;
    padding: 7px;
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
  }
}
</style>
