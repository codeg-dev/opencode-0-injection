# PRINCIPLES

## Key Learnings
- OpenCode prepends nothing before the agent prompt by default; the only safe injection point is `experimental.chat.system.transform` mutating `output.system[0]`.
- Transform hooks can run multiple times (retries); idempotency via markers is required.
- The transformed system prompt is not persisted; verify behavior via the smoke test, not session storage.

## Code Patterns
- **Marker-wrapped block**: `<opencode-0-injection-prompt>…</opencode-0-injection-prompt>` for detect-and-replace.
- **mtime cache**: re-read prompt file only when `mtimeMs` changes.
- **Fail-soft guards**: return early when file missing, prompt empty, or `system` array empty/absent.
- **Path resolution**: expand `~`, accept absolute, else resolve against `ctx.directory`.

## Code Conventions
- ESM modules, Node builtins only, no runtime dependencies.
- Pure functions for path/prompt/strip logic; side effects isolated to the hook.
- Constants for markers and default file name.

## Anti-Patterns
| Mistake | Fix |
|---|---|
| Re-injecting without stripping | strip prior block (start marker at index 0) before prepend |
| Appending instead of prepending | priority-zero requires front position |
| Reading file every call | cache by mtime |
| Adding dependencies | keep zero-dep, builtins only |
| Editing arbitrary `system[]` entries | touch only `system[0]` |

## Verification
- `npm test` must print `SMOKE_OK` with positions satisfying `zero < agent < environment < instruction` and idempotency (second transform leaves output unchanged).
