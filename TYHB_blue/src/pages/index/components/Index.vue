<template>
  <div class="index">
    <div class="top">
      <div class="logo-box"></div>
      <div class="title-box"></div>
      <div class="btn-box">
        <div class="btn" @click="clickGet">领红包</div>
      </div>
      <div class="follow-box" v-if="!hasSubscribe" @click="clickFollow">关注"传行"</div>
    </div>
    <div class="btm">

      <div class="ticket-box" v-if="ticketArr">
        <div class="ticket" v-for="(item,index) in ticketArr" :key="index">
          <div class="ticket-l">
            <div class="ticket-num">
              <i class="ticket-icon">￥</i>
              {{item.VALUE}}
            </div>
          </div>
          <div class="ticket-r">
            <div class="ticket-r-l1">{{item.CC00_COUPON_NAME}}</div>
            <div class="ticket-r-l2">有效期至{{item.CC00_APPLY_END_DATE}}</div>
            <div class="ticket-r-l3">
              <div class="ticket-r-l3-btn" @click="clickReceive(item)" v-if="item.RECEIVE_STATUS===0">立即领取</div>
              <div class="ticket-r-l3-btn" v-else>已领取</div>
            </div>
          </div>
        </div>
      </div>
      <div class="rule-box">
        <div class="rule-title">
          <div class="line">
            <div class="line-font">
              <i>活</i>
              <i>动</i>
              <i>规</i>
              <i>则</i>
            </div>
          </div>
        </div>
        <div class="rule-main" v-html="ruleDetail">

        </div>
      </div>
    </div>
    <div class="btn2">
      <div class="btn2-box" @click="clickMyPrize">
        我的红包
      </div>
      <div class="btn2-box mt20" @click="clickQuan">
        我的优惠券
      </div>
    </div>
    <div class="layer-div" @touchmove.prevent="" v-show="showLayer">
      <div class="kai" v-show="showKai">
        <div>
          <div class="logo-box2">
            <div class="logo-box2-inner">
              <img :src="logoUrl" alt="" v-if="logoUrl">
            </div>
          </div>
          <div class="kai-font">送了一个红包给你</div>
          <div class="kai-btn" @click="clickKai"></div>
        </div>
        <div class="tac">
          <img @click="clickClose" class="cha" src="../assets/cha.png" alt="">
        </div>
      </div>
      <div class="kai2" v-show="showKai2">
        <div>
          <div class="kai2-money-box">
            <div class="kai2-money">
              <!--<div class="money-box">-->
                <!--<span>200</span>-->
                <!--<span>元</span>-->
              <!--</div>-->
            </div>
          </div>
          <div class="kai2-mid">
            <div>恭喜你获得</div>
            <div>{{redNum}}元红包</div>
          </div>
          <div class="kai2-btm">
            <div class="kai2-btn" @click="clickKnow">我知道了</div>
          </div>
        </div>
      </div>
      <div class="kai3" v-show="showKai3">
        <div>
          <img src="../assets/cha.png" alt="" class="cha-s" @click="clickClose">
          <div class="kai3-font1">领取成功！</div>
          <div class="kai3-font2">可到“我的红包”页面查看</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utils, postData } from '../../../common'
import {ImagePreview} from 'vant'

export default {
  data () {
    return {
      id: null, // 活动id
      showLayer: false, // 弹窗
      showKai: true,
      showKai2: false,
      showKai3: false,
      logoUrl: null, // 酒店logo图片
      ruleDetail: null, // 活动规则说明
      ticketArr: null, // 优惠券数组
      redNum: null, // 红包数值
      hasSubscribe: true, // 有没有关注公众号
      theImgUrl: '' // 公众号图片
    }
  },
  components: {},
  methods: {
    /**
     * 点击关闭
     */
    clickClose () {
      this.showLayer = false
    },
    /**
     * 点击领取
     */
    clickGet () {
      this.showLayer = true
    },
    /**
     * 点击开红包
     */
    async clickKai () {
      utils.toast(this, '', 'loading')
      let theData = {}
      theData = await utils.weichatLatAndLon()
      theData['ActivityId'] = this.id
      postData('/DoDraw', theData).then((res) => {
        console.log(res)
        utils.toast(this, '', 'clear')
        this.redNum = res.Data.CMF3_VALUE
        this.showKai = false
        this.showKai2 = true
      })
    },
    /**
     * 点击知道了 按钮
     */
    clickKnow () {
      this.showKai2 = false
      this.showKai3 = true
    },
    /**
     * 点击我的奖品
     */
    clickMyPrize () {
      window.GoToPage('', 'myPrize.html', {'activityid': this.id})
    },
    clickQuan () {
      window.GoToPage('', 'coupon.html', {'activityid': this.id})
    },
    /**
     * 点击关注
     */
    clickFollow () {
      if (this.theImgUrl) {
        ImagePreview([
          this.theImgUrl
        ])
      }
    },
    getData () {
      const data = {
        'ActivityId': this.id
      }
      utils.toast(this, '', 'loading')
      postData('/ActivityInfo', data).then((res) => { // 活动信息
        console.log(res)
        //      utils.toast(this, '', 'clear')
        this.ruleDetail = res.Data.CMA1_CONTENT
        this.logoUrl = res.Data.CMA1_LOGO_URL
        if (res.Data.CMA1_TITLE) {
          document.title = res.Data.CMA1_TITLE
        }
      }).then(() => {
        this.getBizCoupon()
      })
      postData('/IsSubscribe', {}).then((res) => { // 有没有关注公众号
        console.log(res)
        this.hasSubscribe = res.Data.HasSubscribe
        this.theImgUrl = res.Data.Image
      })
    },
    /**
     * 获取商家优惠券信息
     */
    getBizCoupon () {
      utils.toast(this, '', 'loading')
      const data = {
        'ActivityId': this.id
      }
      postData('/GetBizCoupon', data).then((res) => {
        console.log(res)
        utils.toast(this, '', 'clear')
        this.ticketArr = res.Data
        for (let item of this.ticketArr) {
          utils.formatObj(item, false)
        }
      })
    },
    /**
     * 点击领取优惠券
     * @param item 优惠券对象
     */
    clickReceive (item) {
      utils.toast(this, '', 'loading')
      const data = {
        'ActivityId': this.id,
        'CouponId': item.CC00_COUPON_ID
      }
      postData('/ReceiveCoupon', data).then((res) => {
        console.log(res)
        utils.toast(this, '领取成功')
        item.RECEIVE_STATUS = 1
      })
    }
  },
  mounted () {

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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .index {
    background-color: #3E50B4;
  }

  .top {
    background: url("../assets/topbg.png") no-repeat;
    background-size: 100% 100%;
    height: 889px;
    position: relative;
  }

  .logo-box {
    position: absolute;
    top: 27px;
    left: 0;
    background: url("../assets/logobg.png") no-repeat;
    background-size: 100% 100%;
    width: 324px;
    height: 76px;
  }

  .title-box {
    position: absolute;
    left: 42px;
    top: 168px;
    background: url("../assets/title.png") no-repeat;
    background-size: 100% 100%;
    width: 667px;
    height: 130px;
  }

  .follow-box {
    position: absolute;
    right: 0;
    top: 34px;
    color: #FFFEFE;
    font-size: 28px;
    width: 196px;
    height: 72px;
    background-color: #3E50B4;
    border-top-left-radius: 36px;
    border-bottom-left-radius: 36px;
    @include defaultFlex;
  }

  .btm {
    width: 710px;
    border-radius: 16px;
    background-color: #3E50B4;
    margin: 0 auto;
    padding-top: 60px;
    overflow-x: hidden;

  }

  .btn-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .btn {
    width: 485px;
    height: 90px;
    background: url("../assets/btnbg.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
    @include defaultFlex;
    font-weight: 600;
    margin: 0 auto;
  }

  .ticket-box {
    padding: 0 21px;
  }

  .ticket {
    height: 224px;
    width: 100%;
    background: url("../assets/quan.png") no-repeat;
    background-size: 100% 100%;
    margin-bottom: 20px;
    display: flex;
    color: #555FE5;
  }

  .ticket-r {
    width: 382px;
    height: 100%;
    @include borderBox();
    padding: 30px 0;
    font-size: 34px;
    text-align: center;
    font-weight: bold;

  }
  .ticket-r-l1 {
    font-size: 36px;
    font-weight: bold;
  }
  .ticket-r-l2 {
    font-size: 24px;
    margin: 5px 0 10px;
  }
  .ticket-r-l3 {
    display: flex;
    justify-content: center;
  }
  .ticket-r-l3-btn {
    width: 207px;
    height: 66px;
    background-color: #555FE5;
    color: #fff;
    @include defaultFlex;
    font-size: 26px;
  }

  .ticket-m {
    width: 276px;
    height: 100%;
    @include defaultFlex;
    font-weight: 500;

  }

  .m-box div:nth-child(1) {
    font-size: 36px;
    margin-bottom: 20px;
  }

  .m-box div:nth-child(2) {
    font-size: 24px;
  }

  .ticket-l {
    width: 277px;
    height: 100%;
    position: relative;
    color: #FFCB32;
  }

  .ticket-num {
    font-size: 88px;
    @include center;
    left: 60%;
    font-family: 'fzztjw';

  }

  .ticket-icon {
    position: absolute;
    left: -40px;
    bottom: 13px;
    font-size: 42px;
    font-weight: bold;
  }

  .rule-box {
    padding: 60px 0 0px;
  }

  .line {
    width: 652px;
    height: 76px;
    background: url("../assets/linebg.png") no-repeat;
    background-size: 100% 100%;
  }

  .rule-title {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 32px;
    margin-bottom: 30px;
  }
  .line-font {
    width: 265px;
    height: 76px;
    margin: 0 auto;
    letter-spacing: 30px;
    @include defaultFlex;
    @include borderBox();
    padding-left: 28px;
  }

  .rule-title > div:nth-child(2) {
    /*padding: 0 30px;*/
    min-width: 120px;
    padding: 0 20px;
    white-space: nowrap;
  }
  .rule-main {
    font-size: 28px;
    color: #fff;
    padding: 53px 34px 64px;
    background-color: #243593;
    border-radius: 20px;

    /deep/ *{
      padding:0;
      margin:0;
      font-size: 28px!important;
      color: #fff!important;
      background-color: transparent!important;

    }
    /deep/ img {
      max-width: 100%!important;
      /*max-height: 100%;*/
    }
  }
  .btn2 {
    padding: 60px 0 120px;
    /*display: flex;*/
    /*justify-content: center;*/
  }
  .btn2-box {
    width: 402px;
    height: 90px;
    background: url("../assets/btnbg.png") no-repeat;
    background-size: 100% 100%;
    @include defaultFlex;
    font-size: 36px;
    color: #ffffff;
    font-weight: bold;
    margin: 0 auto;
    white-space:nowrap;
  }
  .layer-div {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background: rgba(0,0,0,0.3);
  }
  .kai, .kai2, .kai3 {
    @include center;
  }
  .kai2 {
    width: 100%;
    top: 35%;
    @include defaultFlex;
  }
  .kai > div:nth-child(1) {
    position: relative;
    margin-bottom: 42px;
    width: 552px;
    height: 740px;
    background: url("../assets/kai.png") no-repeat;
    background-size: 100% 100%;
  }
  .kai2 > div:nth-child(1) {
    position: relative;
    width: 100%;
    height: 1026px;
    background: url("../assets/kai2.png") no-repeat;
    background-size: 100% 100%;
  }
  .kai3 > div:nth-child(1) {
    position: relative;
    width: 492px;
    height: 350px;
    background: url("../assets/kai3.png") no-repeat;
    background-size: 100% 100%;
  }
  .kai-btn {
    position: absolute;
    width: 163px;
    height: 163px;
    left: 195px;
    top: 435px;
  }
  .kai .img1 {
    margin-bottom: 42px;
    width: 552px;
  }
  .kai .cha {
    width: 72px;
  }
  .tac {
    text-align: center;
  }
  .logo-box2 {
    position: relative;
    top: 129px;
    display: flex;
    justify-content: center;
    img {
      max-height: 100%;
    }
  }
  .logo-box2-inner {
    width: 391px;
    height: 72px;
    background: url("../assets/logoBg2.png") no-repeat;
    background-size: 100% 100%;
  }
  .kai-font {
    font-size: 36px;
    color: #fff;
    margin-top: 30px;
    text-align: center;
    position: relative;
    top: 130px;
  }
  .kai2-money-box {
    display: flex;
    justify-content: center;
    margin-bottom: 250px;
  }
  .kai2-money {
    width: 305px;
    height: 268px;
    @include defaultFlex;
    color: #B15A23;
    margin-top: 80px;
  }
  .money-box {
    position: relative;
    span:nth-child(1) {
      font-size: 80px;
    }
    span:nth-child(2) {
      font-size: 40px;
    }
  }
  .kai2-mid {
    color: #fff;
    text-align: center;
    div:nth-child(1) {
      font-size: 36px;
      margin-bottom: 32px;
    }
    div:nth-child(2) {
      font-size: 48px;
    }
  }
  .kai2-btm {
    margin-top: 90px;
    @include defaultFlex;
    .kai2-btn {
      width: 402px;
      height: 96px;
      background: url("../assets/btnbg2.png") no-repeat;
      background-size: 100% 100%;
      @include defaultFlex;
      color: #fff;
      font-size: 36px;
      /*font-weight: bold;*/
    }
  }
  .kai3 {
    text-align: center;
  }
  .cha-s {
    width: 72px;
    z-index: 10;
    @include center;
    top: 120%;
  }
  .kai3-font1 {
    color: #fff;
    font-size: 36px;
    position: relative;
    top: 200px;
  }
  .kai3-font2 {
    color: #fff;
    font-size: 28px;
    position: relative;
    top: 223px;
  }
</style>
