const fs = require('fs');
const path = require('path');

// Fix all module files
for (let i = 1; i <= 30; i++) {
  const filePath = `./src/app/order/product/RemoteReadyBootcamp/module-${i}/page.tsx`;
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add moduleId constant
    content = content.replace(
      `export default function Module${i}() {`,
      `export default function Module${i}() {
  const moduleId = ${i}`
    );
    
    // Fix access check
    content = content.replace(
      `setHasAccess(progress.currentModule >= ${i})`,
      `setHasAccess(progress.currentModule >= moduleId)`
    );
    
    // Fix completion check
    content = content.replace(
      `setIsCompleted(progress.currentModule > ${i})`,
      `setIsCompleted(progress.currentModule > moduleId)`
    );
    
    // Fix progress update
    content = content.replace(
      `const updatedProgress = await updateUserProgress(sessionId, product, ${i + 1})`,
      `const updatedProgress = await updateUserProgress(sessionId, product, moduleId + 1)`
    );
    
    // Fix progress message for module 30
    if (i === 30) {
      content = content.replace(
        /\{isCompleted \? "Module completed! " \+ \([^}]+\) : "Complete this module to unlock the next one\."\}/,
        '{isCompleted ? "Module completed! Congratulations on finishing the course!" : "Complete this module to finish the course."}'
      );
    } else {
      content = content.replace(
        /\{isCompleted \? "Module completed! " \+ \([^}]+\) : "Complete this module to unlock the next one\."\}/,
        '{isCompleted ? "Module completed! You can now access the next module." : "Complete this module to unlock the next one."}'
      );
    }
    
    // Fix button text for module 30
    if (i === 30) {
      content = content.replace(
        /\{isUpdating \? "Completing\.\.\." : "Complete Module " \+ id \+ \([^}]+\)\}/,
        '{isUpdating ? "Completing..." : "Complete Module " + moduleId + " & Finish Course"}'
      );
    } else {
      content = content.replace(
        /\{isUpdating \? "Completing\.\.\." : "Complete Module " \+ id \+ \([^}]+\)\}/,
        `{isUpdating ? "Completing..." : \`Complete Module \${moduleId} →\`}`
      );
    }
    
    // Fix button description for module 30
    if (i === 30) {
      content = content.replace(
        'Once you\'ve completed the learning objectives above, click the button below to mark this module as complete and unlock the next module..',
        'Once you\'ve completed the learning objectives above, click the button below to complete the final module and finish the course!'
      );
    } else {
      content = content.replace(
        'Once you\'ve completed the learning objectives above, click the button below to mark this module as complete and unlock the next module..',
        'Once you\'ve completed the learning objectives above, click the button below to mark this module as complete and unlock the next module.'
      );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: module-${i}`);
  }
}

console.log('All modules fixed!');
