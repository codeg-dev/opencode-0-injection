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
  <strong>Norsk</strong> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a>
</p>

# opencode-0-injection

Lokal OpenCode-server-plugin som setter et driftsprompt med null prioritet foran agent-prompten.

## Formål

OpenCode bygger sitt endelige systemprompt omtrent i denne rekkefølgen:

```text
agent prompt → environment → Instructions from AGENTS.md
```

Dette pluginet holder kjerneatferden til OpenCode uendret, men setter én operatørstyrt promptfil helt fremst:

```text
0-injection-prompt → agent prompt → environment → instruction
```

Standard promptfil er `0-injection-prompt.md`.

## OpenCode-konfigurasjon

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

Når dette repositoryet sjekkes ut separat, enten kopier det til `~/.config/opencode/plugins/opencode-0-injection` eller pek plugin-oppføringen mot den absolutte utsjekkingsstien.

## Atferd

Pluginet bruker OpenCodes `experimental.chat.system.transform`-hook. Det omslutter det injiserte promptet med markører slik at gjentatte forsøk eller gjentatte transformasjoner ikke samler opp dupliserte blokker:

```text
<opencode-0-injection-prompt>
...
</opencode-0-injection-prompt>
```

## Røyktest

```bash
npm test
```

Røyktesten importerer pluginet, kjører transformasjonen mot et syntetisk systemprompt og verifiserer denne rekkefølgen:

```text
0-injection < agent prompt < environment < instruction
```

<!-- i18n:source-hash:b60576dd761199a532b6d843576bd127703c42d60086f0dc5c2cecf018b47adb -->
