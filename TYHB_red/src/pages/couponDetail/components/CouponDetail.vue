<template>
  <div class="album">
    <div ref="header" class="header">
      <van-nav-bar
        title="优惠券详情"
        left-text=""
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right=""
      />
      </div>
    <div id="img-box" class="img-box" ref="img-box">
      <!--使用规则,使用时间,可分享-->
      <div class="main-box">
        <div class="main-box-inner">
          <div class="c-detial">
            <!--<div class="c-detial-logo-box">-->
              <!--<span class="c-detial-logo" :style="{'backgroundImage':logoUrl}">-->
              <!--</span>-->
            <!--</div>-->
            <div class="c-detial-name">{{cName}}</div>
            <div class="c-detial-shop">{{sName}}</div>
            <div class="c-detial-desc">
              {{cDesc}}
            </div>
            <div class="c-detial-time">使用时间: {{startTime}} 至 {{endTime}}</div>
          </div>
          <div class="tips">
            温馨提示: 可截图分享优惠券
          </div>
        </div>
      </div>
    </div>
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
      },
      logoUrl: '',
      cName: '', // 优惠券名字
      sName: '', // 商家名字
      cDesc: '', // 优惠券描述
      startTime: '',
      endTime: ''
    }
  },
  components: {
    Empty
  },
  mounted () {
    utils.hasSetRem(this.setImgBoxHeight2)
  },
  created () {
    const params = utils.getUrlParams()
//    if (process.env.NODE_ENV === 'development') { // 测试用id
//      this.id = 'e23e2ac9c28b4fffb0069a5330c9edc9'
//    } else {
//      // 生产环境下的id
//      this.id = params.couponid
//      if (!this.id) {
//        utils.toast(this, '未知活动', 'fail')
//        return
//      }
//    }
    this.id = params.couponid
    if (!this.id) {
      utils.toast(this, '未知id', 'fail')
      return
    }
    this.getData()
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
    onClickLeft () {
      window.history.back()
    },
    getData () {
      const data = {
        id: this.id
      }
      utils.toast(this, '', 'loading')
      postData('/GetCouponDetial', data).then((res) => {
        console.log(res)
        utils.toast(this, '', 'clear')
        this.cName = res.Data.CC00_COUPON_NAME
        this.sName = res.Data.BIZ_NAME
        this.cDesc = res.Data.DESC
        this.startTime = utils.handleTime(res.Data.CC00_APPLY_START_DATE)
        this.endTime = utils.handleTime(res.Data.CC00_APPLY_END_DATE)
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
    display: flex;
    align-items: baseline;
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
  .shuxian {
    font-weight:normal;
    font-size: 35px;
    position: relative;
    bottom: 5px;
  }
  .shop-name {
    font-weight: normal;
  }
  .main-box {
    padding: 20px;
    /*background-color: #fff;*/
    width: 100%;
    height: 100%;
    @include borderBox();
  }
  .main-box-inner {
    width: 100%;
    /*height: 100%;*/
  }
  .c-detial-shop {
    font-size: 30px;
    color: #fff;
    margin-bottom: 20px;
    margin-top: 20px;

  }
  .c-detial-name {
    font-size: 55px;
    color: #fff;
  }
  .c-detial {
    text-align: center;
    padding-top: 50px;
    background-color: #5885cf;
    border-radius: 20px;

  }
  .c-detial-logo-box {
    /*height: 70px;*/
    margin-top: 30px;
    text-align: center;
    padding-top: 10px;
  }
  .c-detial-logo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #000000;
    display: inline-block;
  }
  .c-detial-desc {
    font-size: 35px;
    color: #fff;
    margin-top: 20px;
    padding: 0 20px;
    white-space: pre-line;
  }
  .c-detial-time {
    text-align: right;
    margin-top: 20px;
    font-size: 30px;
    color: #fff;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-top: 50px;
  }
  .tips {
    color: #666;
    font-size: 25px;
    text-align: right;
    padding-top: 10px;
    padding-right: 20px;
  }
</style>
