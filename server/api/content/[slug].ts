import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  console.log(`[API DEBUG] Received slug: ${slug}`)
  
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug parameter is required'
    })
  }

  try {
    // Use server-side content query
    console.log(`[API DEBUG] Attempting to query: pages/${slug}`)
    const article = await serverQueryContent(event, `pages/${slug}`).findOne()
    console.log(`[API DEBUG] Query result:`, article ? article.title : 'Not found')
    
    if (!article) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Content not found'
      })
    }

    return article
  } catch (error) {
    console.error(`[API DEBUG] Error querying content:`, error)
    throw createError({
      statusCode: 404,
      statusMessage: 'Content not found'
    })
  }
})