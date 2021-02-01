import BackTop from 'components/content/backTop/BackTop'


export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isBackTopShow: false
    }
  },
  methods: {
    backTopClick() {
      this.$refs.wrapper.scrollTo(0, 0, 500)
    },
    backTopShow(pos) {
      this.isBackTopShow = -pos.y > 1000
    }
  }
}