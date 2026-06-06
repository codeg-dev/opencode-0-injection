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
  <strong>Tiếng Việt</strong> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a>
</p>

# opencode-0-injection

Plugin máy chủ OpenCode cục bộ, đặt một prompt vận hành ưu tiên không trước prompt của tác nhân.

## Mục đích

OpenCode dựng prompt hệ thống cuối cùng theo thứ tự đại khái như sau:

```text
agent prompt → environment → Instructions from AGENTS.md
```

Plugin này giữ nguyên hành vi cốt lõi của OpenCode, nhưng đặt một tệp prompt do người vận hành kiểm soát lên vị trí đầu tiên:

```text
0-injection-prompt → agent prompt → environment → instruction
```

Tệp prompt mặc định là `0-injection-prompt.md`.

## Cấu hình OpenCode

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

Khi kho lưu trữ này được checkout riêng, hãy sao chép nó vào `~/.config/opencode/plugins/opencode-0-injection` hoặc trỏ mục plugin đến đường dẫn checkout tuyệt đối.

## Hành vi

Plugin sử dụng hook `experimental.chat.system.transform` của OpenCode. Nó bao prompt được chèn bằng các dấu đánh dấu để các lần thử lại hoặc các phép biến đổi lặp lại không tích lũy các khối trùng lặp:

```text
<opencode-0-injection-prompt>
...
</opencode-0-injection-prompt>
```

## Kiểm thử khói

```bash
npm test
```

Kiểm thử khói nhập plugin, chạy phép biến đổi trên một prompt hệ thống tổng hợp và xác minh thứ tự này:

```text
0-injection < agent prompt < environment < instruction
```

<!-- i18n:source-hash:b60576dd761199a532b6d843576bd127703c42d60086f0dc5c2cecf018b47adb -->
