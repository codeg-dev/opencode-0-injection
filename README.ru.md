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
  <strong>Русский</strong> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a>
</p>

# opencode-0-injection

Локальный плагин сервера OpenCode, который добавляет операционный промпт нулевого приоритета перед промптом агента.

## Назначение

OpenCode строит свой итоговый системный промпт примерно в таком порядке:

```text
agent prompt → environment → Instructions from AGENTS.md
```

Этот плагин сохраняет базовое поведение OpenCode нетронутым, но добавляет один управляемый оператором файл промпта в самое начало:

```text
0-injection-prompt → agent prompt → environment → instruction
```

Файл промпта по умолчанию — `0-injection-prompt.md`.

## Конфигурация OpenCode

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

Когда этот репозиторий извлекается отдельно, либо скопируйте его в `~/.config/opencode/plugins/opencode-0-injection`, либо укажите в записи плагина абсолютный путь извлечения.

## Поведение

Плагин использует хук `experimental.chat.system.transform` из OpenCode. Он оборачивает вставленный промпт маркерами, чтобы повторные попытки или повторные преобразования не накапливали дублирующиеся блоки:

```text
<opencode-0-injection-prompt>
...
</opencode-0-injection-prompt>
```

## Дымовой тест

```bash
npm test
```

Дымовой тест импортирует плагин, выполняет преобразование над синтетическим системным промптом и проверяет такой порядок:

```text
0-injection < agent prompt < environment < instruction
```

<!-- i18n:source-hash:b60576dd761199a532b6d843576bd127703c42d60086f0dc5c2cecf018b47adb -->
