import { createContext } from 'react'

export type TranslationsNonNull = {
  cardNumber: string
  cardHolderName: string
  nameSurname: string
  mmYY: string
  expiration: string
  securityCode: string
  next: string
  done: string
  cardNumberRequired: string
  cardNumberInvalid: string
  cardHolderNameRequired: string
  cardHolderNameInvalid: string
  expirationRequired: string
  expirationInvalid: string
  securityCodeRequired: string
  securityCodeInvalid: string
}
type Partial<T> = {
  [P in keyof T]?: T[P]
}
export type Translations = Partial<TranslationsNonNull>

export type LibraryProps = {
  useLottie?: boolean
  button?: React.ReactNode
  translations?: Translations
}
export type ContextProps = LibraryProps & {
  translations: TranslationsNonNull
}

export function getTranslations(
  translations: Translations = {},
): TranslationsNonNull {
  return {
    cardNumber: 'Card Number',
    cardHolderName: 'Cardholder Name',
    nameSurname: 'Name Surname',
    mmYY: 'MM/YY',
    expiration: 'Expiration',
    securityCode: 'Security Code',
    next: 'Next',
    done: 'Done',
    cardNumberRequired: 'Card number is required.',
    cardNumberInvalid: 'This card number looks invalid.',
    cardHolderNameRequired: 'Cardholder name is required.',
    cardHolderNameInvalid: 'This cardholder name looks invalid.',
    expirationRequired: 'Expiration date is required.',
    expirationInvalid: 'This expiration date looks invalid.',
    securityCodeRequired: 'Security code is required.',
    securityCodeInvalid: 'This security date looks invalid.',
    ...translations,
  }
}

const LibraryContext = createContext<ContextProps>({
  useLottie: true,
})

export default LibraryContext
