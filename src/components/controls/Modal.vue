<template>
  <transition name="fade">
    <div class="modal" role="dialog">
      <div
        ref="overlay"
        class="modal__overlay"
        @click="closeModalOnOverlayClick"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show(value) {
      if (value) {
        document.addEventListener('keyup', this.closeByEscKeyPress)
      } else {
        document.removeEventListener('keyup', this.closeByEscKeyPress)
      }
    },
  },
  methods: {
    closeByEscKeyPress(e) {
      e.keyCode === 27 && this.close()
    },
    close() {
      this.$emit('onModalClose')
    },
    closeModalOnOverlayClick(e) {
      if (e.target === this.$refs.overlay) this.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &__overlay {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 13px 44px 36px;
    background-color: rgba(255, 255, 255, 0.6);
    overflow-y: auto;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
