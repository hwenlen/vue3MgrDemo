<template>
  <div class="home-page">
      <Row  class="introduce-box">
         <i-col span="24" class="sys-box">  系统介绍</i-col>
         <i-col span="24" class="text-box">  该系统是E护通内部专用系统</i-col>
         <i-col span="24" class="text-box">  如有疑问请联系技术部</i-col>
       </Row>
       <div class="dealt-wrap">
         <div class="dealt-top">
           <div class="icon-box">
             <img src="../../../assets/images/dealt.png"/>
           </div>
           <h3>待办事项</h3>
         </div>
         <div class="dealt-content">
           <div class="content-box">
             <div class="cont red">
               <div>订单申诉待处理</div>
               <p>{{delatObj.appealCount}}</p>
             </div>
             <div class="cont">
               <div>问答列表待回复</div>
               <p>{{delatObj.unansweredSum}}</p>
             </div>
             <div class="cont">
               <div>评价待回复</div>
               <p>{{delatObj.noReplySum}}</p>
             </div>
           </div>

         </div>
       </div>
    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'

let delatObj = ref({
  appealCount: '49',
  unansweredSum: '2',
  noReplySum: '27'
})

</script>

<style lang="less">
.home-page {
  margin: -16px;
  .introduce-box {
    background: #ffffff;
    padding: 24px 32px;
  }
  .sys-box {
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    font-size: 20px;
    padding-bottom: 16px;
  }
  .txt-box {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
  }
}

.dealt-wrap{
    width: 384px;
    background: #FFFFFF;
    border-radius: 2px;
    margin-top: 16px;
    margin-left: 16px ;

    .dealt-top {
      display: flex;
      align-items: center;
      height: 64px;
      padding: 0 24px;
      border-bottom: 1px solid #E8E8E8;
      .icon-box{
        width: 32px;
        height: 32px;
        margin-right: 16px;
        img{
          width: 32px;
          height: 32px;
        }
      }
      h3 {
        font-size: 16px;
        color: rgba(0,0,0,0.85);
      }
    }
    .dealt-content{
      padding:24px 24px 32px;
    }
    .content-box{
      display: flex;
      justify-content: space-between;
      color: rgba(0,0,0,0.45);
      font-size: 14px;
      .cont{
        text-align: center;
        line-height: 22px;
        cursor: pointer;
        &.red p{
          color: #F22434;
        }
        p{
          color: #2565FA;
          font-weight: bold;
          font-size: 24px;
          line-height: 32px;
          margin-top: 8px;
        }
      }
    }
  }
</style>
