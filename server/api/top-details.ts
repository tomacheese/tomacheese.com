import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (_event) => {
  try {
    const filePath = path.join(process.cwd(), 'content', 'top-details.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(fileContent)

    return data
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to load top details data',
    })
  }
})
