<template>
  <div class="field-control">
    <input
      :id="labelFor"
      :name="name"
      :checked="isChecked"
      :value="variant"
      type="checkbox"
      @change="change"
    />
    <label v-if="label" :for="labelFor">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'VInput',
  model: {
    prop: 'value',
    event: 'change',
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
    name: {
      type: String,
      default: 'text-field',
    },
    value: [Boolean, Array],
    variant: {
      type: [Boolean, Object, String],
      default: false,
    },
    propsAsValue: {
      type: String,
      default: 'id',
    },
  },
  computed: {
    isArray() {
      return Array.isArray(this.value)
    },
    isChecked() {
      if (this.isArray) {
        if (this.variant[this.propsAsValue]) {
          return !!this.value.find(
            item => item[this.propsAsValue] === this.variant[this.propsAsValue]
          )
        } else {
          return this.value.includes(this.variant)
        }
      } else {
        return this.value === this.variant
      }
    },
  },
  methods: {
    change(e) {
      const isChecked = e.target.checked

      if (this.isArray) {
        let newValue = [...this.value]

        if (isChecked) {
          newValue.push(this.variant)
        } else {
          if (this.variant[this.propsAsValue]) {
            newValue.splice(
              newValue.findIndex(
                item =>
                  item[this.propsAsValue] === this.variant[this.propsAsValue]
              ),
              1
            )
          } else {
            newValue.splice(newValue.indexOf(this.variant), 1)
          }
        }
        this.$emit('change', newValue)
      } else {
        this.$emit('change', isChecked)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.field-control {
  position: relative;
  input {
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    padding: 0;
    height: 1px;
    width: 1px;
    opacity: 0;
    & + label {
      display: inline-block;
      font-size: 0;
      cursor: pointer;
      &:before {
        display: block;
        position: relative;
        content: '';
        width: 12px;
        height: 12px;
        border: 2px solid $black;
        border-radius: 50%;
      }
      &:after {
        @include pseudo();
        left: 50%;
        top: 5px;
        height: 6px;
        width: 6px;
        border-radius: 50%;
        background-color: $black;
        transform: translateX(-50%) scale(0);
        opacity: 0;
        transition: transform 0.3s ease 0s, opacity 0.3s ease 0s;
        will-change: opacity;
      }
    }
    &:checked + label {
      &:after {
        transform: translateX(-50%) scale(1);
        opacity: 1;
      }
    }
    &:focus + label {
      outline: 1px dotted #212121;
      outline: 5px auto -webkit-focus-ring-color;
    }
  }
}
</style>
