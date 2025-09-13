---
applyTo: "**"
---

For shadcn calendars: always use: captionLayout="dropdown"
Content should be in french
React: don't use useMemo

dateInputs use:

```jsx
<Popover>
  <PopoverTrigger asChild>
    <FormControl>
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal",
          !field.value && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {field.value ? field.value : <span>Pick a date</span>}
      </Button>
    </FormControl>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="single"
      selected={selected}
      onSelect={(d) => d && field.onChange(formatDateDDMMYYYY(d))}
      captionLayout="dropdown"
    />
  </PopoverContent>
</Popover>
```
