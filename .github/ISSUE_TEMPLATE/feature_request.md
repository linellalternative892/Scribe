---
name: Feature Request
about: Suggest a new component, configuration option, or improvement
title: "[Feature] "
labels: enhancement
assignees: ''
---

**What problem does this solve?**

Describe the documentation challenge or limitation you're running into. What are you trying to accomplish that Scribe doesn't currently support?

**Proposed solution**

Describe the feature you'd like. Be specific about what it would look like from a user's perspective.

If this is a new component, show what the usage API would look like:

```tsx
<MyNewComponent
  propA="value"
  propB={42}
/>
```

If this is a configuration option, show where it would live in `scribe.config.ts`:

```typescript
const config: ScribeConfig = {
  newFeature: {
    enabled: true,
    option: "value",
  },
};
```

**Alternatives you've considered**

Describe any workarounds you've tried, or other approaches that could solve the problem.

**Are you willing to implement this?**

- [ ] Yes, I'd like to submit a PR for this
- [ ] Yes, but I'd need guidance on where to start
- [ ] No, I'm just requesting it

**Additional context**

Screenshots, mockups, links to similar implementations in other frameworks, or any other context that helps explain the request.
