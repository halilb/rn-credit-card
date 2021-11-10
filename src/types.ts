import { TextStyle, ViewStyle } from 'react-native'

export interface FormModel {
  holderName: string
  cardNumber: string
  expiration: string
  cvv: string
}

export enum CardFields {
  CardNumber,
  CardHolderName,
  Expiration,
  CVV,
}

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

type Style = ViewStyle | TextStyle
export type Overrides = {
  cardPreview?: Style
  labelText?: TextStyle
  cardHolderPreview?: TextStyle
  expirationPreview?: Style
  outline?: ViewStyle
  input?: ViewStyle
  button?: ViewStyle
  labelContainer?: ViewStyle
  inputLabel?: TextStyle
  errorText?: TextStyle
}

export type InputColors = {
  focused?: string
  errored?: string
  regular?: string
}

export type Fonts = {
  regular?: string
  bold?: string
}

export type LibraryProps = {
  LottieView?: any
  horizontalStart?: boolean
  formOnly?: boolean
  requiresName?: boolean
  backgroundImage?: React.ReactNode
  translations?: Translations
  inputColors?: InputColors
  fonts?: Fonts
  overrides?: Overrides
}
