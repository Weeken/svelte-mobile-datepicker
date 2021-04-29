{#if visible}
<div class="mask" transition:fade="{{duration: 100}}" on:click|stopPropagation|preventDefault|self="{hide}">
  <div class="picker" transition:fly="{{ y: 500, duration: 200 }}">
    <div class="top_bar">
      <button class="btn cancel" on:click="{cancelSelect}">{cancelText}</button>
      <button class="btn confirm" on:click="{confirmSelect}">{confirmText}</button>
    </div>
    <div class="select_row">
      {#if !needSecond}
        <span class="connector center">:</span>
      {:else}
        <span class="connector left">:</span>
        <span class="connector right">:</span>
      {/if}
    </div>
    <div class="content">
      <Column list="{hours}" defaultValue="{selectedHour}" on:select="{selectHour}" />
      <Column list="{minutes}" defaultValue="{selectedMinute}" on:select="{selectMinute}" />
      {#if needSecond}
        <Column list="{seconds}" defaultValue="{selectedSecond}" on:select="{selectSecond}" />
      {/if}
    </div>
  </div>
</div>
{/if}


<script lang="ts">
  import { onMount } from 'svelte'
  import { fly, fade } from 'svelte/transition'
  import Column from './Column.svelte'
  import { createList, pad } from './share'

  let visible: boolean = false

  export let startHour: number = 0
  export let endHour: number = 23
  export let startMinute: number = 0
  export let endMinute: number = 59

  export let value: string = ''

  export let needSecond: boolean = false

  export let confirmText: string = '确定'
  export let cancelText: string = '取消'


  let hours: number[] = createList(startHour, endHour - 1) || []
  let minutes: number[] = createList(startMinute, endMinute) || []
  let seconds: number[] = createList(0, 59) || []

  let selectedHour: number = 0
  let selectedMinute: number = 0
  let selectedSecond: number = 0

  async function selectHour(e: any) {
    selectedHour = e.detail
  }

  async function selectMinute(e: any) {
    selectedMinute = e.detail
  }

  async function selectSecond(e: any) {
    selectedSecond = e.detail
  }

  function confirmSelect () {
    // value = dayjs(new Date(selectedYear, selectedMonth - 1, selectedday)).format(format)
    
    if (!needSecond) {
      value = `${pad(selectedHour)}:${pad(selectedMinute)}`
    } else {
      value = `${pad(selectedHour)}:${pad(selectedMinute)}:${pad(selectedSecond)}`
    }
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

  function initDefault (val: string) {
    if (!needSecond && !/^\d{2}[\s]?:[\s]?\d{2}$/.test(val)) {
      throw new Error('your binding time value string is illegal')
    } else if (needSecond && !/^\d{2}[\s]?:[\s]?\d{2}[\s]?:[\s]?\d{2}$/.test(val)) {
      throw new Error('your binding time value string is illegal')
    }
    let strArr: string[] = val.split(':')
    let hour: string = strArr[0] ? strArr[0].trim() : '0'
    let minute: string = strArr[1] ? strArr[1].trim() : '0'
    let second: string = strArr[2] ? strArr[2].trim() : '0'
    try {
      selectedHour = Number(hour)
      selectedMinute = Number(minute)
      selectedSecond = Number(second)
    } catch (error) {
      throw new Error('something wrong with your initial time')
    }
  }

  onMount(() => {
    if (value !== '') {
      initDefault(value)
    } else {
      initDefault(needSecond ? '00:00:00' : '00:00')
    }
  })

  $: if (visible) {
    if (value !== '') {
      initDefault(value)
    } else {
      initDefault(needSecond ? '00:00:00' : '00:00')
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
    width: 6vh;
    height: 6vh;
    z-index: -1;
    font: 3vh/6vh "PnigFang SC";
    color: var(--selected-color, #212121);
    text-align: center;
  }
  .connector.center{
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .connector.left{
    left: 33.33%;
    margin-left: -3vh;
    transform: translateY(-50%);
  }
  .connector.right{
    right: 33.33%;
    margin-right: -3vh;
    transform: translateY(-50%);
  }
</style>