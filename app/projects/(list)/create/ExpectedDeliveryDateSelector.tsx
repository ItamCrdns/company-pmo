import { useNewProjectActions } from '@/lib/hooks/New project actions/useNewProjectActions'
import { DatePicker, type DatePickerValue } from '@tremor/react'

const ExpectedDeliveryDateSelector: React.FC<{ defaultValue: Date }> = (
  props
) => {
  const { setExpectedDeliveryDate } = useNewProjectActions()

  const getDate = (date: DatePickerValue): void => {
    setExpectedDeliveryDate(date?.toString() ?? '')
  }

  return (
    <DatePicker
      onValueChange={getDate}
      placeholder='Set a delivery date for this project'
      defaultValue={
        !isNaN(props.defaultValue?.getTime()) ? props.defaultValue : undefined
      }
      minDate={new Date()}
      className='my-4'
    />
  )
}

export default ExpectedDeliveryDateSelector
