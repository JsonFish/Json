import { defineComponent } from 'vue'

interface Props {
  prefix: string
  name: string
  color: string
  width: string
  height: string
}

export default defineComponent({
  props: {
    prefix: {
      type: String,
      default: '#icon-',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '16px',
    },
    height: {
      type: String,
      default: '16px',
    },
  },
  setup(props: Props) {
    return () => (
      <svg style={{ width: props.width, height: props.height }}>
        <use xlinkHref={`${props.prefix}${props.name}`} fill={props.color} />
      </svg>
    )
  },
})
