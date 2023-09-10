export const decodeHtml = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html")
  return doc.documentElement.textContent
}