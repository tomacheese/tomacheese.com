import { describe, expect, it } from 'vitest'
import fs from 'fs'
import path from 'path'

// Create a simple test for static structure verification
describe('pages/devices.vue', () => {
  it('can be imported without error', async () => {
    // Just test that the component can be imported
    const DevicesPage = await import('~/pages/devices.vue')
    expect(DevicesPage).toBeDefined()
    expect(DevicesPage.default).toBeDefined()
  })

  it('page file exists', () => {
    // Test that the page file exists using fs
    const filePath = path.join(process.cwd(), 'pages', 'devices.vue')
    expect(fs.existsSync(filePath)).toBe(true)
  })
})
