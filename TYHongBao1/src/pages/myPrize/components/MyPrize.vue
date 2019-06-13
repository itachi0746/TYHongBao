<template>
  <div class="album">
    <div ref="header" class="header">
      <van-nav-bar
        title="我的奖品"
        left-text=""
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right=""
      />
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" id="img-box" class="img-box" ref="img-box">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <ul ref="img-ul" class="img-ul">
            <li class="img-li" ref="img-li" v-for="(item,index) in list" :key="index">
              <div class="li-box">
                <div class="li-line1">现金红包</div>
                <div class="li-line2">
                  888
                  <i>元</i>
                </div>
                <div class="li-line3">有效期至2019-5-22</div>
              </div>
            </li>
            <!--<li class="img-li" ref="img-li" v-for="(item,index) in list" :key="index">-->
              <!--<div class="li-box">-->
                <!--<div class="li-line1">{{item.CMF3_PRIZE_NAME}}</div>-->
                <!--<div class="li-line2">-->
                  <!--{{item.CMF3_VALUE}}-->
                  <!--<i>元</i>-->
                <!--</div>-->
                <!--<div class="li-line3">有效期至{{item.CMF3_USED_TIME}}</div>-->
              <!--</div>-->
            <!--</li>-->
          </ul>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { utils, postData } from '../../../common'

export default {
  data () {
    return {
      id: null, // 活动id
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      pageIndex: 1 // 当前页
    }
  },
  components: {},
  mounted () {
    this.setImgBoxHeight2()
  },
  created () {
    const params = utils.getUrlParams()
    this.id = params.activityid
    if (!this.id) {
      utils.toast(this, '未知活动', 'fail')
      return
    }
    const data = {
      ActivityId: this.id,
      PageIndex: this.pageIndex
    }
    utils.toast(this, '', 'loading')
    postData('/MyActivityPrizes', data).then((res) => {
      console.log(res)
      utils.toast(this, '', 'clear')
      this.list = res.Data.IList
      for (let item of this.list) { // 格式化时间
        utils.formatObj(item, false)
      }
    })
  },
  methods: {
    /**
     * @method 设置滚动容器的高度
     */
    setImgBoxHeight2 () {
      let windowHeight = document.body.clientHeight
      let headerHeight = this.$refs.header.offsetHeight
      console.log(`windowHeight: ${windowHeight}, headerHeight: ${headerHeight}`)
//      this.$refs['img-box'].style.height = (windowHeight - headerHeight) + 'px'
      let imgBox = document.getElementById('img-box')
      imgBox.style.height = (windowHeight - headerHeight) + 'px'
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    onClickLeft () {
      window.history.back()
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .album {
    width: 100%;
    background-color: #F5F0F0;
  }

  .header {
    position: relative;
  }

  .uploader-box {
    position: absolute;
    right: 0.75rem;
    top: 12px;
    z-index: 1;
  }

  .img-box {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
  }

  .img-ul {
    /*display: flex;*/
    overflow: hidden;
    li {
      width: 100%;
      @include borderBox();
      padding: 18px 25px;
    }
  }
  .li-box {
    height: 208px;
    width: 100%;
    background: url("../assets/hongbao.png") no-repeat;
    background-size: 100% 100%;
    @include borderBox();
    color: #fff;
    position: relative;
  }
  .li-line1 {
    font-size: 46px;
    position: absolute;
    top: 50px;
    left: 70px;
  }
  .li-line2 {
    font-size: 46px;
    font-weight: bold;
    position: absolute;
    top: 120px;
    left: 70px;
    i {
      font-size: 26px;
    }
  }
  .li-line3 {
    font-size: 26px;
    position: absolute;
    right: 30px;
    bottom: 30px;
  }
</style>
