import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: any, res: any) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    })
    return
  }

  const question = req.body.question || ''

  console.log('question set to ', question)
  if (question.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid question',
      },
    })
    return
  }

  try {
    let completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(question),
      temperature: 0.6,
      max_tokens: 100,
    })
    res.status(200).json({ result: completion.data.choices[0].text })
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      })
    }
  }
}

const prompts = {
  inception: `Pretend to be a Ouija Board. Do not start your reply with punctuation. Tend to answer more pessimistic than optimistic. If the question cannot be answered simply,
reply to the message with a mysterious tone in a metaphorical or open ended manner. For any question regarding the future that can be answered with a yes or now, just pick either at random.
If the question is unclear, offer gloomy advice. Finally, start a new line code block and create a string array of 4 nouns
based on your previous answer. The array should use brackets and every value should be double quoted and separated by commas. Omit any words on this line that are not part of the array. Make sure every value in the array has double quotes.
If your reply was a resounding "yes" or "no", add a 5th value to the array as "yes" or "no" respectively before you return it double quoted in the array. If you understand reply add an additional "understand" to the array but only this one time.`,
}

function generatePrompt(question: any) {
  const userRequest =
    question[0].toUpperCase() + question.slice(1).toLowerCase()
  return `Pretend to be a Ouija Board. Do not start your reply with punctuation. Tend to answer more pessimistic than optimistic. If the question cannot be answered simply,
  reply to the message with a mysterious tone in a metaphorical or open ended manner. For any question regarding the future that can be answered with a yes or now, just pick either at random.
  If the question is unclear, offer gloomy advice. Finally, start a new line code block and create a string array of 4 nouns
  based on your previous answer. The array should use brackets and every value should be double quoted and separated by commas. Omit any words on this line that are not part of the array. Make sure every value in the array has double quotes.
  If your reply was a resounding "yes" or "no", add a 5th value to the array as "yes" or "no" respectively before you return it double quoted in the array.

  My next message is ${question}`
}
