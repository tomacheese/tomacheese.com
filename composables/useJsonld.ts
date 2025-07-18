export const useJsonld = (jsonld: Record<string, any>) => {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonld)
      }
    ]
  })
}