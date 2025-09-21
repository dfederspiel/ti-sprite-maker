# TI-99/4A Sprite Maker

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

TI-99/4A Sprite Maker is a React web application built with Vite that allows users to create visual sprites for the Texas Instruments TI-99/4A computer. Users click on an 8x8 grid to design sprites and get the corresponding hexadecimal values for use in TI-Basic CALL CHAR commands.

## Working Effectively

### Prerequisites and Setup
- Ensure npm is available: `which npm` (should return `/usr/local/bin/npm`)
- Always use npm as the package manager (NOT yarn) - the repository is configured for npm

### Bootstrap and Build Commands
1. **Install dependencies**: `npm install` 
   - Takes ~16 seconds typically - set timeout to 60+ seconds
   - NEVER CANCEL: Can take longer on slower systems
   - Fixes missing dependencies automatically

2. **Run tests**: `npm test`
   - Takes ~3.7 seconds - set timeout to 30+ seconds  
   - Runs vitest with coverage
   - All 22 tests should pass

3. **Build for production**: `npm run build`
   - Takes ~1.7 seconds - set timeout to 60+ seconds
   - NEVER CANCEL: Build times can vary significantly
   - Outputs to `build/` directory
   - Uses Vite for bundling

4. **Run development server**: `npm run dev`
   - Starts immediately on http://localhost:3000
   - Auto-opens browser window
   - Hot reload enabled for development

5. **Run linter**: `npm run lint`
   - Takes ~2 seconds
   - Uses ESLint with Airbnb config
   - NOTE: Currently reports style violations but doesn't block functionality

## Validation

### Manual Testing Requirements
After making any changes, ALWAYS validate the core sprite functionality:

1. **Start the development server**: `npm run dev`
2. **Navigate to**: http://localhost:3000
3. **Test sprite editing**:
   - Click individual squares in the 8x8 grid - they should toggle between black and cyan
   - Verify the hex value in "CALL CHAR(123, "xxxxxxxxx")" updates in real-time
   - Test the "click to randomize" button - should generate a random sprite pattern
4. **Test color picker**: Color palette at top and bottom should be interactive
5. **Verify persistence**: Refresh the page - the sprite pattern should persist (uses localStorage)

### Required Validation Steps
- Always run `npm test` before committing changes
- Always run `npm run build` to ensure production build works
- Always manually test the sprite editing functionality as described above
- Use browser developer tools to check for console errors

## Common File Locations

### Source Code Structure
```
src/
├── App.jsx                           # Main app component
├── index.jsx                         # React entry point  
├── components/
│   ├── ColorPicker.jsx              # Color selection component
│   ├── SpriteMaker/                 # Main sprite editor components
│   │   ├── Block.jsx                # Individual sprite grid square
│   │   ├── SpriteMaker.jsx          # Main sprite grid container
│   │   ├── MenuStrip.jsx            # Menu/toolbar component
│   │   └── __tests__/               # Component tests
│   └── context/                     # React context and business logic
│       ├── SpriteMakerContext.js    # Sprite state management
│       ├── SpriteMakerModule.js     # Hex conversion logic
│       └── SpriteMakerProvider.jsx  # Context provider
```

### Configuration Files
- `package.json` - Dependencies and scripts (uses npm)
- `vite.config.js` - Vite build configuration
- `.eslintrc.cjs` - ESLint linting rules (renamed from .js for ES modules)
- `.github/workflows/azure-static-web-apps-*.yml` - CI/CD pipeline

### Key Business Logic
- **Hex conversion**: `src/components/context/SpriteMakerModule.js` contains binary-to-hex conversion logic
- **State management**: `src/components/context/SpriteMakerContext.js` manages sprite grid state
- **Persistence**: Uses browser localStorage with key 'ti99-matrix'

## CI/CD Pipeline

The project deploys to Azure Static Web Apps via GitHub Actions:
- **Build command**: `npm test && npm run build` 
- **Output directory**: `build`
- **Test coverage**: Uploads to Codecov
- Pipeline runs on push to main and PR events

## Common Issues and Workarounds

### ESLint Configuration
- **Issue**: `.eslintrc.js` fails with ES modules error
- **Fix**: Use `.eslintrc.cjs` extension (already fixed)
- **Root cause**: package.json has `"type": "module"`

### Package Lock Conflicts
- **Issue**: Both package-lock.json and yarn.lock present
- **Fix**: Remove yarn.lock, use only package-lock.json
- **Prevention**: Always use npm commands, never yarn commands

### Lint Warnings (Non-blocking)
- Current lint issues are style-related and do not affect functionality
- Fix with: `npm run lint --fix` for auto-fixable issues
- Main issues: function component definitions, missing semicolons, trailing commas

## Development Tips

### When Editing Components
- Always check `src/components/context/SpriteMakerModule.js` after making changes to sprite logic
- The hex conversion logic is critical - test it thoroughly with manual sprite clicks
- Color changes are managed in `SpriteMakerContext.js`

### Testing Strategy
- Unit tests are in `__tests__` directories alongside components
- Use vitest (not Jest) for testing framework
- Tests use React Testing Library with jsdom environment
- Run `npm run test:watch` for interactive test development

### Performance Considerations
- Build is very fast (~2 seconds) due to Vite
- No complex build chains or heavy dependencies
- App loads instantly in development mode
- Sprite updates are real-time with no perceived lag

## Browser Compatibility
- Modern browsers with ES modules support
- Uses React 19.x - check compatibility for older browsers
- No special polyfills or transpilation needed for target audience