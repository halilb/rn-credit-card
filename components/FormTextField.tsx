import React, { useEffect } from 'react'
import { useFormContext, Controller, RegisterOptions } from 'react-hook-form'
import TextField from './TextField'

type Props = React.ComponentProps<typeof TextField> & {
  name: string
  rules: RegisterOptions
  validationLength?: number
}

const FormTextField: React.FC<Props> = (props) => {
  const { name, rules, validationLength = 1, ...restOfProps } = props
  const { control, errors, trigger, watch } = useFormContext()
  const value = watch(name)

  useEffect(() => {
    if (value.length >= validationLength) {
      trigger(name)
    }
  }, [value, name, validationLength, trigger])

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
      rules={rules}
    />
  )
}

export default FormTextField
