import React, { useRef, useState, useEffect } from 'react'
import { Keyboard, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import { useFormContext } from 'react-hook-form'
import cardValidator from 'card-validator'
import FormTextField from './FormTextField'
import {
  cardNumberFormatter,
  expirationDateFormatter,
} from '../utils/formatters'
import LibraryContext, { LibraryProps } from '../LibraryContext'
import CardIcon from './CardIcon'
import { CardFields } from './Card/index'
import FormCard from './FormCard'
import Button from './Button'
import Conditional from './Conditional'
import { getTranslations } from '../utils/translations'

export interface FormModel {
  holderName: string
  cardNumber: string
  expiration: string
  cvv: string
}

const CreditCardForm: React.FC<LibraryProps> = (props) => {
  const {
    horizontalStart = true,
    translations: parentTranslations,
    overrides,
  } = props
  const translations = getTranslations(parentTranslations)
  const { trigger, watch } = useFormContext()
  const cardNumber = watch('cardNumber')
  const { card } = cardValidator.number(cardNumber)
  const isAmex = card?.type === 'american-express'
  const cvvLength = isAmex ? 4 : 3

  const [isHorizontal, setIsHorizontal] = useState(horizontalStart)

  const scrollRef = useRef<ScrollView>(null)
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

  const textFieldStyle = isHorizontal ? styles.textField : styles.regularField

  async function goNext() {
    if (focusedField === null) return

    const field = ['cardNumber', 'holderName', 'expiration', 'cvv'][
      focusedField
    ]

    if (isHorizontal) {
      const result = await trigger(field)
      if (!result) return
      scrollRef.current?.scrollTo({ x: (focusedField + 1) * 342 })
    }

    if (focusedField === CardFields.CVV) {
      setFocusedField(null)
      setIsHorizontal(false)
      Keyboard.dismiss()
      return
    }

    const ref = [cardNumberRef, holderNameRef, expirationRef, cvvRef][
      focusedField + 1
    ]
    ref.current?.focus()
  }

  return (
    <LibraryContext.Provider
      value={{
        ...props,
        overrides: props.overrides || {},
        translations,
      }}
    >
      <View style={styles.container}>
        <FormCard cardType={card?.type} focusedField={focusedField} />
        <ScrollView
          ref={scrollRef}
          style={isHorizontal && { maxHeight: 120 }}
          pagingEnabled={isHorizontal}
          horizontal={isHorizontal}
          scrollEnabled={!isHorizontal}
          keyboardShouldPersistTaps="handled"
        >
          <FormTextField
            style={textFieldStyle}
            ref={cardNumberRef}
            name="cardNumber"
            label={translations.cardNumber}
            keyboardType="number-pad"
            maxLength={19}
            validationLength={isAmex ? 18 : 19}
            rules={{
              required: translations.cardNumberRequired,
              validate: {
                isValid: (value: string) => {
                  return (
                    cardValidator.number(value).isValid ||
                    translations.cardNumberInvalid
                  )
                },
              },
            }}
            formatter={cardNumberFormatter}
            endEnhancer={<CardIcon cardNumber={cardNumber} />}
            onFocus={() => setFocusedField(CardFields.CardNumber)}
            onValid={goNext}
          />
          <FormTextField
            style={textFieldStyle}
            ref={holderNameRef}
            name="holderName"
            label={translations.cardHolderName}
            rules={{
              required: translations.cardNumberRequired,
              validate: {
                isValid: (value: string) => {
                  return (
                    cardValidator.cardholderName(value).isValid ||
                    translations.cardNumberInvalid
                  )
                },
              },
            }}
            onSubmitEditing={goNext}
            onFocus={() => setFocusedField(CardFields.CardHolderName)}
          />
          <View style={styles.row}>
            <FormTextField
              style={[
                textFieldStyle,
                {
                  marginRight: isHorizontal ? 0 : 24,
                },
              ]}
              ref={expirationRef}
              name="expiration"
              label={translations.expiration}
              keyboardType="number-pad"
              maxLength={5}
              validationLength={5}
              rules={{
                required: translations.expirationRequired,
                validate: {
                  isValid: (value: string) => {
                    return (
                      cardValidator.expirationDate(value).isValid ||
                      translations.expirationInvalid
                    )
                  },
                },
              }}
              formatter={expirationDateFormatter}
              onFocus={() => setFocusedField(CardFields.Expiration)}
              onValid={goNext}
            />
            <FormTextField
              style={textFieldStyle}
              ref={cvvRef}
              name="cvv"
              label="Security Code"
              keyboardType="number-pad"
              maxLength={cvvLength}
              validationLength={cvvLength}
              rules={{
                required: 'Security code is required.',
                validate: {
                  isValid: (value: string) => {
                    return (
                      cardValidator.cvv(value, cvvLength).isValid ||
                      'This security code looks invalid.'
                    )
                  },
                },
              }}
              onFocus={() => setFocusedField(CardFields.CVV)}
              onValid={goNext}
            />
          </View>
        </ScrollView>
        <Conditional condition={isHorizontal} fallback={props.button}>
          <Button
            style={[styles.button, overrides?.button]}
            title={
              focusedField === CardFields.CVV
                ? translations.done
                : translations.next
            }
            onPress={goNext}
          />
        </Conditional>
      </View>
    </LibraryContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 36,
  },
  textField: {
    marginTop: 24,
    width: 342,
    height: 100,
  },
  regularField: {
    flex: 1,
    marginTop: 24,
  },
  button: {
    width: 100,
    alignSelf: 'flex-end',
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 24,
    backgroundColor: '#0093E9',
  },
})

export default CreditCardForm
