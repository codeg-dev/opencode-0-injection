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
  <a href="README.zh.md">简体中文</a> |
  <strong>繁體中文</strong>
</p>

# opencode-0-injection

本地 OpenCode 伺服器外掛，在代理提示詞之前前置一個零優先級的操作提示詞。

## 用途

OpenCode 大致按以下順序建構其最終系統提示詞：

```text
agent prompt → environment → Instructions from AGENTS.md
```

此外掛保持 OpenCode 核心行為不變，但在最前面前置一個由操作者控制的提示詞檔案：

```text
0-injection-prompt → agent prompt → environment → instruction
```

預設提示詞檔案為 `0-injection-prompt.md`。

## OpenCode 設定

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

當單獨簽出此儲存庫時，可將其複製到 `~/.config/opencode/plugins/opencode-0-injection`，或將外掛條目指向絕對簽出路徑。

## 行為

此外掛使用 OpenCode 的 `experimental.chat.system.transform` 掛鉤。它用標記包裹注入的提示詞，使得重試或重複轉換不會累積重複的區塊：

```text
<opencode-0-injection-prompt>
...
</opencode-0-injection-prompt>
```

## 冒煙測試

```bash
npm test
```

冒煙測試匯入此外掛，針對一個合成系統提示詞執行轉換，並驗證以下順序：

```text
0-injection < agent prompt < environment < instruction
```

<!-- i18n:source-hash:b60576dd761199a532b6d843576bd127703c42d60086f0dc5c2cecf018b47adb -->
