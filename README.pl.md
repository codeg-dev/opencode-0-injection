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
  <strong>Polski</strong> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a>
</p>

# opencode-0-injection

Lokalna wtyczka serwera OpenCode, która umieszcza operacyjny prompt o priorytecie zerowym przed promptem agenta.

## Cel

OpenCode buduje swój końcowy prompt systemowy mniej więcej w tej kolejności:

```text
agent prompt → environment → Instructions from AGENTS.md
```

Ta wtyczka pozostawia podstawowe zachowanie OpenCode nienaruszone, ale umieszcza jeden kontrolowany przez operatora plik promptu na samym początku:

```text
0-injection-prompt → agent prompt → environment → instruction
```

Domyślny plik promptu to `0-injection-prompt.md`.

## Konfiguracja OpenCode

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

Gdy to repozytorium jest pobierane osobno, skopiuj je do `~/.config/opencode/plugins/opencode-0-injection` albo skieruj wpis wtyczki na bezwzględną ścieżkę checkoutu.

## Zachowanie

Wtyczka używa hooka `experimental.chat.system.transform` OpenCode. Otacza wstrzyknięty prompt znacznikami, aby ponowne próby lub powtarzane transformacje nie kumulowały zduplikowanych bloków:

```text
<opencode-0-injection-prompt>
...
</opencode-0-injection-prompt>
```

## Test dymny

```bash
npm test
```

Test dymny importuje wtyczkę, uruchamia transformację na syntetycznym prompcie systemowym i weryfikuje tę kolejność:

```text
0-injection < agent prompt < environment < instruction
```

<!-- i18n:source-hash:b60576dd761199a532b6d843576bd127703c42d60086f0dc5c2cecf018b47adb -->
