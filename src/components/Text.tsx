import React, { useContext } from 'react'
import { Text as GlobalText } from 'react-native'
import LibraryContext from '../LibraryContext'

type Props = React.ComponentProps<typeof GlobalText> & {
  bold?: boolean
}

const Text: React.FC<Props> = (props) => {
  const { bold, style, ...restOfProps } = props
  const { fonts } = useContext(LibraryContext)

  return (
    <GlobalText
      style={[
        {
          fontFamily: bold ? fonts.bold : fonts.regular,
        },
        style,
      ]}
      {...restOfProps}
    />
  )
}

export default Text
