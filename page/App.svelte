<h2>{birthday}</h2>

<button on:click="{showPicker}">show</button>

<Datepicker startDate="{start}" endDate="{end}" bind:this="{picker}" bind:value={birthday} />

<script lang="ts">
  import Datepicker from '../src'

  let picker: Datepicker

  let birthday: string = '2012-03-21'

  let start: Date = new Date('1980-01-01')
  let end: Date = new Date()

  function showPicker () {
    picker.show()
  }
</script>

<style>
  :root{
    --confirm-text-color: red;
    --cancel-text-color: blue;
    --selected-color: green;
  }
  button{
    width: 200px;
    height: 80px;
  }
</style>