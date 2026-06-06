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
  <strong>Türkçe</strong> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a>
</p>

# opencode-0-injection

Ajan komut isteminden önce sıfır öncelikli bir operasyonel komut istemi ekleyen yerel OpenCode sunucu eklentisi.

## Amaç

OpenCode nihai sistem komut istemini kabaca şu sırayla oluşturur:

```text
agent prompt → environment → Instructions from AGENTS.md
```

Bu eklenti OpenCode'un temel davranışını olduğu gibi korur, ancak en başa operatör tarafından kontrol edilen tek bir komut istemi dosyası ekler:

```text
0-injection-prompt → agent prompt → environment → instruction
```

Varsayılan komut istemi dosyası `0-injection-prompt.md`'dir.

## OpenCode yapılandırması

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

Bu depo ayrı olarak çekildiğinde, ya `~/.config/opencode/plugins/opencode-0-injection` dizinine kopyalayın ya da eklenti girişini mutlak çekme yoluna yönlendirin.

## Davranış

Eklenti OpenCode'un `experimental.chat.system.transform` kancasını kullanır. Yeniden denemeler veya tekrarlanan dönüşümler yinelenen bloklar biriktirmesin diye, enjekte edilen komut istemini işaretleyicilerle sarar:

```text
<opencode-0-injection-prompt>
...
</opencode-0-injection-prompt>
```

## Duman testi

```bash
npm test
```

Duman testi eklentiyi içe aktarır, dönüşümü sentetik bir sistem komut istemine karşı çalıştırır ve şu sırayı doğrular:

```text
0-injection < agent prompt < environment < instruction
```

<!-- i18n:source-hash:b60576dd761199a532b6d843576bd127703c42d60086f0dc5c2cecf018b47adb -->
