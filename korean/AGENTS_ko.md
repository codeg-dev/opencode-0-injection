# opencode-0-injection 지식 베이스
생성: 2026-06-06
커밋: fb0f871
브랜치: main

## 개요
OpenCode 서버 플러그인. `experimental.chat.system.transform` 훅으로 에이전트 프롬프트 앞에 우선순위-0 운영 프롬프트를 prepend 한다. 최종 순서: `0-injection-prompt → 에이전트 프롬프트 → environment → instruction`.

## 구조
- `index.js` — 플러그인 엔트리. 프롬프트 리더(mtime 캐시), 마커 strip, transform 훅.
- `0-injection-prompt.md` — 주입되는 우선순위-0 규칙(기본 파일).
- `test/smoke.mjs` — 순서 + 멱등성 스모크 테스트.
- `package.json` — ESM, 무의존성, `npm test`.
- `README.md` — 목적, 설정, 동작.

## 어디를 볼까
| 작업 | 위치 | 비고 |
|---|---|---|
| transform 로직 | `index.js:50-58` | `output.system[0]` 구성 |
| 멱등성 | `index.js:37-42` | `stripPreviousInjection` |
| 프롬프트 경로 해석 | `index.js:15-19` | 홈 확장 + 절대/상대 |
| 주입 규칙 | `0-injection-prompt.md` | 운영자 편집 |
| 테스트 계약 | `test/smoke.mjs` | `zero<agent<environment<instruction` |

## 컨벤션
- ESM 전용(`type: module`), Node 빌트인(`fs`/`os`/`path`), 런타임 의존성 0.
- 마커 `<opencode-0-injection-prompt>…</opencode-0-injection-prompt>`로 주입 블록 감쌈.
- 커밋 스타일: 간결한 명령형.

## 안티패턴
| 하지 말 것 | 이유 | 대신 |
|---|---|---|
| 끝에 주입 추가 | 우선순위-0 순서 깨짐 | `system[0]` 앞에 prepend |
| 마커 strip 생략 | 재시도/transform 시 중복 | 재주입 전 strip |
| 의존성 추가 | 이식성 저하 | Node 빌트인 사용 |
| 다른 `system[]` 항목 변경 | 인덱스 0만 리드 블록 | `system[0]`만 편집 |

## 명령
- `npm test` — 스모크 테스트 실행.

## 기술 스택
| 구성요소 | 버전 | 비고 |
|---|---|---|
| Node | ESM | 빌트인만 |
| OpenCode 플러그인 API | `server` + `experimental.chat.system.transform` | 훅 계약 |

## 참고
- 설치: `~/.config/opencode/plugins/opencode-0-injection`로 복사하거나 `plugin` 항목에 절대경로 지정.
- 설정 옵션 `file`로 프롬프트 파일 선택(기본 `0-injection-prompt.md`).
- 변환된 시스템 프롬프트는 세션 저장소에 영속화되지 않음(요청 시점 한정).

## 규칙
- 스코프 최소화; 추측성 설정·일회용 추상화 금지.
- 무의존성·ESM 전용 설계 유지.
- AGENTS.md/CONTEXT.md/PRINCIPLES.md 수정은 `/doc-optimize`로.

## 문서
- CONTEXT.md - 프로젝트 배경과 아키텍처
- PRINCIPLES.md - 개발 원칙과 패턴
