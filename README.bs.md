<p align="center">
  <a href="README.md">English</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <strong>Bosanski</strong> |
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
  <a href="README.zht.md">繁體中文</a>
</p>

# opencode-0-injection

Lokalni plugin OpenCode servera koji dodaje operativni prompt nultog prioriteta ispred prompta agenta.

## Svrha

OpenCode gradi svoj konačni sistemski prompt otprilike ovim redoslijedom:

```text
agent prompt → environment → Instructions from AGENTS.md
```

Ovaj plugin zadržava netaknutim osnovno ponašanje OpenCode-a, ali dodaje jedan prompt fajl pod kontrolom operatera sasvim na početak:

```text
0-injection-prompt → agent prompt → environment → instruction
```

Podrazumijevani prompt fajl je `0-injection-prompt.md`.

## OpenCode konfiguracija

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

Kada se ovaj repozitorij preuzme zasebno, ili ga kopirajte u `~/.config/opencode/plugins/opencode-0-injection` ili usmjerite unos plugina na apsolutnu putanju preuzimanja.

## Ponašanje

Plugin koristi OpenCode-ov hook `experimental.chat.system.transform`. On omotava ubačeni prompt markerima kako ponovni pokušaji ili ponovljene transformacije ne bi gomilali duplirane blokove:

```text
<opencode-0-injection-prompt>
...
</opencode-0-injection-prompt>
```

## Smoke test

```bash
npm test
```

Smoke test uvozi plugin, pokreće transformaciju nad sintetičkim sistemskim promptom i provjerava ovaj redoslijed:

```text
0-injection < agent prompt < environment < instruction
```

<!-- i18n:source-hash:b60576dd761199a532b6d843576bd127703c42d60086f0dc5c2cecf018b47adb -->
