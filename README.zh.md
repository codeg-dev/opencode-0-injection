<p align="center">
  <a href="README.md">English</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <strong>简体中文</strong> |
  <a href="README.zht.md">繁體中文</a>
</p>

# opencode-0-injection

本地 OpenCode 服务器插件，在智能体提示词之前前置一个零优先级的操作提示词。

## 用途

OpenCode 大致按以下顺序构建其最终系统提示词：

```text
agent prompt → environment → Instructions from AGENTS.md
```

该插件保持 OpenCode 核心行为不变，但在最前面前置一个由操作者控制的提示词文件：

```text
0-injection-prompt → agent prompt → environment → instruction
```

默认提示词文件为 `0-injection-prompt.md`。

## OpenCode 配置

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

当单独检出此仓库时，可将其复制到 `~/.config/opencode/plugins/opencode-0-injection`，或将插件条目指向绝对检出路径。

## 行为

该插件使用 OpenCode 的 `experimental.chat.system.transform` 钩子。它用标记包裹注入的提示词，使得重试或重复转换不会累积重复的块：

```text
<opencode-0-injection-prompt>
...
</opencode-0-injection-prompt>
```

## 冒烟测试

```bash
npm test
```

冒烟测试导入该插件，针对一个合成系统提示词运行转换，并验证以下顺序：

```text
0-injection < agent prompt < environment < instruction
```

<!-- i18n:source-hash:b60576dd761199a532b6d843576bd127703c42d60086f0dc5c2cecf018b47adb -->
