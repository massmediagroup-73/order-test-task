<template>
  <div class="field-control">
    <label v-if="label" :for="labelFor">
      {{ label }}
    </label>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VSelect',
  props: {
    label: {
      type: String,
      default: '',
    },
    labelFor: {
      type: String,
      default: '',
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
  & /deep/ {
    .custom-select {
      .vs__search::placeholder,
      .vs__dropdown-toggle,
      .vs__dropdown-menu {
        border: 0;
        border-radius: 5px;
        color: $text-dark;
      }
      .vs__search::placeholder,
      .vs__dropdown-toggle {
        background: $light;
      }
      .vs__dropdown-menu {
        background: $secondary;
      }

      .vs__clear,
      .vs__open-indicator {
        fill: #92929d;
      }
    }
  }
}
</style>
