/**
 * JSON-LD value types based on JSON-LD specification
 */
export type JsonLdValue =
  | string
  | number
  | boolean
  | JsonLdObject
  | JsonLdValue[]

/**
 * JSON-LD object structure
 */
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
