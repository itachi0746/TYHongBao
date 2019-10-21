<template>
  <div class="album">
    <div ref="header" class="header">
      <van-nav-bar
        title="我的优惠券"
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
          v-if="list.length"
        >
          <ul ref="img-ul" class="img-ul">
            <li class="img-li" ref="img-li" v-for="(item,index) in list" :key="index" @click="toDetail(item.CC05_RCD_ID)">
              <div class="li-box">
                <div class="li-line1">{{item.CC00_COUPON_NAME}}</div>
                <div class="li-line2">
                  <!--{{item.VALUE }}-->
                  <!--<i> 元</i>-->
                  <!--<span class="shuxian">｜</span>-->
                  <i class="shop-name">{{item.BIZ_NAME}}</i>
                </div>
                <!--<div class="li-line3">有效期至{{item.CC00_APPLY_END_DATE}}</div>-->
              </div>
            </li>
          </ul>
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { utils, postData } from '../../../common'
import Empty from '../../../components/Empty.vue'

export default {
  data () {
    return {
      id: null, // 活动id
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      pageIndex: 1, // 当前页
      pageCount: null, // 总页数
      imgObj: { // 不同奖品类型对应不同背景图
        'CMF801': require('../assets/hongbao.png'), // 红包
        'CMF802': require('../assets/quan.png'), // 券
        'CMF803': require('../assets/other.png'), // 其他
        'CMF000': require('../assets/grey.png') // 过期
      }
    }
  },
  components: {Empty},
  mounted () {
    utils.hasSetRem(this.setImgBoxHeight2)
  },
  created () {
    const params = utils.getUrlParams()
    if (process.env.NODE_ENV === 'development') { // 测试用id
      this.id = 'b7be6580608c4f0c942f1ac5594ecc0b'
    } else {
      // 生产环境下的id
      this.id = params.activityid
      if (!this.id) {
        utils.toast(this, '未知活动', 'fail')
        return
      }
    }
    this.getData()
  },
  methods: {
    // 去券详情
    toDetail (id) {
      window.GoToPage('', 'couponDetail.html', {'couponid': id})
    },
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
      if (this.pageCount === this.pageIndex) { // 加载完全部了
        this.finished = true
        this.loading = false
        return
      }
      this.pageIndex++
      this.getData()
    },
    onClickLeft () {
      window.history.back()
    },
    onRefresh () {
//      setTimeout(() => {
//        this.$toast('刷新成功')
//        this.isLoading = false
//      }, 500)
      this.pageIndex = 1
      this.pageCount = null
      this.list = []
      this.getData()
    },
    getData () {
      const data = {
        ActivityId: this.id,
        PageIndex: this.pageIndex
      }
      utils.toast(this, '', 'loading')
      postData('/GetMyCoupons', data).then((res) => {
        console.log(res)
        utils.toast(this, '', 'clear')
        this.pageCount = res.PageCount
        this.pageIndex = res.PageIndex
        this.loading = false
        this.isLoading = false
        this.list = this.list === [] ? res.Data.Models : this.list.concat(res.Data.Models)

        const keyArr = ['CC00_APPLY_END_DATE', 'CC00_APPLY_START_DATE'] // 日期字段
        for (let item of keyArr) {
          for (let obj of this.list) {
            for (let key in obj) {
              if (key === item) { // 找到日期字段
                let theArr = obj[key].split(' ')[0].split('/')
                for (let i = 0; i < theArr.length; i++) {
                  theArr[i] = utils.add0(eval(theArr[i])) // 小于10 加上0前缀
                }
                obj[key] = theArr.join('-') // 赋值
              }
            }
          }
        }
      })
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
    background: url("../assets/quan.png") no-repeat;
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
  .shop-name {
    font-weight: normal;
  }
</style>
