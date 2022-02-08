#Veriff test task

# Stack:
- `React` + `JS`
- `PropTypes` for props definition
- `React test library `for tests
- `SCSS `support out-of-the-box by CRA
- CSS modules by `node-sass`
- `classnames` for combination the styles
- Notifications by `Toastify`
- additional tools like `eslint` with `airbnb` + `react-hooks` configs (not pushed)

#The project

- **Components folder** contains React components that could be reused later
- **Container folder** contains wrapper that includes some fetch logic to pass data deeper in the components

The logic is handled by `CheckingToolContainer` which is fetching and passing data to the `CheckingTool` component.
`CheckingTool` manages the changes in the checklist, process the changes, and pass them back to the container by submitting the results.
I also made some changes in the `Api.js` file (increased timeout) to make the fetching process more visible.
