import assert from "node:assert/strict"
import { mkdtempSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import plugin from "../index.js"

const directory = mkdtempSync(join(tmpdir(), "opencode-0-injection-"))
writeFileSync(join(directory, "0-injection-prompt.md"), "ZERO_INJECTION_RULE\n")

const hooks = await plugin.server({ directory }, { file: "0-injection-prompt.md" })
const output = {
  system: ["AGENT_PROMPT\nYou are powered by model.\nORIGINAL_INSTRUCTIONS_MARKER"],
}

await hooks["experimental.chat.system.transform"]({ sessionID: "smoke", model: { id: "test" } }, output)

const text = output.system[0]
const positions = {
  zero: text.indexOf("ZERO_INJECTION_RULE"),
  agent: text.indexOf("AGENT_PROMPT"),
  environment: text.indexOf("You are powered"),
  instruction: text.indexOf("ORIGINAL_INSTRUCTIONS_MARKER"),
}

assert.equal(text.indexOf("<opencode-0-injection-prompt>"), 0)
assert.ok(positions.zero >= 0, "zero injection prompt is missing")
assert.ok(positions.zero < positions.agent, "zero injection must precede agent prompt")
assert.ok(positions.agent < positions.environment, "agent prompt must precede environment")
assert.ok(positions.environment < positions.instruction, "environment must precede instruction")

const before = output.system[0]
await hooks["experimental.chat.system.transform"]({ sessionID: "smoke", model: { id: "test" } }, output)
assert.equal(output.system[0], before, "transform should be idempotent")

console.log("SMOKE_OK", JSON.stringify(positions))
