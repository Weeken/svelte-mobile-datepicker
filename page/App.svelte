<h2>{birthday}</h2>

<button on:click="{showPicker}">showDatePicker</button>

<h2>{time}</h2>

<button on:click="{showTimePicker}">showTimePicker</button>

<DatePicker startDate="{start}" endDate="{end}" bind:this="{picker}" bind:value={birthday} />

<TimePicker startHour="{8}" endHour="{10}" bind:this="{timePicker}" bind:value={time} />

<script lang="ts">
  import DatePicker from '../src/DatePicker.svelte'
  import TimePicker from '../src/TimePicker.svelte'

  // import { DatePicker, TimePicker } from '../dist/index.esm.js'
  // import '../dist/index.min.css'

  // import TimePicker from 'svelte-mobile-datepicker'
  // import 'svelte-mobile-datepicker/dist/index.min.css'

  let picker: DatePicker

  let birthday: string = '2012-03-21'

  let start: Date = new Date('1980-01-01')
  let end: Date = new Date()

  function showPicker () {
    picker.show()
  }


  let timePicker : TimePicker

  let time: string = '14:23'

  function showTimePicker () {
    timePicker.show()
  }
</script>

<style>
  :root{
    --confirm-text-color: red;
    --cancel-text-color: blue;
    --selected-color: green;
  }
  button{
    width: 140px;
    height: 60px;
  }
</style>