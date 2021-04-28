<div class="column"
  on:touchstart="{touchstart}"
  on:touchmove="{touchmove}"
  on:touchend="{touchend}"
  >
  <ul class="list" bind:this="{container}">
    {#each list as item, i}
      <li class="item {i === index ? 'selected' : ''}" on:click|stopPropagation|preventDefault|self="{() => runTo(i)}">{item < 10 ? `0${item}` : item}</li>
    {/each}
  </ul>
</div>

<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let list: number[] = []
  export let defaultValue: number | undefined

  let itemHeight: number = 0 // 每个item的高度
  let index: number = 0 // 当前选中的索引

  let startY: number = 0 // 触摸开始的Y
  let endY: number = 0 // 触摸结束的Y
  let currentY: number = 0 // 滑动时的Y
  let moveY: number = 0 // 滑动距离
  let scrollY: number = 0 // 已经滑过的距离
  let distance: number = 0 // 当前选中的距离
  let direction: number = 0 // 方向

  let container: any
  function touchstart (e: any) {
    if (e.type == 'touchstart') startY = e.targetTouches[0].clientY
  }
  function touchmove (e: any) {
    currentY = e.targetTouches[0].clientY
    // console.log('currentY', currentY)
    moveY = currentY - startY // 滑动距离
    distance = scrollY + moveY // 当前距离 + 滑动距离
    // 方向
    if (currentY < endY) {
      //move up
      direction = 1
    } else if (currentY > endY) {
      //move down
      direction = -1
    }
    endY = currentY
    // 限制滚动范围
    if (distance > 0) {
      distance = 0
    } else if (distance < -(itemHeight * (list.length - 1))) {
      distance = -(itemHeight * (list.length - 1))
    }
    run(distance)
  }
  function touchend (e: any) {
    // if (e.type == 'touchend') console.log(e)
    if (e.type == 'touchend') endY = e.changedTouches[0].clientY
    moveY = 0
    // 计算当前选中的位置
    index = Math.round(-distance / itemHeight)
    runTo(index)
  }

  function run (distance: number) {
    if (container) {
      container.style.webkitTransform = 'translate3d(0, ' + distance + 'px, 0)'
    }
  }

  function runTo (i: number) {
    distance = -(itemHeight * i)
    index = i
    run(distance)
    scrollY = distance // 已经滚过的距离
    dispatch('select', list[index])
  }

  function initDefault () {
    if (defaultValue) {
      index = list.findIndex(item => item === defaultValue)
      runTo(index)
    }
  }

  $: if (!list[index] && list[list.length - 1]) {
      index = list.length - 1
      runTo(index)
    }

  onMount(() => {
    itemHeight = container.offsetHeight / list.length
    run(0)
    initDefault()
  })
  
</script>

<style>
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .column{
    flex: 1;
    flex-shrink: 0;
    height: 6vh;
    /* padding: 200px 0; */
    /* overflow: hidden; */
    background-color: transparent;
  }

  .list{
    transition: all .2s ease;
    width: 100%;
    padding: 0;
  }

  .item{
    list-style: none;
    width: 100%;
    height: 6vh;
    font: 2vh/6vh "Microsoft Yahei";
    color: #ADAAAF;
    text-align: center;
  }
  .item.selected{
    color: var(--selected-color,#212121) ;
    font-size: 3vh;
    font-weight: bold;
  }
</style>