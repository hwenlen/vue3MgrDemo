<template>
  <div class="global-container">
    <Form class="global-screen" label-position="right" :label-width="70">
      <Row>
        <Col :xs="12" :lg="8" :xxl="6">
          <FormItem label="流水号">
            <Input v-model="formItem.outtransno" placeholder="请输入流水号"></Input>
          </FormItem>
        </Col>
        <Col :xs="12" :lg="8" :xxl="6">
          <FormItem label="收入日期">
            <DatePicker type="datetimerange" v-model="formItem.incomeDate" placeholder="请选择收入日期" />
          </FormItem>
        </Col>
        <Col :xs="12" :lg="8" :xxl="6">
          <FormItem label="订单类型">
            <Select v-model="formItem.orderType">
              <Option v-for="item in orderTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="12" :lg="8" :xxl="6">
          <FormItem label="收入端口">
            <Select v-model="formItem.portType">
              <Option v-for="item in portTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col :xs="12" :lg="16" :xxl="24" class="ivu-text-right">
          <Space direction="vertical">
            <Space wrap>
              <Button @click="screenReset">重 置</Button>
              <Button type="primary" @click="screenSearch">查 询</Button>
            </Space>
          </Space>
        </Col>
      </Row>
    </Form>

    <div class="global-table">
      <Table :columns="tableList.columns" :data="tableList.data"></Table>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { reactive, ref } from 'vue';

const formData = () => ({
  outtransno: '',
  orderType: '',
  portType: '',
  incomeDate: ''
})

const formItem = reactive(formData())

const screenReset = () => {
  Object.assign(formItem, formData());
}

const screenSearch = () => {
  console.log(formItem)
}

const orderTypes = ref([
  {value: 1, label: '商品订单'},
  {value: 2, label: '服务订单'},
])

const portTypes = ref([
  {value: 1, label: '微信'},
  {value: 2, label: '支付宝'},
])

const tableList = reactive({
  columns: [{
    title: '收入时间',
    key: 'incomeDate',
    minWidth: 180
  }, {
    title: '收入端口',
    key: 'incomeType',
    minWidth: 150,
    render: (h: any, params: any) => {
      let text = params.row.incomeType == 1? '微信': '支付宝'
      return h('div', text);
    }
  }, {
    title: '订单类型',
    key: 'orderType',
    minWidth: 130,
    render: (h: any, params: any) => {
      let text = params.row.incomeType == 1? '商品订单': '服务订单'
      return h('div', text);
    }
  }, {
    title: '收入金额(元)',
    key: 'incomeAmount',
    minWidth: 150
  }, {
    title: '流水号',
    key: 'outtransno',
    minWidth:260
  }],
  data: [
    {id: 1, incomeDate: '2023-08-09 12:00:01', incomeType: 1, orderType: 1, incomeAmount: '20', outtransno: '000020231205133830971'},
    {id: 2, incomeDate: '2023-08-09 13:00:01', incomeType: 2, orderType: 1, incomeAmount: '25', outtransno: '000020231205133835246'},
    {id: 3, incomeDate: '2023-08-09 15:06:01', incomeType: 2, orderType: 2, incomeAmount: '10', outtransno: '000020231205133833254'},
    {id: 4, incomeDate: '2023-08-09 16:21:01', incomeType: 1, orderType: 2, incomeAmount: '20', outtransno: '000020231205133837856'},
    {id: 5, incomeDate: '2023-08-09 120:52:01', incomeType: 1, orderType: 1, incomeAmount: '50', outtransno: '000020231205133831458'},
  ]
})

</script>
<style scoped lang='less'>
</style>