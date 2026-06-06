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
  <strong>Українська</strong> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a>
</p>

# opencode-0-injection

Локальний плагін сервера OpenCode, який додає операційний промпт нульового пріоритету перед промптом агента.

## Призначення

OpenCode будує свій підсумковий системний промпт приблизно в такому порядку:

```text
agent prompt → environment → Instructions from AGENTS.md
```

Цей плагін зберігає базову поведінку OpenCode незмінною, але додає один керований оператором файл промпту в самий початок:

```text
0-injection-prompt → agent prompt → environment → instruction
```

Типовий файл промпту — `0-injection-prompt.md`.

## Конфігурація OpenCode

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

Коли цей репозиторій отримується окремо, або скопіюйте його в `~/.config/opencode/plugins/opencode-0-injection`, або вкажіть у записі плагіна абсолютний шлях отримання.

## Поведінка

Плагін використовує хук `experimental.chat.system.transform` від OpenCode. Він обгортає вставлений промпт маркерами, щоб повторні спроби чи повторні перетворення не накопичували дубльованих блоків:

```text
<opencode-0-injection-prompt>
...
</opencode-0-injection-prompt>
```

## Димовий тест

```bash
npm test
```

Димовий тест імпортує плагін, виконує перетворення над синтетичним системним промптом і перевіряє такий порядок:

```text
0-injection < agent prompt < environment < instruction
```

<!-- i18n:source-hash:b60576dd761199a532b6d843576bd127703c42d60086f0dc5c2cecf018b47adb -->
