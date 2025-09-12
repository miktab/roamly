const fs = require('fs')
const path = require('path')

// Fix the modal response handling in all modules
for (let i = 4; i <= 30; i++) {
  const moduleDir = `/home/t/Documents/roamly/src/app/order/product/RemoteReadyBootcamp/module-${i}`
  const filePath = path.join(moduleDir, 'page.tsx')
  
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping module ${i} - file doesn't exist`)
    continue
  }
  
  let content = fs.readFileSync(filePath, 'utf-8')
  
  // Fix the modal response handling
  const oldModalCode = `    } else if (data.waitTimeRemaining) {
      // Show wait time modal
      const hours = Math.floor(data.waitTimeRemaining)
      const minutes = Math.floor((data.waitTimeRemaining - hours) * 60)
      setWaitTime({ hours, minutes, totalMinutes: Math.floor(data.waitTimeRemaining * 60) })
      setCanCompleteAt(new Date(Date.now() + data.waitTimeRemaining * 60 * 60 * 1000))
      setShowWaitModal(true)
    }`
    
  const newModalCode = `    } else if (data.error === 'WAIT_TIME_NOT_ELAPSED' && data.waitTime) {
      // Show wait time modal
      setWaitTime(data.waitTime)
      setCanCompleteAt(new Date(data.canCompleteAt))
      setShowWaitModal(true)
    }`
  
  // Fix the access logic
  const oldAccessCode = `      if (progress) {
        // Module ${i} has access if currentModule is >= ${i}
        setHasAccess(progress.currentModule >= moduleId)
        // Module ${i} is completed if currentModule is > ${i}
        setIsCompleted(progress.currentModule > moduleId)
      }`
      
  const newAccessCode = `      if (progress) {
        // Module ${i} has access if currentModule is >= ${i}
        setHasAccess(progress.currentModule >= moduleId)
        // Module ${i} is completed if currentModule is > ${i}
        setIsCompleted(progress.currentModule > moduleId)
      } else {
        // No progress means only module 1 is accessible
        setHasAccess(false)
      }`
  
  // Apply fixes
  if (content.includes('data.waitTimeRemaining')) {
    content = content.replace(oldModalCode, newModalCode)
    console.log(`Fixed modal response in module ${i}`)
  }
  
  if (content.includes(`setIsCompleted(progress.currentModule > moduleId)
      }
      setIsLoading(false)`)) {
    content = content.replace(oldAccessCode, newAccessCode)
    console.log(`Fixed access logic in module ${i}`)
  }
  
  fs.writeFileSync(filePath, content)
  console.log(`Updated module ${i}`)
}

console.log('All modules updated!')
