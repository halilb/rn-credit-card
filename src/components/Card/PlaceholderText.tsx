import React from 'react'
import { Text, StyleSheet, LayoutChangeEvent, ViewStyle } from 'react-native'

type Style = ViewStyle | undefined

type Props = {
  value: string
  placeholder: string
  onLayout?: (event: LayoutChangeEvent) => void
  style?: Style[] | ViewStyle
}

const PlaceholderText: React.FC<Props> = (props) => {
  const { value, placeholder, onLayout, style } = props
  const rest = placeholder.substring(value.length)

  return (
    <Text style={style} numberOfLines={1} onLayout={onLayout}>
      {value}
      <Text style={styles.placeholder}>{rest}</Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  placeholder: {
    color: 'gray',
  },
})

export default PlaceholderText
