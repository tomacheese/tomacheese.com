export type JsonLdValue =
  | string
  | number
  | boolean
  | JsonLdObject
  | JsonLdValue[]

export interface JsonLdObject {
  '@context'?:
    | string
    | Record<string, string>
    | (string | Record<string, string>)[]
  '@type'?: string | string[]
  '@id'?: string
  [key: string]: JsonLdValue | undefined
}

export const useJsonld = (jsonld: JsonLdObject) => {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonld),
      },
    ],
  })
}
