import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { def, get } from 'bdd-lazy-var/getter'
import CreditCardForm from './CreditCardForm'
import { useForm, FormProvider } from 'react-hook-form'
import { Button } from 'react-native'
import { FormModel } from '../types'

const Wrapper = () => {
  const formMethods = useForm({
    mode: 'onBlur',
    defaultValues: {
      holderName: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
    },
  })
  const { handleSubmit } = formMethods

  const onSubmit = (model: FormModel) => {
    get.onSubmit(model)
  }

  return (
    <FormProvider {...formMethods}>
      <CreditCardForm />
      <Button onPress={handleSubmit(onSubmit)} title={'Submit'} />
    </FormProvider>
  )
}

def('render', () => () => render(<Wrapper />))
def('onSubmit', () => jest.fn())

it('validates credit card number', async () => {
  const { queryByText, getByTestId } = get.render()

  // does not display validation message until input is filled
  const cardInput = getByTestId('TextField.cardNumber')
  fireEvent.changeText(cardInput, '55555555')
  await waitFor(() => {
    expect(queryByText(/This card number looks invalid./)).toBeNull()
  })

  // invalid card
  fireEvent.changeText(cardInput, '5555555555554440')
  await waitFor(() => {
    expect(queryByText(/This card number looks invalid./)).not.toBeNull()
  })

  // valid card
  fireEvent.changeText(cardInput, '5555 5555 5555 4444')
  await waitFor(() => {
    expect(queryByText(/This card number looks invalid./)).toBeNull()
  })
})

it('validates expiration date', async () => {
  const { queryByText, getByTestId } = get.render()

  const input = getByTestId('TextField.expiration')
  // passed expiration date
  fireEvent.changeText(input, '1018')
  await waitFor(() =>
    expect(queryByText(/This expiration date looks invalid./)).not.toBeNull(),
  )

  // valid date
  fireEvent.changeText(input, '10/23')
  await waitFor(() =>
    expect(queryByText(/This expiration date looks invalid./)).toBeNull(),
  )
})

it('validates cvv', async () => {
  const { queryByText, getByTestId } = get.render()

  const input = getByTestId('TextField.cvv')
  // invalid input
  fireEvent.changeText(input, '4444')
  await waitFor(() =>
    expect(queryByText('This security code looks invalid.')).not.toBeNull(),
  )

  // valid input
  fireEvent.changeText(input, '333')
  await waitFor(() =>
    expect(queryByText('This security code looks invalid.')).toBeNull(),
  )
})

it('submits the form', async () => {
  const { getByText, getByTestId } = get.render()

  fireEvent.changeText(getByTestId('TextField.holderName'), 'Halil Bilir')
  fireEvent.changeText(getByTestId('TextField.cardNumber'), '5555555555554444')
  fireEvent.changeText(getByTestId('TextField.expiration'), '0224')
  fireEvent.changeText(getByTestId('TextField.cvv'), '333')

  fireEvent.press(getByText('Submit'))

  await waitFor(() =>
    expect(get.onSubmit).toHaveBeenLastCalledWith({
      holderName: 'Halil Bilir',
      // cardNumber and expiration are now formatted
      cardNumber: '5555 5555 5555 4444',
      expiration: '02/24',
      cvv: '333',
    }),
  )
})
