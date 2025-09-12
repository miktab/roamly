const fs = require('fs');

// Update all modules with wait time functionality
for (let i = 1; i <= 30; i++) {
  const filePath = `./src/app/order/product/RemoteReadyBootcamp/module-${i}/page.tsx`;
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add WaitTimeModal import
    if (!content.includes('WaitTimeModal')) {
      content = content.replace(
        'import { updateUserProgress, fetchUserProgress, generateSessionId } from "@/lib/progress"',
        'import { updateUserProgress, fetchUserProgress, generateSessionId } from "@/lib/progress"\nimport { WaitTimeModal } from "@/components/WaitTimeModal"'
      );
    }
    
    // Add state variables for wait time
    const statePattern = /const \[hasAccess, setHasAccess\] = useState\(false\)/;
    if (statePattern.test(content)) {
      content = content.replace(
        statePattern,
        `const [hasAccess, setHasAccess] = useState(false)
  const [showWaitModal, setShowWaitModal] = useState(false)
  const [waitTime, setWaitTime] = useState({ hours: 0, minutes: 0, totalMinutes: 0 })
  const [canCompleteAt, setCanCompleteAt] = useState(new Date())`
      );
    }
    
    // Update handleCompleteModule function
    const handleCompletePattern = /const handleCompleteModule = async \(\) => \{[\s\S]*?setIsUpdating\(false\)\s*\}/;
    const newHandleComplete = `const handleCompleteModule = async () => {
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
    })

    const data = await response.json()
    
    if (response.ok) {
      setIsCompleted(true)
    } else if (data.waitTimeRemaining) {
      // Show wait time modal
      const hours = Math.floor(data.waitTimeRemaining)
      const minutes = Math.floor((data.waitTimeRemaining - hours) * 60)
      setWaitTime({ hours, minutes, totalMinutes: Math.floor(data.waitTimeRemaining * 60) })
      setCanCompleteAt(new Date(Date.now() + data.waitTimeRemaining * 60 * 60 * 1000))
      setShowWaitModal(true)
    }
    
    setIsUpdating(false)
  }`;
    
    if (handleCompletePattern.test(content)) {
      content = content.replace(handleCompletePattern, newHandleComplete);
    }
    
    // Add WaitTimeModal to JSX before closing div
    const closingPattern = /(\s*<\/div>\s*<\/div>\s*\)\s*\})/;
    if (closingPattern.test(content) && !content.includes('<WaitTimeModal')) {
      content = content.replace(
        closingPattern,
        `
      <WaitTimeModal 
        isOpen={showWaitModal}
        onClose={() => setShowWaitModal(false)}
        waitTime={waitTime}
        canCompleteAt={canCompleteAt}
      />$1`
      );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated: module-${i}`);
  }
}

console.log('All modules updated with wait time functionality!');
