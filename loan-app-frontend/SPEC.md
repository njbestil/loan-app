# Loan App Frontend Specification

## Purpose

This project is the React + Vite frontend for a loan application and credit/risk evaluation system. It supports authentication, user management, credit score model management, risk rating model management, loan pre-evaluation, loan application creation, application reporting, and basic informational dashboard pages.

This file is intended as a reference for future maintainers and agentic AI coding assistants before making changes.

## Tech Stack

- React 18
- Vite 5
- React Router 6
- Axios
- Tailwind CSS
- Flowbite React
- React Icons
- Recharts

## Current Project Shape

```txt
src/
  App.jsx
  AppRouter.jsx
  main.jsx
  components/
    Header.jsx
    Footer.jsx
  layout/
    Dashboard.jsx
  pages/
    dashboard/
      creditdata/
      creditscore/
      models/
      users/
  features/
    auth/
      pages/
      services/
    users/
      pages/
      services/
  services/
    api.js
    dataService.js
    userService.js
  utils/
    stringUtils.js
  assets/
```

## Main Functional Areas

### Authentication

Located mostly in:

- `src/features/auth/pages/Login.jsx`
- `src/features/auth/pages/ForgotPassword.jsx`
- `src/features/auth/pages/ResetPassword.jsx`
- `src/features/auth/pages/Register.jsx`
- `src/features/auth/pages/EmailVerified.jsx`
- `src/features/auth/services/authService.js`
- `src/services/userService.js`

Authentication data is currently stored in `localStorage` under the `user` key. API requests use a bearer token from that stored user object.

### Dashboard Layout

Located mostly in:

- `src/layout/Dashboard.jsx`
- `src/components/Header.jsx`

Dashboard pages currently wrap their content manually with the `Dashboard` component. The layout performs a basic localStorage auth check and redirects unauthenticated users to `/login`.

### Users

Located mostly in:

- `src/features/users/pages/Users.jsx`
- `src/features/users/pages/UserProfile.jsx`
- `src/features/users/services/usersService.js`
- `src/services/userService.js`

This area manages users, user profiles, password changes, filtering, and links to user loan applications.

### Credit and Risk Models

Located mostly in:

- `src/pages/dashboard/models/Models.jsx`
- `src/pages/dashboard/models/ViewModel.jsx`
- `src/pages/dashboard/models/CreateCreditModel.jsx`
- `src/pages/dashboard/models/CreateRiskModel.jsx`
- `src/services/dataService.js`

Credit and risk scoring models are stored by the backend as JSON string fields such as `score_form` and `passing_score`.

### Loan Evaluation and Applications

Located mostly in:

- `src/pages/dashboard/creditscore/PreEvaluation.jsx`
- `src/pages/dashboard/creditscore/Evaluation.jsx`
- `src/pages/dashboard/creditdata/Application.jsx`
- `src/pages/dashboard/creditdata/UserApplication.jsx`
- `src/pages/dashboard/creditdata/ApplicantDetails.jsx`
- `src/pages/dashboard/creditdata/ApplicationReport.jsx`
- `src/services/dataService.js`

This area contains most of the domain logic: scoring calculations, risk grouping, reporting, application creation, and chart data preparation.

## Current Architectural Issues

The codebase is functional but still organized like an early prototype. Important issues to keep in mind:

- Several page components are very large and mix UI, data fetching, validation, transformation logic, routing, and domain calculations.
- Routing is centralized in one flat `AppRouter.jsx` file with no route groups, layout routes, lazy loading, or dedicated protected route component.
- `Dashboard.jsx` acts like a protected layout but is manually wrapped by pages instead of being expressed in the router.
- API token attachment is duplicated in service methods even though `api.js` already has a request interceptor.
- Local storage is used both for auth and for passing selected model/application details between pages.
- Repeated helper logic exists across files, including date formatting, phone formatting, error handling, loading screens, and scoring utilities.
- Naming is inconsistent in some places. For example, `Dashboard.jsx` exports a function named `Webpage`.
- Several files contain unused imports, stale state, console logging, and lint errors.
- Some route paths are inconsistent, such as `/forgotpassword` instead of `/forgot-password`.

## Refactor Goals

Refactors should move the project toward:

- Feature-based organization.
- Thin page components.
- Reusable, focused UI components.
- Centralized API and auth behavior.
- Route-level layouts and guards.
- Domain logic separated from rendering.
- Shared formatting, validation, and error handling utilities.
- Consistent naming and routing conventions.
- Passing lint as a baseline quality gate.

## Recommended Target Structure

Future refactors should gradually move toward this shape:

```txt
src/
  app/
    App.jsx
    router.jsx
    providers.jsx
  layouts/
    DashboardLayout.jsx
    AuthLayout.jsx
  shared/
    api/
      client.js
      errors.js
    components/
      AppHeader.jsx
      PageHeader.jsx
      LoadingScreen.jsx
      ConfirmModal.jsx
      ToastMessage.jsx
    hooks/
      useAuth.js
      useToast.js
    utils/
      dates.js
      formatters.js
      validation.js
  features/
    auth/
      pages/
      services/
    users/
      pages/
      components/
      hooks/
      services/
      utils/
    models/
      pages/
      components/
      services/
      utils/
    applications/
      pages/
      components/
      services/
      utils/
    scoring/
      pages/
      components/
      services/
      utils/
```

This target structure should be adopted incrementally. Avoid large rewrites unless explicitly requested.

## Routing Guidelines

Prefer route-level layouts:

```jsx
<Route element={<GuestLayout />}>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
</Route>

<Route element={<RequireAuth />}>
  <Route element={<DashboardLayout />}>
    <Route path="/home" element={<HomePage />} />
    <Route path="/users" element={<UsersPage />} />
    <Route path="/models" element={<ModelsPage />} />
  </Route>
</Route>
```

Use React Router `Link` and `NavLink` instead of raw `href` navigation where possible.

## API Guidelines

The API client should own:

- Base URL configuration.
- JSON headers.
- Bearer token injection.
- Shared response/error normalization.

Service functions should be thin and should not repeat authorization headers unless there is a special case.

Recommended pattern:

```js
export const usersService = {
  list: () => api.get("/user").then((response) => response.data),
  update: (id, payload) => api.put(`/user/${id}`, payload).then((response) => response.data),
  remove: (id) => api.delete(`/user/${id}`).then((response) => response.data),
};
```

The API base URL should eventually come from Vite environment variables:

```txt
VITE_API_URL=http://127.0.0.1:8000/api
```

## State Management Guidelines

Current state management uses local component state and localStorage.

Near-term preferred approach:

- Keep local UI state in components.
- Extract repeated async state into feature hooks.
- Keep auth state behind a small `useAuth` hook or auth provider.
- Use route params/query params for entity identity.
- Fetch selected records by id instead of storing whole records in localStorage.

Potential future improvement:

- Introduce TanStack Query if server state grows or refetch/cache behavior becomes difficult to manage manually.

## Component Guidelines

Pages should coordinate data and compose components. They should avoid containing large sections of repeated JSX.

Extract components when:

- A modal has its own form and validation.
- A table has filtering/actions.
- A score step has its own fields and calculations.
- UI appears in more than one page.
- A component exceeds a comfortable review size.

Good candidates for extraction:

- `UsersTable`
- `UserFormModal`
- `ConfirmDeleteModal`
- `ModelTable`
- `CreditModelBuilder`
- `RiskModelBuilder`
- `CreditScoreStep`
- `RiskScoreStep`
- `ApplicationReportCharts`
- `LoadingScreen`
- `ToastMessage`

## Domain Logic Guidelines

Move calculation and transformation logic out of page components.

Good candidates for utilities:

- Credit score summing.
- Risk score summing.
- Risk category matching.
- Risk chart grouping.
- Criteria merging.
- Date formatting.
- Phone formatting.
- API error message extraction.

Suggested locations:

```txt
src/features/scoring/utils/scoring.js
src/features/applications/utils/reporting.js
src/shared/utils/dates.js
src/shared/utils/formatters.js
src/shared/api/errors.js
```

## Naming Conventions

Recommended conventions:

- Component files: `PascalCase.jsx`
- Hooks: `useThing.js`
- Utilities: `camelCase.js`
- Services: `thingService.js`
- Layouts: `ThingLayout.jsx`
- Pages: `ThingPage.jsx` during future refactors
- Route paths: kebab-case, for example `/forgot-password`
- Constants: `UPPER_SNAKE_CASE`

Avoid vague component names such as `Webpage`.

## Quality Gates

Before completing meaningful refactors:

```bash
npm run lint
npm run build
```

Current lint status at the time this spec was created: failing with many unused imports, undefined variables, hook dependency warnings, and stale Vite starter code.

Current refactor progress:

- Auth pages have been moved into `src/features/auth/pages`.
- Auth pages use `src/features/auth/services/authService.js` as a feature-level facade over the legacy `userService`.
- User pages have been moved into `src/features/users/pages`.
- User pages use `src/features/users/services/usersService.js` as a feature-level facade over the legacy `userService`.
- `App.jsx` no longer contains the unused Vite starter state.
- `userService.changePassword` now reads reset query parameters through `api.getQueryParam`.

Do not treat a failing baseline as permission to add more warnings. New or touched files should be kept clean.

## Agent Instructions

Before modifying code:

1. Read this `SPEC.md`.
2. Inspect the relevant feature files.
3. Preserve existing behavior unless the user explicitly asks for behavior changes.
4. Prefer small, staged refactors over broad rewrites.
5. Do not move every file at once.
6. If changing routes, verify navigation paths and redirects.
7. If changing services, verify auth token behavior.
8. If extracting scoring/reporting logic, compare outputs with the previous implementation.
9. Run lint/build when practical and report any remaining failures.

## Suggested First Refactor Pass

The safest first implementation pass is:

1. Remove Vite starter leftovers from `App.jsx`.
2. Fix undefined helper usage in `userService.js`.
3. Simplify duplicated authorization headers in service methods.
4. Add `RequireAuth` and route-level `DashboardLayout`.
5. Replace header raw links with router links.
6. Extract shared `LoadingScreen` and error normalization helpers.
7. Start splitting `Users.jsx` into table, modal, validation, and hook files.
8. Start splitting `Evaluation.jsx` into scoring utilities and step components.
