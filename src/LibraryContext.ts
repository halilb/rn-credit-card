import { createContext } from 'react'
import { TextStyle, ViewStyle } from 'react-native'

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
  button?: ViewStyle
  input?: ViewStyle
  labelContainer?: ViewStyle
  inputLabel?: TextStyle
  errorText?: TextStyle
}

export type InputColors = {
  focused?: string
  errored?: string
  regular?: string
}

export type LibraryProps = {
  useLottie?: boolean
  horizontalStart?: boolean
  button?: React.ReactNode
  backgroundImage?: React.ReactNode
  translations?: Translations
  inputColors?: InputColors
  overrides?: Overrides
}
export type ContextProps = LibraryProps & {
  translations: TranslationsNonNull
  overrides: Overrides
}

const LibraryContext = createContext<ContextProps>({
  // iOS only
  useLottie: true,
  // iOS only
  horizontalStart: true,
  overrides: {},
  inputColors: {},
  // @ts-ignore
  translations: {},
})

export default LibraryContext
