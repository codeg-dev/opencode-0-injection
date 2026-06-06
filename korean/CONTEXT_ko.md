# 컨텍스트

## 목적과 비전
운영자에게 모든 에이전트/페르소나/모드 프롬프트 앞에 위치하는 단일 최우선 프롬프트 슬롯을 제공한다. OpenCode 코어는 시스템 프롬프트를 `에이전트 프롬프트 → environment → instruction(AGENTS.md)` 순으로 구성한다. 이 플러그인은 운영자가 통제하는 파일 하나를 맨 앞에 prepend 하여, 운영 규칙(AGENTS.md, 모델 보존, 검증 단계)을 필수로 취급하고 이후 페르소나 프롬프트가 덮어쓰지 못하게 한다.

## 기술 아키텍처
- **엔트리**: `id`와 async `server(ctx, options)`를 가진 default export.
- **프롬프트 리더**: `createPromptReader`가 설정된 `file`을 해석(홈 확장, 절대 또는 `ctx.directory` 기준 상대)하고 `mtimeMs`로 캐시하며 trim된 내용을 반환.
- **훅**: `experimental.chat.system.transform(_input, output)`은 요청 시점 실행. `output.system`이 비면 가드, 프롬프트를 읽고, 기존 주입 블록을 strip한 뒤 `[START_MARKER, prompt, END_MARKER, existing]`을 prepend.
- **멱등성**: `stripPreviousInjection`은 시작 마커가 인덱스 0일 때만 strip하므로 반복 transform/재시도에도 중복 누적이 없음.

## 현재 상태
- 단일 파일 플러그인, 무의존성, 스모크 테스트 통과.
- 커밋 1개(`fb0f871`). 전역 `~/.config/opencode/opencode.json` plugin 배열에 설치·배선됨.
- 동작 검증: 스모크 테스트 통과; 순서·멱등성 유지.

## 알려진 한계
- 변환된 `system[]`은 인메모리 한정; 세션 저장소에 기록되지 않음(세션별 디스크 증거 없음).
- `output.system[0]`만 수정; 리드 블록이 에이전트 프롬프트를 담는다고 가정.

## 앞으로
- 선택: 다중 주입 파일 / 순서화된 블록.
- 선택: 에이전트별·모드별 프롬프트 선택.
