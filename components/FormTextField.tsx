import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import TextField from './TextField'

type Props = React.ComponentProps<typeof TextField> & {
  name: string
}

const FormTextField: React.FC<Props> = (props) => {
  const { name, ...restOfProps } = props
  const { control, errors } = useFormContext()

  return (
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextField
          // passing everything down to TextField
          // to be able to support all TextInput props
          {...restOfProps}
          errorText={errors[name]?.message}
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
          value={value}
        />
      )}
      name={name}
    />
  )
}

export default FormTextField
