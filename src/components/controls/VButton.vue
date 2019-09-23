<template>
  <button class="btn" :class="classes" @click="click">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'VButton',
  props: {
    isWide: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return { 'btn--wide': this.isWide }
    },
  },
  methods: {
    click(e) {
      this.$emit('click', e)
    },
  },
}
</script>

<style lang="scss" scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 44px;
  padding: 0 15px;
  border: 0;
  background: $primary;
  border-radius: 10px;
  color: $white;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity 0.3s ease-in 0s;
  will-change: opacity;
  &:hover {
    opacity: 0.9;
  }
  &__before {
    img {
      height: 22px;
    }
  }
  &__center {
    display: block;
    position: absolute;
    @include center-me;
    padding-left: 10px;
    padding-right: 10px;
  }
  &__after {
    font-size: 14px;
  }
  &--wide {
    width: 100%;
  }
  @include media-below('xs') {
    font-size: 14px;
  }
}
</style>
