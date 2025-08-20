import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function migrateCheckouts() {
  try {
    console.log('Starting checkout migration...')
    
    // Get all checkouts to update them individually if needed
    const checkouts = await prisma.checkout.findMany()
    
    for (const checkout of checkouts) {
      const updates: any = {}
      
      // Set default productCategory if missing
      if (!checkout.productCategory) {
        updates.productCategory = 'product'
      }
      
      // Set default productType if missing
      if (!checkout.productType) {
        updates.productType = 'legacy'
      }
      
      // Update if we have changes to make
      if (Object.keys(updates).length > 0) {
        await prisma.checkout.update({
          where: { checkoutId: checkout.checkoutId },
          data: updates
        })
      }
    }
    
    console.log(`Updated ${checkouts.length} checkouts`)
    console.log('Migration complete!')
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateCheckouts()
