export async function fetchQuizData(selections) {

  let apiUrl = `https://opentdb.com/api.php?amount=${selections.amount}`

  if (selections.categoryId.length) {
    apiUrl = apiUrl.concat(`&category=${selections.categoryId}`)
  }
  if (selections.difficulty.length) {
    apiUrl = apiUrl.concat(`&difficulty=${selections.difficulty}`)
  }
  if (selections.type.length) {
    apiUrl = apiUrl.concat(`&type=${selections.type}`)
  }

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (data.results && data.results.length > 0) {
      return data.results
    } else {
      throw new Error("Not enough questions found in the response.")
    }
  } catch (error) {
    throw new Error(
      "An error occurred while fetching the data: " + error.message
    )
  }
}
