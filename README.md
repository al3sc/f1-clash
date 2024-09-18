# React + Vite
https://www.youtube.com/watch?v=Bk28snjHr7c
1. vite.config.js: add config 'base: "/{repo-name}/"'
2. in ./ add new file '.github/workflows/deploy.yml'
2.1. add deploy configuration (as it is)
3. Go to the GitHub repository
3.1. Settings
3.1.1. Actions (in the left)
3.1.2. General
3.1.3. Workflow permissions > chose "Read and write permissions"
3.1.4. Save
3.2. Actions (top)
3.2.1. select the failed workfloy run
3.2.2. 