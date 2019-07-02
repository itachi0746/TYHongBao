<template>
  <div>
    <van-nav-bar
      title="相册"
      left-text="返回"
      right-text="上传"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  components: {},

  computed: {},

  methods: {
    onClickLeft () {
      Toast('返回')
    },
    onClickRight () {
      Toast('按钮')
    }
  },

  created () {
  },

  mounted () {
  },

  beforeDestroy () {
  }
}
</script>

<style lang='scss' scoped>

</style>
