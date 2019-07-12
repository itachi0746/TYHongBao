<template>
  <div class="empty">
    <div class="center">
      <img src="../assets/empty.png" alt="">
      <div>空空如也</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {},

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .empty {
    width: 100%;
    height: 500px;
    img {
      margin-bottom: 20px;
    }
  }
  .center {
    @include center;
  }
</style>
