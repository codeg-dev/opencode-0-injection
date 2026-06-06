# opencode-0-injection KNOWLEDGE BASE
Generated: 2026-06-06
Commit: fb0f871
Branch: main

## OVERVIEW
OpenCode server plugin. Prepends a priority-zero operational prompt before the agent prompt via `experimental.chat.system.transform`. Final order: `0-injection-prompt → agent prompt → environment → instruction`.

## STRUCTURE
- `index.js` — plugin entry. Prompt reader (mtime cache), marker strip, transform hook.
- `0-injection-prompt.md` — injected priority-zero rules (default file).
- `test/smoke.mjs` — ordering + idempotency smoke test.
- `package.json` — ESM, no deps, `npm test`.
- `README.md` — purpose, config, behavior.

## WHERE TO LOOK
| Task | Location | Notes |
|---|---|---|
| Transform logic | `index.js:50-58` | builds `output.system[0]` |
| Idempotency | `index.js:37-42` | `stripPreviousInjection` |
| Prompt path resolve | `index.js:15-19` | home expand + absolute/relative |
| Injected rules | `0-injection-prompt.md` | operator-edited |
| Test contract | `test/smoke.mjs` | `zero<agent<environment<instruction` |

## CONVENTIONS
- ESM only (`type: module`), Node builtins (`fs`/`os`/`path`), zero runtime deps.
- Markers `<opencode-0-injection-prompt>…</opencode-0-injection-prompt>` wrap injected block.
- Commit style: concise imperative.

## ANTI-PATTERNS
| Don't | Why | Do Instead |
|---|---|---|
| Append injection at end | breaks priority-zero order | prepend to `system[0]` |
| Skip marker strip | duplicates on retry/transform | strip before re-inject |
| Add deps | keeps plugin portable | use Node builtins |
| Mutate other `system[]` entries | only index 0 is the lead block | edit `system[0]` only |

## COMMANDS
- `npm test` — run smoke test.

## TECH STACK
| Component | Version | Notes |
|---|---|---|
| Node | ESM | builtins only |
| OpenCode plugin API | `server` + `experimental.chat.system.transform` | hook contract |

## NOTES
- Install: copy to `~/.config/opencode/plugins/opencode-0-injection` or point `plugin` entry at absolute path.
- Config option `file` selects the prompt file (default `0-injection-prompt.md`).
- Transformed system prompt is NOT persisted to session storage (request-time only).

## Rules
- Keep scope minimal; no speculative config or single-use abstractions.
- Preserve zero-dependency, ESM-only design.
- Modify AGENTS.md/CONTEXT.md/PRINCIPLES.md using `/doc-optimize`.

## Docs
- CONTEXT.md - Project background and architecture
- PRINCIPLES.md - Development principles and patterns
