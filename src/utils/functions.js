export const decodeHtml = (input) => {
  const doc = new DOMParser().parseFromString(input, "text/html")
  return doc.documentElement.textContent
}

export const getRandomIndex = (max) => {
  return Math.floor(Math.random() * max)
}

export const getOptionLabel = (options, value) => {
  const selectedOption = options.find((option) => option.value === value)
  return selectedOption ? selectedOption.label : ""
}

export const getCategoryName = (categories, categoryId) => {
  console.log(categories, categoryId)
  const selectedCategory = categories.find(
    (category) => category.id === parseInt(categoryId, 10)
  )
  return selectedCategory ? selectedCategory.name : "All"
}
