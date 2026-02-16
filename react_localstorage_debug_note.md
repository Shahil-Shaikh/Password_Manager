# React + localStorage Debugging Note

## 1. The Original Problem

While building a password manager component:

-   Passwords were being saved using:

    ``` js
    localStorage.setItem("psswds", JSON.stringify([..._password_array, form]));
    ```

-   But in **Browser DevTools → Application → Local Storage**, it was
    showing empty.

-   When `localStorage.getItem()` was moved inside `useEffect`, it
    started working.

-   Later, moving it back outside also worked.

-   This created confusion about what was actually wrong.

------------------------------------------------------------------------

## 2. Important React Concepts

### React Components Re-Run Completely

In React:

``` js
function Manager() {
   // entire function runs again on every re-render
}
```

Every time state changes: - The whole component function runs again. -
All variables inside it are recreated. - It is NOT like normal
JavaScript that runs once.

------------------------------------------------------------------------

## 3. Render Phase vs Effect Phase

React works in two main phases:

### Render Phase

-   Component function runs
-   State is read
-   JSX is returned
-   Should be pure (no side effects)

### Effect Phase

-   `useEffect()` runs
-   Used for:
    -   localStorage
    -   API calls
    -   timers
    -   DOM operations

localStorage interaction is considered a side effect.

------------------------------------------------------------------------

## 4. What Was Happening

Initially:

``` js
const passwords = localStorage.getItem("psswds");

useEffect(() => {
  if (passwords) {
    set_password_array(JSON.parse(passwords));
  }
}, []);
```

This means: - `getItem()` ran during render. - `useEffect` used that
captured value. - Effect ran only once.

Saving logic:

``` js
localStorage.setItem("psswds", JSON.stringify([..._password_array, form]));
```

Saving was always correct and immediate.

------------------------------------------------------------------------

## 5. Why It Looked Broken

The issue was NOT saving.

Possible causes:

-   React Strict Mode double rendering in development.
-   Checking DevTools before refresh.
-   State update timing confusion.
-   DevTools Application tab not auto-refreshing.
-   Observing during render cycle.

------------------------------------------------------------------------

## 6. React Strict Mode (Very Important)

In development, React often wraps your app in:

``` jsx
<React.StrictMode>
```

Strict Mode: 1. Mounts component 2. Unmounts it 3. Mounts it again

This only happens in development.

This can make behavior appear inconsistent during debugging.

------------------------------------------------------------------------

## 7. Why Moving getItem() Inside useEffect Fixed It

When changed to:

``` js
useEffect(() => {
  const passwords = localStorage.getItem("psswds");
  if (passwords) {
    set_password_array(JSON.parse(passwords));
  }
}, []);
```

Now: - Reading is aligned with React lifecycle. - Runs after component
mounts. - Cleaner architecture. - More predictable behavior.

------------------------------------------------------------------------

## 8. Key Understanding

Saving and reading are independent:

``` js
localStorage.setItem()  // Saves immediately
localStorage.getItem()  // Reads current value
```

Where `getItem()` is placed does NOT affect saving.

The confusion came from: - React re-render behavior - Strict Mode double
mount - Observing DevTools during unstable render timing

------------------------------------------------------------------------

## Final Takeaway

-   React components re-run completely on every state update.
-   State updates are asynchronous.
-   localStorage operations are side effects.
-   Side effects should be placed inside `useEffect` for clean
    architecture.
-   The original issue was debugging confusion, not a broken saving
    mechanism.
