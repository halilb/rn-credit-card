import React from 'react'
import Card from './Card'
import { useFormContext } from 'react-hook-form'

type CardProps = React.ComponentProps<typeof Card>
type Props = Omit<CardProps, 'model'>

const FormCard: React.FC<Props> = ({ focusedField }) => {
  const { watch } = useFormContext()
  const model = watch()

  return (
    <Card
      focusedField={focusedField}
      model={{
        cardNumber: model.cardNumber,
        expiration: model.expiration,
        holderName: model.holderName,
        cvv: model.cvv,
      }}
    />
  )
}

export default FormCard
