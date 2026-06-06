# 원칙

## 핵심 학습
- OpenCode는 기본적으로 에이전트 프롬프트 앞에 아무것도 prepend 하지 않음; 유일하게 안전한 주입 지점은 `output.system[0]`을 변경하는 `experimental.chat.system.transform`.
- transform 훅은 여러 번 실행될 수 있음(재시도); 마커 기반 멱등성 필수.
- 변환된 시스템 프롬프트는 영속화되지 않음; 세션 저장소가 아니라 스모크 테스트로 동작 검증.

## 코드 패턴
- **마커 래핑 블록**: 탐지·교체용 `<opencode-0-injection-prompt>…</opencode-0-injection-prompt>`.
- **mtime 캐시**: `mtimeMs` 변경 시에만 프롬프트 파일 재읽기.
- **소프트 가드**: 파일 없음·프롬프트 빔·`system` 배열 없음/빔이면 조기 반환.
- **경로 해석**: `~` 확장, 절대경로 허용, 아니면 `ctx.directory` 기준 해석.

## 코드 컨벤션
- ESM 모듈, Node 빌트인만, 런타임 의존성 없음.
- 경로/프롬프트/strip 로직은 순수 함수; 부수효과는 훅에 격리.
- 마커와 기본 파일명은 상수로.

## 안티패턴
| 실수 | 수정 |
|---|---|
| strip 없이 재주입 | prepend 전에 기존 블록 strip(시작 마커 인덱스 0) |
| prepend 대신 append | 우선순위-0은 맨 앞 위치 필요 |
| 매 호출마다 파일 읽기 | mtime로 캐시 |
| 의존성 추가 | 무의존성·빌트인 유지 |
| 임의 `system[]` 항목 편집 | `system[0]`만 건드림 |

## 검증
- `npm test`는 `SMOKE_OK`를 출력하고 위치가 `zero < agent < environment < instruction`을 만족하며 멱등성(2회차 transform이 출력 불변)을 보여야 함.
