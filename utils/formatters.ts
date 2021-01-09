export function cardNumberFormatter(
  oldValue: string,
  newValue: string,
): string {
  // user is deleting so return without formatting
  if (oldValue.length > newValue.length) {
    return newValue
  }

  return newValue
    .replace(/\W/gi, '')
    .replace(/(.{4})/g, '$1 ')
    .substring(0, 19)
}

export function expirationDateFormatter(
  oldValue: string,
  newValue: string,
): string {
  // user is deleting so return without formatting
  if (oldValue.length > newValue.length) {
    return newValue
  }

  return newValue
    .replace(/\W/gi, '')
    .replace(/(.{2})/g, '$1/')
    .substring(0, 5)
}
