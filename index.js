import { existsSync, readFileSync, statSync } from "node:fs"
import { homedir } from "node:os"
import { isAbsolute, resolve } from "node:path"

const DEFAULT_PROMPT_FILE = "0-injection-prompt.md"
const START_MARKER = "<opencode-0-injection-prompt>"
const END_MARKER = "</opencode-0-injection-prompt>"

function expandHome(path) {
  if (path === "~") return homedir()
  if (path.startsWith("~/")) return resolve(homedir(), path.slice(2))
  return path
}

function resolvePromptPath(directory, configuredPath) {
  const raw = typeof configuredPath === "string" && configuredPath.trim() ? configuredPath.trim() : DEFAULT_PROMPT_FILE
  const expanded = expandHome(raw)
  return isAbsolute(expanded) ? expanded : resolve(directory, expanded)
}

function createPromptReader(directory, options) {
  const promptPath = resolvePromptPath(directory, options?.file)
  let cachedMtimeMs = -1
  let cachedPrompt = ""

  return function readPrompt() {
    if (!existsSync(promptPath)) return ""
    const stat = statSync(promptPath)
    if (stat.mtimeMs === cachedMtimeMs) return cachedPrompt

    cachedMtimeMs = stat.mtimeMs
    cachedPrompt = readFileSync(promptPath, "utf8").trim()
    return cachedPrompt
  }
}

function stripPreviousInjection(systemText) {
  const start = systemText.indexOf(START_MARKER)
  const end = systemText.indexOf(END_MARKER)
  if (start !== 0 || end < 0) return systemText
  return systemText.slice(end + END_MARKER.length).replace(/^\s+/, "")
}

export default {
  id: "opencode-0-injection",
  async server(ctx, options = {}) {
    const readPrompt = createPromptReader(ctx.directory, options)

    return {
      async "experimental.chat.system.transform"(_input, output) {
        if (!Array.isArray(output.system) || output.system.length === 0) return

        const prompt = readPrompt()
        if (!prompt) return

        const existing = stripPreviousInjection(String(output.system[0] ?? ""))
        output.system[0] = [START_MARKER, prompt, END_MARKER, existing].filter(Boolean).join("\n")
      },
    }
  },
}
