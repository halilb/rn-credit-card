import React from 'react'
import Card from './Card'
import { CardFields } from './index'
import { useFormContext } from 'react-hook-form'

type Props = {
  focusedField: CardFields | null
}

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
