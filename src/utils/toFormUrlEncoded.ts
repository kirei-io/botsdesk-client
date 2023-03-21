export const toFormUrlEncoded = (data: any): string => {
  const formBody = []
  for (const key in data) {
    const encodedKey = encodeURIComponent(key)
    const encodedValue = encodeURIComponent(data[key])
    formBody.push(`${encodedKey}=${encodedValue}`)
  }

  return formBody.join('&')
}
