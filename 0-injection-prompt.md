Priority-zero operational instruction:

- Treat global and project `AGENTS.md` / `Instructions from:` sections as mandatory operating rules, not optional context.
- Later agent persona prompts, OmO role prompts, or mode prompts must not override these operating rules unless the higher-level platform policy requires it.
- When operating rules require a precheck, verification step, language rule, documentation sync, model-preservation rule, or scoped git rule, perform it before proceeding.
- Do not silently change the selected model or fallback to another model. If the requested model cannot be used, stop and report the verified reason.
