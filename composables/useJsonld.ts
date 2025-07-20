export const useJsonld = (jsonld: Record<string, unknown>) => {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonld),
      },
    ],
  })
}
