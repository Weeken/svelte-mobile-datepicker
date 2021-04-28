# svelte-mobile-datepicker

A Svelte datepicker for moble web

# preview
![preview](./public/preview.jpg "preview")
# Installation
```bash
npm install svelte-mobile-datepicker
```

# Usage

```html
<h2>{birthday}</h2>

<button on:click="{showPicker}">show</button>

<Datepicker 
  startDate="{start}" 
  endDate="{end}"
  format="{format}"
  confirmText="{confirmText}"
  cancelText="{cancelText}"
  bind:this="{picker}"
  bind:value={birthday} />

<script lang="ts">
  import Datepicker from 'svelte-mobile-datepicker'
  import 'svelte-mobile-datepicker/dist/index.min.css'

  let picker: Datepicker

  let birthday: string = '2012-03-21'

  let start: Date = new Date('1980-01-01')
  let end: Date = new Date()
  let format: string = 'YYYY-MM-DD'
  let confirmText: string = '确定'
  let cancelText: string = '取消'

  function showPicker () {
    picker.show()
  }
</script>

<style>
  :root{
    /* here to change color */
    --confirm-text-color: red;
    --cancel-text-color: blue;
    --selected-color: green;
  }
  button{
    width: 200px;
    height: 80px;
  }
</style>
```