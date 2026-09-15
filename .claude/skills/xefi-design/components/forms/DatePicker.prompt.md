Calendar date picker — month/year stepper pills over a Monday-first French day grid. Selected day is XEFI red.

```jsx
const [date, setDate] = React.useState(new Date());
<DatePicker value={date} onChange={setDate} />
```

Controlled or uncontrolled via `value` / `onChange`.
