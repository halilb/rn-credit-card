import React from 'react'
import Card from './Card'
import { useFormContext } from 'react-hook-form'

type CardProps = React.ComponentProps<typeof Card>
type Props = Omit<CardProps, 'model'>

const FormCard: React.FC<Props> = ({ cardType, focusedField }) => {
  const { watch } = useFormContext()
  const model = watch()

  return (
    <Card
      cardType={cardType}
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
