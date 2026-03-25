# `blank` and `_blank` in React

## Overview

In React (and web development broadly), `blank` and `_blank` are related to how links open their target URLs. They primarily appear as values for the `target` attribute on anchor (`<a>`) tags — and by extension, React's `<Link>` components.

---

## `target="_blank"`

The `target` attribute on an anchor tag specifies **where** the linked document should open. Setting it to `"_blank"` tells the browser to open the link in a **new tab or window**.

```jsx
<a href="https://example.com" target="_blank">
  Open in new tab
</a>
```

### How it works

| Value | Behavior |
|-------|----------|
| `_self` | Opens in the same tab (default) |
| `_blank` | Opens in a new tab or window |
| `_parent` | Opens in the parent frame |
| `_top` | Opens in the full body of the window |

---

## The Security Risk: `rel="noopener noreferrer"`

Whenever you use `target="_blank"`, you **must** pair it with `rel="noopener noreferrer"`. Without it, you expose your app to a vulnerability known as **reverse tabnapping**.

### What is reverse tabnapping?

When a new tab is opened via `_blank`, the newly opened page gains access to the **opener window** via `window.opener`. A malicious site could use this to redirect your original tab to a phishing page.

```jsx
// ❌ Unsafe — exposes window.opener to the linked page
<a href="https://malicious-site.com" target="_blank">
  Click me
</a>

// ✅ Safe — severs the opener relationship
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Open safely in new tab
</a>
```

### What each `rel` value does

- **`noopener`** — Prevents the new tab from accessing `window.opener`, blocking reverse tabnapping.
- **`noreferrer`** — Prevents the browser from sending the `Referer` HTTP header, hiding your page's URL from the destination site. It also implies `noopener`.

> **Rule of thumb:** Always use both together: `rel="noopener noreferrer"`.

---

## Usage in React Router's `<Link>`

React Router's `<Link>` component is designed for **internal navigation** and does not natively support `target="_blank"`. For external links that open in a new tab, use a plain `<a>` tag.

```jsx
// Internal link — use <Link>
import { Link } from "react-router-dom";

<Link to="/about">About Us</Link>

// External link in new tab — use <a>
<a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
  React Docs
</a>
```

If you must use `<Link>` with `target`, React Router does pass additional props to the underlying `<a>` tag:

```jsx
// This works but is uncommon — prefer plain <a> for external URLs
<Link to="/report" target="_blank" rel="noopener noreferrer">
  Open Report
</Link>
```

---

## ESLint Warning: `jsx-a11y/anchor-is-valid`

When using `target="_blank"`, you may see linting warnings. The `eslint-plugin-jsx-a11y` plugin enforces accessibility rules and will flag:

- Missing `rel` on `_blank` links
- Anchors used as buttons (no `href`)

The `react/jsx-no-target-blank` ESLint rule will specifically warn you if you use `target="_blank"` **without** `rel="noopener noreferrer"`.

```jsx
// ESLint error: Using target="_blank" without rel="noreferrer"
<a href="https://example.com" target="_blank">Link</a>

// ✅ No error
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Link</a>
```

---

## Creating a Reusable `ExternalLink` Component

A clean pattern in React is to create a reusable component that enforces safe external linking by default:

```jsx
// components/ExternalLink.jsx

const ExternalLink = ({ href, children, className, ...props }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};

export default ExternalLink;
```

**Usage:**

```jsx
import ExternalLink from "./components/ExternalLink";

<ExternalLink href="https://github.com">
  View on GitHub
</ExternalLink>
```

This ensures you never accidentally forget `rel="noopener noreferrer"` across your codebase.

---

## Quick Reference

```jsx
// Open in same tab (default)
<a href="/page">Same tab</a>

// Open in new tab — safely
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
  New tab
</a>

// Internal route (React Router)
<Link to="/dashboard">Dashboard</Link>

// Reusable safe external link
<ExternalLink href="https://docs.example.com">Documentation</ExternalLink>
```

---

## Summary

| Concept | Purpose |
|---------|---------|
| `target="_blank"` | Opens a link in a new browser tab |
| `rel="noopener"` | Blocks access to `window.opener` |
| `rel="noreferrer"` | Hides referrer info + implies `noopener` |
| Plain `<a>` tag | Preferred for external links in React |
| `<Link>` component | For internal React Router navigation only |
| `ExternalLink` component | Reusable pattern that enforces safety by default |
