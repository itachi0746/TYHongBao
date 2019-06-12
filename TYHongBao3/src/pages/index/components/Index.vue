<template>
  <div class="index">
    <div class="top">
      <div class="logo-box"></div>
      <!--<div class="title-box"></div>-->

      <div class="follow-box">关注"传行"</div>
    </div>
    <div class="btn-box">
      <div class="btn" @click="clickGet">领红包</div>
      <div class="tuxing1"></div>
      <div class="tuxing2"></div>
    </div>
    <div class="btm">

      <div class="ticket-box">
        <div class="ticket">
          <div class="ticket-l">
            <div class="ticket-num">
              <i class="ticket-icon">￥</i>
              200
            </div>
          </div>
          <div class="ticket-r">
            <div class="ticket-r-l1">优惠券</div>
            <div class="ticket-r-l2">有效期至2019-5-22</div>
            <div class="ticket-r-l3">
              <div class="ticket-r-l3-btn">立即领取</div>
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
        <div class="rule-main">

          1、本次秒杀活动为中国电信天翼用户专享。
          2、活动期间使用任何舞弊行为的用户一经发现，即刻取消秒杀活动资格。
          3、每日秒杀的礼品数量有限，秒完即止。秒杀礼品库存数量在秒杀过程中实时变化，秒杀成功与否以实际结果为准。
          4、每名用户每天可成功参与一次秒杀，活动期间每名用户最高可成功秒杀5次。
          5、在成功秒杀后，用户需提供真实信息。如因用户资料不全导致活动奖品无法正确发放的情况，主办方不对由此产生的任何后果负责。
          6、所有礼品将在活动结束后的15个工作日内免费寄出。
          7、本活动最终解释权归中国电信天翼爱游戏所有。

        </div>
      </div>
    </div>
    <div class="btn2">
      <div class="btn2-box" @click="clickMyPrize">
        我的奖品
      </div>
      <div class="tuxing3"></div>
      <div class="tuxing4"></div>
    </div>
    <div class="layer-div" @touchmove.prevent="" v-show="showLayer">
      <div class="kai" v-show="showKai">
        <div>
          <div class="logo-box2">
            <div class="logo-box2-inner"></div>
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
              <div class="money-box">
                <span>200</span>
                <span>元</span>
              </div>
            </div>
          </div>
          <div class="kai2-mid">
            <div>恭喜你获得</div>
            <div>200元红包</div>
          </div>
          <div class="kai2-btm">
            <div class="kai2-btn" @click="clickKnow">我知道了</div>
          </div>
        </div>
        <div class="tac">
          <img @click="clickClose" class="cha" src="../assets/cha.png" alt="">
        </div>
      </div>
      <div class="kai3" v-show="showKai3">
        <div>
          <img src="../assets/cha.png" alt="" class="cha-s" @click="clickClose">
          <div class="kai3-font1">领取成功!</div>
          <div class="kai3-font2">可到“我的奖品”页面查看</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utils, postData } from '../../../common'

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
    clickKai () {
      this.showKai = false
      this.showKai2 = true
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
      window.GoToPage('', 'myPrize.html', {})
    },
    /**
     * 点击签到
     */
    clickSign () {
      utils.toast(this, '', 'loading')
      let posObj = utils.getLocation()
      // todo 判断经纬度对象是否为空
      let theData = {
        ActivityId: this.id,
        latitude: posObj.lat + '',
        longitude: posObj.lng + ''
      }
      postData('/SignInActivity', theData).then((res) => {
        console.log(res)
        utils.toast(this, '', 'clear')
        this.showLayer = true
      })
    }
  },
  mounted () {

  },
  created () {
    const params = utils.getUrlParams()
    this.id = params.activityid
    if (!this.id) {
      utils.toast(this, '未知活动', 'fail')
      return
    }
    utils.toast(this, '', 'loading')
    postData('/ActivityInfo', {'ActivityId': this.id}).then((res) => {
      console.log(res)
      utils.toast(this, '', 'clear')
      this.ruleDetail = res.Data.CMA1_CONTENT
      this.logoUrl = res.Data.CMA1_LOGO_URL
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .index {
    background-color: #FEFAEE;
  }

  .top {
    background: url("../assets/topbg.png") no-repeat;
    background-size: 100% 100%;
    height: 800px;
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
    background-color: #976E1D;
    border-top-left-radius: 36px;
    border-bottom-left-radius: 36px;
    @include defaultFlex;
  }

  .btm {
    width: 710px;
    border-radius: 16px;
    /*background-color: #FEFAEE;*/
    margin: 0 auto;
    padding-top: 60px;
  }

  .btn-box {
    width: 100%;
    margin-top: 50px;
    position: relative;
  }

  .btn {
    width: 485px;
    height: 90px;
    background: url("../assets/btnbg.png") no-repeat;
    background-size: 100% 100%;
    color: #86552A;
    @include defaultFlex;
    font-weight: bold;
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
    color: #743408;
  }

  .ticket-r {
    width: 382px;
    height: 100%;
    @include borderBox();
    padding: 30px 0;
    font-size: 34px;
    text-align: center;
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
    /*background-color: #555FE5;*/
    background: url("../assets/lingqu.png") no-repeat;
    background-size: 100% 100%;
    color: #333;
    @include defaultFlex;
    font-size: 26px;
  }

  .ticket-m {
    width: 276px;
    height: 100%;
    @include defaultFlex;
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
    color: #86552A;
  }

  .ticket-num {
    font-size: 88px;
    @include center;
    left: 60%;
  }

  .ticket-icon {
    position: absolute;
    left: -40px;
    bottom: 13px;
    font-size: 42px;
    font-weight: bold;
  }

  .rule-box {
    padding: 60px 0 55px;
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
    color: #86552A;
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
    color: #333;
    padding: 53px 34px 64px;
    background-color: #F1E0B3;
    border-radius: 20px;
    border: 8px solid #B09251;
    @include borderBox();

    /deep/ *{
      padding:0;
      margin:0;
      font-size: 28px;
      color: #fff;
    }
  }
  .btn2 {
    padding: 60px 0 120px;
    display: flex;
    justify-content: center;
    position: relative;
  }
  .btn2-box {
    width: 402px;
    height: 90px;
    background: url("../assets/btnbg.png") no-repeat;
    background-size: 100% 100%;
    @include defaultFlex;
    font-size: 36px;
    color: #86552A;
    font-weight: bold;
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
    /*width: 100%;*/
    /*top: 35%;*/
//    @include defaultFlex;
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
    width: 552px;
    margin-bottom: 42px;
    height: 740px;
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
  .kai2 .cha {
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
    /*margin-bottom: 250px;*/
  }
  .kai2-money {
    width: 305px;
    height: 268px;
    @include defaultFlex;
    color: #B15A23;
    margin-top: 40px;
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
      color: #86552A;
      font-size: 36px;
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
    color: #86552A;
    font-size: 36px;
    position: relative;
    top: 200px;
  }
  .kai3-font2 {
    color: #86552A;
    font-size: 28px;
    position: relative;
    top: 223px;
  }
  .tuxing1 {
    width: 87px;
    height: 84px;
    background: url("../assets/tuxing1.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .tuxing2 {
    width: 63px;
    height: 126px;
    background: url("../assets/tuxing2.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .tuxing3 {
    width: 98px;
    height: 183px;
    background: url("../assets/tuxing3.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .tuxing4 {
    width: 80px;
    height: 121px;
    background: url("../assets/tuxing4.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    bottom: 0;
  }
</style>
