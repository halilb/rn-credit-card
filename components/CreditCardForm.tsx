import React, { useRef, useState, useEffect } from 'react'
import { Keyboard, StyleSheet, TextInput, View } from 'react-native'
import { useFormContext } from 'react-hook-form'
import cardValidator from 'card-validator'
import FormTextField from './FormTextField'
import {
  cardNumberFormatter,
  expirationDateFormatter,
} from '../utils/formatters'
import CardIcon from './CardIcon'
import { FormCard, CardFields } from './Card/index'

export interface FormModel {
  holderName: string
  cardNumber: string
  expiration: string
  cvv: string
}

const CreditCardForm: React.FC = () => {
  const { getValues, watch } = useFormContext()
  const cardNumber = watch('cardNumber')

  const holderNameRef = useRef<TextInput>(null)
  const cardNumberRef = useRef<TextInput>(null)
  const expirationRef = useRef<TextInput>(null)
  const cvvRef = useRef<TextInput>(null)

  const [focusedField, setFocusedField] = useState<CardFields | null>(null)

  useEffect(() => {
    if (cardNumberRef?.current) {
      cardNumberRef.current.focus()
    }
  }, [cardNumberRef])

  return (
    <View>
      <FormCard focusedField={focusedField} />
      <FormTextField
        style={styles.textField}
        ref={cardNumberRef}
        name="cardNumber"
        label="Card Number"
        keyboardType="number-pad"
        maxLength={19}
        validationLength={19}
        rules={{
          required: 'Card number is required.',
          validate: {
            isValid: (value: string) => {
              return (
                cardValidator.number(value).isValid ||
                'This card number looks invalid.'
              )
            },
          },
        }}
        formatter={cardNumberFormatter}
        endEnhancer={<CardIcon cardNumber={cardNumber} />}
        onValid={() => holderNameRef.current?.focus()}
        onFocus={() => setFocusedField(CardFields.CardNumber)}
      />
      <FormTextField
        style={styles.textField}
        ref={holderNameRef}
        name="holderName"
        label="Cardholder Name"
        rules={{
          required: 'Cardholder name is required.',
          validate: {
            isValid: (value: string) => {
              return (
                cardValidator.cardholderName(value).isValid ||
                'Cardholder name looks invalid.'
              )
            },
          },
        }}
        onSubmitEditing={() => expirationRef.current?.focus()}
        onFocus={() => setFocusedField(CardFields.CardHolderName)}
      />
      <View style={styles.row}>
        <FormTextField
          style={[
            styles.textField,
            {
              marginRight: 24,
            },
          ]}
          ref={expirationRef}
          name="expiration"
          label="Expiration"
          keyboardType="number-pad"
          maxLength={5}
          validationLength={5}
          rules={{
            required: 'Expiration date is required.',
            validate: {
              isValid: (value: string) => {
                return (
                  cardValidator.expirationDate(value).isValid ||
                  'This expiration date looks invalid.'
                )
              },
            },
          }}
          formatter={expirationDateFormatter}
          onValid={() => cvvRef.current?.focus()}
          onFocus={() => setFocusedField(CardFields.Expiration)}
        />
        <FormTextField
          style={styles.textField}
          ref={cvvRef}
          name="cvv"
          label="Security Code"
          keyboardType="number-pad"
          maxLength={4}
          validationLength={3}
          rules={{
            required: 'Security code is required.',
            validate: {
              isValid: (value: string) => {
                const { card } = cardValidator.number(getValues('cardNumber'))
                const cvvLength = card?.type === 'american-express' ? 4 : 3

                return (
                  cardValidator.cvv(value, cvvLength).isValid ||
                  'This security code looks invalid.'
                )
              },
            },
          }}
          onValid={() => {
            // form is completed so hide the keyboard
            Keyboard.dismiss()
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 36,
  },
  textField: {
    flex: 1,
    marginTop: 24,
  },
})

export default CreditCardForm
