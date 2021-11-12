import { createContext } from 'react'
import { Fonts, LibraryProps, Overrides, TranslationsNonNull } from './types'

export type ContextProps = LibraryProps & {
  fonts: Fonts
  translations: TranslationsNonNull
  overrides: Overrides
}

const LibraryContext = createContext<ContextProps>({
  LottieView: undefined,
  // iOS only
  horizontalStart: true,
  fonts: {},
  overrides: {},
  requiresName: true,
  inputColors: {},
  // @ts-ignore
  translations: {},
})

export default LibraryContext
