# CONTEXT

## Purpose & Vision
Give operators a single, highest-priority prompt slot that sits in front of every agent/persona/mode prompt. OpenCode core builds the system prompt as `agent prompt → environment → instruction (AGENTS.md)`. This plugin prepends one operator-controlled file so operating rules (AGENTS.md, model-preservation, verification steps) are treated as mandatory and not overridden by later persona prompts.

## Technical Architecture
- **Entry**: default export with `id` and async `server(ctx, options)`.
- **Prompt reader**: `createPromptReader` resolves the configured `file` (home-expanded, absolute or relative to `ctx.directory`), caches by `mtimeMs`, returns trimmed content.
- **Hook**: `experimental.chat.system.transform(_input, output)` runs at request time. Guards on empty `output.system`, reads the prompt, strips any prior injected block, then prepends `[START_MARKER, prompt, END_MARKER, existing]`.
- **Idempotency**: `stripPreviousInjection` only strips when the start marker is at index 0, so repeated transforms/retries do not stack duplicates.

## Current State
- Single-file plugin, zero dependencies, working smoke test.
- One commit (`fb0f871`). Installed and wired in global `~/.config/opencode/opencode.json` plugin array.
- Behavior verified: smoke test passes; ordering and idempotency hold.

## Known Limitations
- Transformed `system[]` is in-memory only; not written to session storage (no on-disk per-session proof).
- Only `output.system[0]` is modified; assumes the lead block carries the agent prompt.

## On the Horizon
- Optional: multiple injection files / ordered blocks.
- Optional: per-agent or per-mode prompt selection.
