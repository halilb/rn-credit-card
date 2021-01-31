import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native'
import Text from './Text'
import LibraryContext from '../LibraryContext'

type Props = React.ComponentProps<typeof TextInput> & {
  label: string
  errorText?: string | null
  endEnhancer?: React.ReactNode
}

const TextField = React.forwardRef<TextInput, Props>((props, ref) => {
  const {
    label,
    errorText,
    value,
    endEnhancer,
    style,
    onBlur,
    onFocus,
    ...restOfProps
  } = props
  const { inputColors = {}, fonts, overrides } = useContext(LibraryContext)
  const {
    errored: errorColor = '#B00020',
    focused: focusedColor = '#080F9C',
    regular: regularColor = '#B9C4CA',
  } = inputColors

  const [isFocused, setIsFocused] = useState(false)

  const focusAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start()
  }, [focusAnim, isFocused, value])

  let color = isFocused ? focusedColor : regularColor
  if (errorText) {
    color = errorColor
  }

  return (
    <View style={style}>
      <TextInput
        style={[
          styles.input,
          {
            fontFamily: fonts.regular,
          },
          overrides.input,
          {
            borderColor: color,
          },
        ]}
        ref={ref}
        {...restOfProps}
        value={value}
        onBlur={(event) => {
          setIsFocused(false)
          onBlur?.(event)
        }}
        onFocus={(event) => {
          setIsFocused(true)
          onFocus?.(event)
        }}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          // @ts-ignore
          ref?.current?.focus()
        }}
      >
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, -12],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
            },
            overrides.labelContainer,
          ]}
        >
          <Text
            style={[
              styles.label,
              overrides.inputLabel,
              {
                color,
              },
            ]}
            bold
          >
            {label}
            {errorText ? '*' : ''}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {endEnhancer && (
        <View style={styles.enhancerContainer}>{endEnhancer}</View>
      )}
      {!!errorText && (
        <Text style={[styles.error, overrides.errorText]}>{errorText}</Text>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  input: {
    padding: 24,
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
  },
  labelContainer: {
    position: 'absolute',
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 14,
  },
  enhancerContainer: {
    position: 'absolute',
    top: 12,
    right: 16,
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: '#B00020',
  },
})

export default TextField
