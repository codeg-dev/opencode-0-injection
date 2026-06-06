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
  <strong>한국어</strong> |
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

에이전트 프롬프트 앞에 우선순위-0 운영 프롬프트를 prepend 하는 로컬 OpenCode 서버 플러그인.

## 목적

OpenCode는 최종 시스템 프롬프트를 대략 다음 순서로 구성한다.

```text
agent prompt → environment → Instructions from AGENTS.md
```

이 플러그인은 OpenCode 코어 동작을 그대로 유지하되, 운영자가 통제하는 프롬프트 파일 하나를 맨 앞에 prepend 한다.

```text
0-injection-prompt → agent prompt → environment → instruction
```

기본 프롬프트 파일은 `0-injection-prompt.md`이다.

## OpenCode 설정

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

이 저장소를 별도로 체크아웃할 경우, `~/.config/opencode/plugins/opencode-0-injection`로 복사하거나 plugin 항목을 절대 체크아웃 경로로 지정한다.

## 동작

플러그인은 OpenCode의 `experimental.chat.system.transform` 훅을 사용한다. 주입된 프롬프트를 마커로 감싸 재시도나 반복 변환에도 중복 블록이 누적되지 않게 한다.

```text
<opencode-0-injection-prompt>
...
</opencode-0-injection-prompt>
```

## 스모크 테스트

```bash
npm test
```

스모크 테스트는 플러그인을 임포트하고, 합성 시스템 프롬프트에 대해 변환을 실행하여 다음 순서를 검증한다.

```text
0-injection < agent prompt < environment < instruction
```

<!-- i18n:source-hash:b60576dd761199a532b6d843576bd127703c42d60086f0dc5c2cecf018b47adb -->
