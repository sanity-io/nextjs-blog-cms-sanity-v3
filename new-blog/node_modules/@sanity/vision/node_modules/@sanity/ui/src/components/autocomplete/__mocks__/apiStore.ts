import countries from '../__fixtures__/countries'

export const countriesStore = {
  search(
    query: string,
    onResults: (results: {value: string}[]) => void,
    onLoading: (flag: boolean) => void
  ): {cancel: () => void} {
    const fakeDelay = 350 + Math.random() * 800

    onLoading(true)

    const timeout = setTimeout(() => {
      const results: {value: string}[] = countries
        .filter((d) => d.name.toLowerCase().includes(query.toLowerCase()))
        .map((d) => ({value: d.code}))

      onResults(results)
      onLoading(false)
    }, fakeDelay)

    return {
      cancel: () => clearTimeout(timeout),
    }
  },

  fetchDocument(
    id: string,
    onResult: (value: {code: string; title: string} | null) => void,
    onLoading: (flag: boolean) => void
  ): {cancel: () => void} {
    const fakeDelay = 50 + Math.random() * 400

    onLoading(true)

    const timeout = setTimeout(() => {
      const rec = countries.find((c) => c.code === id)

      const doc = rec && {code: rec.code, title: rec.name}

      onResult(doc || null)
      onLoading(false)
    }, fakeDelay)

    return {
      cancel: () => clearTimeout(timeout),
    }
  },
}
