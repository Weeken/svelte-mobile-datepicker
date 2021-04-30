import type { SvelteComponentTyped } from 'svelte'

class DatePicker extends SvelteComponentTyped<{
  startDate: Date,
  endDate: Date,
  value: string,
  format: string,
  confirmText: string,
  cancelText: string,
}> {}

class TimePicker extends SvelteComponentTyped<{
  startHour: number,
  endHour: number,
  startMinute: number,
  endMinute: number,
  needSecond: boolean,
  value: string,
  confirmText: string,
  cancelText: string,
}> {}