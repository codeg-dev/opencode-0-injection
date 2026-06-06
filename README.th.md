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
  <strong>ไทย</strong> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.vi.md">Tiếng Việt</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a>
</p>

# opencode-0-injection

ปลั๊กอินเซิร์ฟเวอร์ OpenCode แบบโลคัล ที่วางพรอมป์ปฏิบัติการลำดับความสำคัญศูนย์ไว้ก่อนพรอมป์ของเอเจนต์

## วัตถุประสงค์

OpenCode สร้างพรอมป์ระบบสุดท้ายโดยคร่าว ๆ ตามลำดับนี้:

```text
agent prompt → environment → Instructions from AGENTS.md
```

ปลั๊กอินนี้คงพฤติกรรมหลักของ OpenCode ไว้เหมือนเดิม แต่วางไฟล์พรอมป์ที่ผู้ดูแลควบคุมหนึ่งไฟล์ไว้ที่ด้านหน้าสุด:

```text
0-injection-prompt → agent prompt → environment → instruction
```

ไฟล์พรอมป์เริ่มต้นคือ `0-injection-prompt.md`

## การกำหนดค่า OpenCode

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

เมื่อเช็คเอาต์รีโพนี้แยกต่างหาก ให้คัดลอกไปยัง `~/.config/opencode/plugins/opencode-0-injection` หรือชี้รายการปลั๊กอินไปยังพาธเช็คเอาต์แบบสัมบูรณ์

## พฤติกรรม

ปลั๊กอินใช้ฮุก `experimental.chat.system.transform` ของ OpenCode โดยห่อหุ้มพรอมป์ที่แทรกด้วยเครื่องหมายกำกับ เพื่อไม่ให้การลองใหม่หรือการแปลงซ้ำสะสมบล็อกที่ซ้ำกัน:

```text
<opencode-0-injection-prompt>
...
</opencode-0-injection-prompt>
```

## สโมกเทสต์

```bash
npm test
```

สโมกเทสต์จะนำเข้าปลั๊กอิน รันการแปลงกับพรอมป์ระบบสังเคราะห์ และตรวจสอบลำดับนี้:

```text
0-injection < agent prompt < environment < instruction
```

<!-- i18n:source-hash:b60576dd761199a532b6d843576bd127703c42d60086f0dc5c2cecf018b47adb -->
