import React from 'react'
import { Text, StyleSheet, LayoutChangeEvent, ViewStyle } from 'react-native'

type Props = {
  expiration: string
  onLayout: (event: LayoutChangeEvent) => void
  style: ViewStyle
}

const PLACEHOLDER = 'MM/YY'

const ExpirationText: React.FC<Props> = (props) => {
  const { expiration, onLayout, style } = props
  const rest = PLACEHOLDER.substring(expiration.length)

  return (
    <Text style={style} numberOfLines={1} onLayout={onLayout}>
      {expiration}
      <Text style={styles.placeholder}>{rest}</Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  placeholder: {
    color: 'gray',
  },
})

export default ExpirationText
