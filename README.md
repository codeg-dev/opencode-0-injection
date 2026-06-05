# opencode-0-injection

Local OpenCode server plugin that prepends a priority-zero operational prompt before the agent prompt.

## Purpose

OpenCode builds its final system prompt in this broad order:

```text
agent prompt → environment → Instructions from AGENTS.md
```

This plugin keeps OpenCode core behavior intact, but prepends one operator-controlled prompt file at the very front:

```text
0-injection-prompt → agent prompt → environment → instruction
```

The default prompt file is `0-injection-prompt.md`.

## OpenCode config

```json
{
  "plugin": [
    [
      "./plugins/opencode-0-injection",
      {
        "file": "0-injection-prompt.md"
      }
    ]
  ]
}
```

When this repository is checked out separately, either copy it into `~/.config/opencode/plugins/opencode-0-injection` or point the plugin entry at the absolute checkout path.

## Behavior

The plugin uses OpenCode's `experimental.chat.system.transform` hook. It wraps the injected prompt with markers so retries or repeated transforms do not accumulate duplicate blocks:

```text
<opencode-0-injection-prompt>
...
</opencode-0-injection-prompt>
```

## Smoke test

```bash
npm test
```

The smoke test imports the plugin, runs the transform against a synthetic system prompt, and verifies this ordering:

```text
0-injection < agent prompt < environment < instruction
```

## AI authorship disclosure

This repository was created with AI assistance for codeg OpenCode operations.
