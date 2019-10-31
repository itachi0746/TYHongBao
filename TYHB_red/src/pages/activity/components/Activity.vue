<template>
  <div class="album">
    <div ref="header" class="header">
      <!--<van-nav-bar-->
        <!--title="所有活动"-->
        <!--left-text=""-->
        <!--right-text=""-->
        <!--left-arrow-->
        <!--@click-left="onClickLeft"-->
        <!--@click-right=""-->
      <!--/>-->
    </div>
    <van-pull-refresh v-model="isLoading" disabled @refresh="onRefresh" id="img-box" class="img-box" ref="img-box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <ul ref="img-ul" class="img-ul">
        <li class="img-li" ref="img-li" v-for="(item,index) in list" :key="index">
          <div class="li-box">
            <img :src="item.CMA1_IMG_URL" alt="" class="li-img" v-if="item.CMA1_IMG_URL">
            <img src="../assets/k.png" alt="" class="li-img" v-else="">
            <div class="li-mid">
              <div class="li-mid-top">{{item.CMA1_TITLE}}</div>
              <div class="li-mid-btm">
                <p>{{item.ReferenceValues.CMA1_OWNER_ACCT}}</p>
                <p>{{item.CMA1_START_DATE}}</p>
                <p>{{item.CMA1_ADDRESS}}</p>
              </div>
            </div>
            <div class="li-action">
              <div class="li-btn" @click="clickCheck(item.CMA1_ID)">查 看</div>
            </div>
          </div>
        </li>
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
      list: null,
      loading: false,
      finished: false,
      liHeight: null,
      isLoading: false,
      pageIndex: 1, // 当前页
      pageCount: null // 总页数
    }
  },
  components: {},
  mounted () {
    utils.hasSetRem(this.setImgBoxHeight2)
  },
  created () {
//    const params = utils.getUrlParams()
//    if (process.env.NODE_ENV === 'development') { // 测试用id
//      this.id = '5b8158d60c2d448c8d03591df66c30c9'
//    } else {
//      // 生产环境下的id
//      this.id = params.activityid
//      if (!this.id) {
//        utils.toast(this, '未知活动', 'fail')
//        return
//      }
//    }
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
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
    /**
     * 点击查看
     * param id 活动id
     */
    clickCheck (id) {
      window.GoToPage('', 'index.html', {activityid: id})
    },
    /**
     * 获取数据
     */
    getData () {
      utils.toast(this, '', 'loading')
      const theData = {
        PageIndex: this.pageIndex
      }
      postData('/Activitys', theData).then((res) => {
//        console.log(res)
//        debugger
        utils.toast(this, '', 'clear')
        this.pageCount = res.Data.PageCount
        this.pageIndex = res.Data.PageIndex
        this.loading = false
        this.isLoading = false
        this.list = this.list === null ? res.Data.Models : this.list.concat(res.Data.Models)
        for (let item of this.list) {
          utils.formatObj(item, false)
        }
      })
    },
    onLoad () {
      // 异步更新数据
      //      setTimeout(() => {
      //        for (let i = 0; i < 10; i++) {
      //          this.list.push(this.list.length + 1)
      //        }
      //        // 加载状态结束
      //        this.loading = false
      //
      //        // 数据全部加载完成
      //        if (this.list.length >= 40) {
      //          this.finished = true
      //        }
      //      }, 500)

      if (this.pageCount === this.pageIndex) { // 加载完全部了
        this.finished = true
        this.loading = false
        return
      }
      this.pageIndex++
//      debugger
      this.getData()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .album {
    width: 100%;
    height: 100%;
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
    background-color: #F3EBE1;
  }

  .img-ul {
    /*display: flex;*/
    overflow: hidden;
    li {
      width: 100%;
      @include borderBox();
      padding: 0px 25px;
    }
  }
  .li-box {
    padding: 20px 0;
    border-bottom: 1px solid #E95B3E;
    display: flex;
  }
  .li-img {
    width: 186px;
    height: 186px;
    margin-right: 20px;
    border-radius: 10px;
  }
  .li-mid {
    flex: 1;
    color: #333;
    p {
      padding: 0;
      margin: 0;
    }
  }
  .li-action {
    padding-top: 94px;
  }
  .li-btn {
    width: 112px;
    height: 60px;
    background-color: #E95B3E;
    border-radius: 6px;
    color: #ffffff;
    font-size: 26px;
    @include defaultFlex;
  }
  .li-mid-top {
    font-size: 32px;
    margin-bottom: 20px;
    margin-top: 15px;  }
  .li-mid-btm {
    font-size: 26px;
    p:nth-child(2) {
      margin-top: 19px;
    }
  }
</style>
