{#if visible}
<div class="mask" transition:fade="{{duration: 100}}" on:click|stopPropagation|preventDefault|self="{hide}">
  <div class="picker" transition:fly="{{ y: 500, duration: 200 }}">
    <div class="top_bar">
      <button class="btn cancel" on:click="{cancelSelect}">{cancelText}</button>
      <button class="btn confirm" on:click="{confirmSelect}">{confirmText}</button>
    </div>
    <div class="select_row">
      <span class="connector left">-</span>
      <span class="connector right">-</span>
    </div>
    <div class="content">
      <Column list="{years}" defaultValue="{selectedYear}" on:select="{selectYear}" />
      <Column list="{months}" defaultValue="{selectedMonth}" on:select="{selectMonth}" />
      <Column list="{days}" defaultValue="{selectedday}" on:select="{selectDay}" />
    </div>
  </div>
</div>
{/if}


<script lang="ts">
  import { onMount } from 'svelte'
  import { fly, fade } from 'svelte/transition'
  import dayjs from 'dayjs'
  import Column from './Column.svelte'
  import { createList } from './share'

  let visible: boolean = false

  export let startDate: Date = new Date('1960-01-01')
  export let endDate: Date = new Date('2050-12-31')

  export let value: string = ''

  export let format: string = 'YYYY-MM-DD'

  export let confirmText: string = '确定'
  export let cancelText: string = '取消'


  let years: number[] = []
  let months: number[] = []
  let days: number[] = []


  let startYear: number = startDate.getFullYear()
  let startMonth: number = startDate.getMonth() + 1
  let startday: number = startDate.getDate()

  let endYear: number = endDate.getFullYear()
  let endMonth: number = endDate.getMonth() + 1
  let endday: number = endDate.getDate()


  let selectedYear: number
  let selectedMonth: number
  let selectedday: number

  years = createList(startYear, endYear)
  months = createList(startMonth, endMonth)
  days = createList(1, endday)

  function initYear (defaultDate: Date = new Date()) {
    return new Promise((resolve, reject) => {
      let year: number = defaultDate.getFullYear()
      if (year <= startYear) {
        selectedYear = startYear
      } else if (year >= endYear) {
        selectedYear = endYear
      } else {
        selectedYear = year
      }
      resolve(selectedYear)
    })
  }

  function initMonth (defaultDate?: Date) {
    return new Promise((resolve, reject) => {
      let month: number = defaultDate !== undefined ? defaultDate.getMonth() + 1 : 1
      if (selectedYear === startYear) {
        months = createList((startMonth), 12)
        selectedMonth = month <= startMonth ? startMonth : month
      } else if (selectedYear === endYear) {
        months = createList(1, endMonth)
        selectedMonth = month >= endMonth ? endMonth : month
      } else {
        months = createList(1, 12)
        if (defaultDate !== undefined) selectedMonth = month
      }
      resolve(selectedMonth)
    })
  }

  function initDays (defaultDate?: Date) {
    return new Promise((resolve, reject) => {
      let len: number = new Date(selectedYear, selectedMonth, 0).getDate()
      if (selectedYear === endYear && selectedMonth === endMonth) {
        // 最后一个月
        days = createList(1, endday)
        selectedday = selectedday && selectedday >= endday ? endday : selectedday
      } else if (selectedYear === startYear && selectedMonth === startMonth) {
        // 第一个月
        days = createList(startday, len)
        selectedday = selectedday && selectedday <= startday ? startday : selectedday
      } else {
        days = createList(1, len)
        if (defaultDate !== undefined) {
          selectedday = defaultDate.getDate()
        }
      }
      resolve(selectedday)
      // console.log('selectedday', selectedday)
    })
  }

  async function initDetault (date: Date) {
    await initYear(date)
    await initMonth(date)
    await initDays(date)
  }

  async function selectYear(e: any) {
    selectedYear = e.detail
    await initMonth()
    await initDays()
  }
  async function selectMonth(e: any) {
    selectedMonth = e.detail
    await initDays()
  }
  function selectDay(e: any) {
    selectedday = e.detail
  }

  function confirmSelect () {
    value = dayjs(new Date(selectedYear, selectedMonth - 1, selectedday)).format(format)
    hide()
  }

  function cancelSelect () {
    hide()
  }

  export function hide () {
    visible = false
  }

  export function show () {
    visible = true
  }

  onMount(() => {
    if (value !== '') {
      if (startDate.getTime() > new Date(value).getTime()) {
        throw new Error('your default date is earlyer than your start date')
      } else if (endDate.getTime() < new Date(value).getTime()) {
        throw new Error('your default date is later than your end date')
      }
      initDetault(new Date(value))
    } else {
      initDetault(new Date())
    }
  })

  $: if (visible) {
    if (value !== '') {
      initDetault(new Date(value))
    } else {
      initDetault(new Date())
    }
  }
</script>






<style>
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .mask{
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 100000;
    background-color: var(--mask-color, rgba(0, 0, 0, .4));
  }
  .picker{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1000000;
    width: 100%;
    height: 40%;
    background-color: var(--picker-background-color, #fff);
    overflow: hidden;
  }

  .content{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  
  .top_bar{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 15;
    width: 100%;
    height: 6vh;
    padding: 0 3vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--picker-background-color, #fff);
    border-bottom: 1px solid #ddd;
  }

  .btn{
    font: 2vh/6vh "Microsoft Yahei";
    /* color: #212121; */
    background-color: transparent;
    border: 0;
    outline: 0;
  }
  .btn.confirm{
    color: var(--confirm-text-color, #212121);
  }
  .btn.cancel{
    color: var(--cancel-text-color, #212121);
  }

  .select_row{
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 6vh;
    z-index: -1;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  .connector{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 6vh;
    height: 6vh;
    z-index: -1;
    font: 2vh/6vh "PnigFang SC";
    color: var(--selected-color, #212121);
    text-align: center;
  }
  .connector.left{
    left: 33.33%;
    margin-left: -3vh;
  }
  .connector.right{
    right: 33.33%;
    margin-right: -3vh;
  }
</style>