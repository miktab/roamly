const fs = require('fs')
const path = require('path')

// Fix modal placement in all modules 1-14
for (let i = 2; i <= 14; i++) {
  const moduleDir = `/home/t/Documents/roamly/src/app/order/product/RemoteReadyBootcamp/module-${i}`
  const filePath = path.join(moduleDir, 'page.tsx')
  
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping module ${i} - file doesn't exist`)
    continue
  }
  
  let content = fs.readFileSync(filePath, 'utf-8')
  
  // Check if modal is misplaced in the loading section
  if (content.includes('Loading module...\n      <WaitTimeModal')) {
    console.log(`Fixing modal placement in module ${i}`)
    
    // Fix the loading section
    content = content.replace(
      /Loading module\.\.\.\n      <WaitTimeModal[^}]+}\n      \/>/g,
      'Loading module...'
    )
    
    // Add modal at the end before the closing div and component end
    content = content.replace(
      /        <\/div>\n      <\/div>\n    <\/div>\n  \)\n}/g,
      `        </div>
      </div>
      
      <WaitTimeModal 
        isOpen={showWaitModal}
        onClose={() => setShowWaitModal(false)}
        waitTime={waitTime}
        canCompleteAt={canCompleteAt}
      />
    </div>
  )
}`
    )
    
    fs.writeFileSync(filePath, content)
    console.log(`Fixed modal placement in module ${i}`)
  } else {
    console.log(`Module ${i} modal placement is already correct`)
  }
}

console.log('Modal placement fixes completed!')
