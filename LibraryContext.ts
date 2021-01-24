import { createContext } from 'react'

export type LibraryProps = {
  useLottie?: boolean
  button?: React.ReactNode
}

const LibraryContext = createContext<LibraryProps>({
  useLottie: true,
})

export default LibraryContext
