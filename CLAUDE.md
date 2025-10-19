# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A React 18 leaderboard application for tracking DaleStudy member progress on LeetCode Blind 75 problems. Members earn grades (SEED → SPROUT → LEAF → BRANCH → FRUIT → TREE) based on solved problem count.

## Development Commands

```bash
# Development
bun install          # Install dependencies
bun run dev          # Start Vite dev server
bun run build        # Production build
bun run preview      # Preview production build

# Testing
bun run test         # Run Vitest in watch mode
bun run coverage     # Generate coverage report (requires 70% threshold)

# Code Quality
bun run lint         # Run ESLint
bun run format:check # Check formatting
bun run format:write # Auto-format with Prettier

# Storybook
bun run storybook    # Start Storybook dev server (port 6006)
bun run build-storybook    # Build static Storybook
bun run test-storybook     # Run accessibility tests on all stories

# Run Single Test
bun run test src/components/Card/Card.test.tsx
```

## Architecture

### Tech Stack

- **Framework**: React 18 + TypeScript 5.8
- **Build Tool**: Vite 6.3 (3 entry points: index.html, progress.html, certificate.html)
- **State Management**: Custom hooks (no external state library)
- **API Client**: Apollo Client 3.13 (GraphQL)
- **Testing**: Vitest 3.1 + React Testing Library + Storybook Test Runner
- **Styling**: CSS Modules
- **Package Manager**: Bun

### Data Flow

```
GitHub GraphQL API (https://dalestudy.fly.dev/)
  ↓ gitHubClient.ts (Apollo Client)
  ↓ fetchService.ts (extract teams, members, submissions)
  ↓ processService.ts (calculate progress & grades)
  ↓ useMembers.ts (React hook with filtering)
  ↓ Page Components (Leaderboard, Progress, Certificate)
```

### Key Services

**`src/api/getMembers.ts`**: Main orchestrator that combines fetch + process services

**`src/api/services/fetch/fetchService.ts`**:

- Fetches GitHub teams (filters teams starting with "leetcode")
- Parses file paths with regex: `^([^/]+)/([^.]+)\.([a-zA-Z0-9]+)$`
- Extracts: (problemTitle, memberId, language)

**`src/api/services/process/processService.ts`**:

- Calculates grade based on thresholds (TREE: 70+, FRUIT: 60+, BRANCH: 45+, LEAF: 30+, SPROUT: 15+, SEED: 0+)
- Deduplicates submissions per member
- Filters out members with zero submissions
- Business logic is tested in `processService.test.ts`

**`src/api/infra/gitHub/gitHubClient.ts`**: Apollo Client with 3 GraphQL queries:

- `GetTeams`: List all team names
- `GetTeamMembers($teamName)`: Fetch members in a cohort
- `GetGitTrees`: List all solution files in repository tree

### Problem Database

**`src/api/constants/problems.ts`**: Central registry of all 75 LeetCode problems with:

- LeetCode ID (number)
- Title (kebab-case)
- Difficulty (Easy/Med/Hard)
- Pre-computed maps for O(1) lookup

### Custom Hooks

**`src/hooks/useMembers.ts`**:

- Fetches member data via `getMembers()`
- Provides filtering by name (case-insensitive) and cohort
- Returns: `{ members, totalCohorts, isLoading, error, filter, setFilter }`
- Sorts by progress (descending)

**`src/hooks/usePagination.ts`**:

- Generic pagination (default: 16 items/page)
- Auto-resets to page 1 when data changes
- Returns: `{ currentPage, totalPages, paginatedData, goNext, goPrevious }`

## Component Patterns

### Standard Component Structure

```
src/components/ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.test.tsx     # Unit tests (Vitest)
├── ComponentName.stories.tsx  # Storybook stories
└── ComponentName.module.css   # CSS Modules
```

### Pages (3 HTML Entry Points)

1. **Leaderboard** (`/`): Main rankings with SearchBar + Card grid + Pagination
2. **Progress** (`/progress?member=:id`): Member details with Sidebar + Table
3. **Certificate** (`/certificate?member=:id`): Printable achievement certificate

Navigation uses query parameters (`?member=:id`) for static page compatibility.

## Testing Strategy

### Three-Layer Testing

1. **Unit Tests** (Vitest + React Testing Library):

   - All `*.test.tsx` files
   - Environment: `happy-dom`
   - Coverage requirement: 70% (lines, functions, statements, branches)
   - Stories excluded from coverage

2. **Component Stories** (Storybook 8.6):

   - All `*.stories.tsx` files
   - MSW for GraphQL mocking (setup in `.storybook/preview.ts`)
   - Interactive component playground
   - Auto-generated documentation

3. **Accessibility Testing** (Storybook Test Runner + Axe):
   - Runs on all stories via `bun run test-storybook`
   - Configuration in `.storybook/test-runner.ts`
   - Automated a11y checks with `axe-playwright`

### Testing Conventions

- Use `screen.getByRole()` for accessibility-first queries
- Mock services with `vi.mock()` and `vi.mocked()`
- Test business logic separately from components (see `processService.test.ts`)
- Use `@testing-library/user-event` for user interactions
- Stories use `fn()` from `@storybook/test` for action tracking

Example:

```typescript
// Unit test
test("renders grade image", () => {
  render(<Card id="test" name="test" grade="TREE" cohorts={[1]} />);
  expect(screen.getByRole("img", { name: "TREE image" })).toBeInTheDocument();
});

// Story
export const Default: StoryObj<typeof Card> = {
  args: {
    id: "test",
    name: "Test User",
    grade: "TREE",
    cohorts: [1, 2],
  },
};
```

## GraphQL & API

### Apollo Client Configuration

- **Endpoint**: `https://dalestudy.fly.dev/`
- **Cache**: InMemoryCache (default policies)
- **Location**: `src/api/infra/gitHub/gitHubClient.ts`

### Type System

All external API types in `src/api/services/types.ts`:

```typescript
Member {
  id: string              // lowercase username
  name: string            // original username
  cohorts: number[]       // [1, 2, 3]
  profileUrl?: string     // GitHub avatar
  progress: number        // 0-100
  grade: Grade            // SEED|SPROUT|LEAF|BRANCH|FRUIT|TREE
  solvedProblems: Problem[]
}

Problem {
  id: number              // LeetCode ID
  title: string           // kebab-case
  difficulty: "Easy" | "Med" | "Hard"
}
```

## Configuration Files

### Grade Thresholds

**`src/api/config/index.ts`**: Contains grade calculation constants

- `TOTAL_PROBLEMS = 75`
- Grade boundaries (can be modified here)

### Build Configuration

**`vite.config.ts`**:

- Multi-page app with 3 entry points
- Test setup with happy-dom
- Coverage thresholds enforced

### TypeScript

**`tsconfig.app.json`**:

- Strict mode enabled
- `noUnusedLocals`, `noUnusedParameters` enforced
- Module resolution: bundler

## CI/CD

### Integration Workflow (`.github/workflows/integration.yml`)

Runs on every PR:

```bash
bun run format:check  # Prettier check
bun run lint          # ESLint
bun run coverage      # Tests with 70% threshold
bun run build         # Production build
```

Plus Chromatic deployment for visual regression testing.

### Pre-commit Hooks

- **lint-staged**: Auto-formats all files with Prettier
- **Husky**: Manages Git hooks

## Special Conventions

### File Naming

- Components: PascalCase (`Card.tsx`)
- Services/utils: camelCase (`processService.ts`)
- Tests: `*.test.ts(x)`
- Stories: `*.stories.ts(x)`
- Styles: `*.module.css`

### Error Handling

- Custom error UI components: `ServerError`, `NotFound`, `Unqualified`
- Loading states: `Spinner` component
- Try-catch in hooks with `setError` state

### Accessibility

- Semantic HTML with ARIA labels
- Role-based test queries
- Automated Axe testing in Storybook
- a11y addon in Storybook dev mode

## Adding New Features

### To Add a New Component:

1. Create folder: `src/components/NewComponent/`
2. Add 4 files: `.tsx`, `.test.tsx`, `.stories.tsx`, `.module.css`
3. Use CSS Modules for styling (import as `styles`)
4. Export from component file
5. Write tests using `screen.getByRole()`
6. Create at least one story with args

### To Modify Data Processing:

1. Update types in `src/api/services/types.ts`
2. Modify business logic in `processService.ts`
3. Update tests in `processService.test.ts`
4. Verify coverage remains above 70%

### To Add GraphQL Queries:

1. Add query to `src/api/infra/gitHub/gitHubClient.ts`
2. Update Apollo Client methods
3. Mock in `.storybook/preview.ts` for Storybook
4. Mock in unit tests with `vi.mock()`

### To Modify Grade System:

1. Update thresholds in `src/api/config/index.ts`
2. Update grade images in `src/assets/`
3. Update tests in `processService.test.ts`
4. Update certificate emoji mapping in `src/pages/Certificate/constants.ts`

## Debugging

### Component Issues:

- Use Storybook for isolated component testing
- Check CSS Module class names (use browser DevTools)
- Verify props with React DevTools

### Data/API Issues:

- Check Apollo Client DevTools in browser
- Add console.log in `fetchService.ts` or `processService.ts`
- Verify GraphQL responses match expected types

### Test Failures:

- Run `bun run test` for watch mode
- Check test coverage: `bun run coverage`
- View HTML coverage report: `open coverage/index.html`

### Build Issues:

- Verify all 3 HTML entry points exist
- Check Vite config for correct input paths
- Ensure TypeScript has no errors: `bunx tsc --noEmit`
