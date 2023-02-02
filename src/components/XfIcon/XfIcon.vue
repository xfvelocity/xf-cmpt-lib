<script lang="ts">
import { defineComponent, h } from "vue";
import InlineSvg from "vue-inline-svg";

export default defineComponent({
  props: {
    src: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
    },
  },
  emits: ["click"],
  setup(props, context) {
    return () =>
      h(InlineSvg, {
        src: new URL(props.src, import.meta.url).href,
        height: props.size,
        width: props.size,
        onClick: (event: Event) => context.emit("click", event),
      });
  },
});
</script>

<style lang="scss" scoped>
@each $name, $colour in $xf-colours {
  .yd-icon-colour {
    &-stroke-#{$name} {
      :deep(path),
      :deep(rect) {
        stroke: #{$colour} !important;
      }
    }

    &-#{$name} {
      :deep(path),
      :deep(rect) {
        fill: #{$colour} !important;
      }
    }
  }
}
</style>
