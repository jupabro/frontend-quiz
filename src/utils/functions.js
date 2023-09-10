export const decodeHtml = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html")
  return doc.documentElement.textContent
}

export const getRandomIndex = (max) => {
  return Math.floor(Math.random() * max)
}
