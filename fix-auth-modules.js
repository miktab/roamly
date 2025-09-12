const fs = require('fs')
const path = require('path')

// Update all modules to use real authentication instead of sessionId
for (let i = 1; i <= 14; i++) {
  const moduleDir = `/home/t/Documents/roamly/src/app/order/product/RemoteReadyBootcamp/module-${i}`
  const filePath = path.join(moduleDir, 'page.tsx')
  
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping module ${i} - file doesn't exist`)
    continue
  }
  
  let content = fs.readFileSync(filePath, 'utf-8')
  
  // Fix the imports
  content = content.replace(
    "import { updateUserProgress, fetchUserProgress, generateSessionId } from \"@/lib/progress\"",
    "import { fetchUserProgress } from \"@/lib/progress\""
  )
  
  // Fix the useEffect to remove sessionId usage
  const oldUseEffect = `async function checkProgress() {
      const sessionId = generateSessionId()
      const product = 'RemoteReadyBootcamp'
      const progress = await fetchUserProgress(sessionId, product)`
      
  const newUseEffect = `async function checkProgress() {
      const product = 'RemoteReadyBootcamp'
      const progress = await fetchUserProgress(product)`
      
  content = content.replace(oldUseEffect, newUseEffect)
  
  // Fix the handleCompleteModule function to remove sessionId usage
  const oldHandleModule = `  const handleCompleteModule = async () => {
    setIsUpdating(true)
    const sessionId = generateSessionId()
    const product = 'RemoteReadyBootcamp'
    
    // Update progress to module ${i + 1} (completing module ${i})
    const response = await fetch('/api/progress/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionId,
        product,
        currentModule: moduleId + 1
      })
    })`
    
  const newHandleModule = `  const handleCompleteModule = async () => {
    setIsUpdating(true)
    const product = 'RemoteReadyBootcamp'
    
    // Update progress to module ${i + 1} (completing module ${i})
    const response = await fetch('/api/progress/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product,
        currentModule: moduleId + 1
      })
    })`
    
  content = content.replace(oldHandleModule, newHandleModule)
  
  fs.writeFileSync(filePath, content)
  console.log(`Updated module ${i} to use real authentication`)
}

console.log('All modules updated to use real authentication!')
