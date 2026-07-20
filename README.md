## 프로젝트 개요

사용자 편의를 위한 무한 스크롤, Tailwind CSS를 활용하여 모바일과 데스크톱 모두에 최적화된 UX를 구현했습니다.

## 실행 방법 및 환경 설정

### 1. 환경 설정
* vscode, intelliJ 를 포함한 IDE
* Node.js, npm 설치
* git clone

### 2. 환경 변수 설정
프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 아래 내용을 입력합니다.
```.env.local
NEXT_PUBLIC_KAKAO_REST_URL=https://dapi.kakao.com/v3
NEXT_PUBLIC_KAKAO_REST_KEY=유효한 REST API 키
```

### 3. 설치 및 실행
IDE 로 클론한 디렉토리에 접근합니다.

pnpm 설치 여부에 따라 터미널에 아래 명령어를 입력합니다.

pnpm 임시 실행
```
npx pnpm install
```
pnpm 설치 되어있는 경우
```
pnpm install
```

명령어 수행 완료 후, 아래 명령어로 프로젝트를 실행합니다.
```
pnpm dev
```

localhost:3000 으로 프로젝트에 접근합니다.


## 폴더 구조 및 주요 코드 설명

```text
src/
├── app/                     # next 앱 라우터 디렉토리
├── assets/                  # 아이콘 등 정적 리소스
├── components/              # 글로벌 사용 가능한 UI 컴포넌트
├── features/                # 앱 라우터의 페이지 컴포넌트, 타입 및 기능 컴포넌트
│   └── search/              # 메인 페이지 및 도서 검색 기능 구현
│      ├──  Search.tsx       # 메인 페이지
│      └──  SearchInput.tsx  # 도서 검색 인풋 컴포넌트
│      └── api/              # 카카오 API 연결
│      └── service/          # API 를 React Query 를 이용, 관리 및 최적화
│   └── likes/               # 찜한 책 페이지
├── layout/                  # 글로벌 레이아웃, 라이브러리 프로바이더 및 네비게이션
|   ├── navigation/          # 상단 GNB
│   └── provider/            # 글로벌 레이아웃 및 라이브러리 프로바이더
├── shared/                  # 글로벌 사용 가능한 타입 및 유틸성 함수
├── store/                   # zustans 상태 관리 함
|   ├── useLikeBooksStore.ts # 찜한 책 상태관리
│   └── useSearchTextStore.ts# 최근 검색어 zustand 상태관리
...
```

### 주요 코드 설명

https://github.com/tedChangMo/cdri-books-kang-chang-mo/blob/4a5ac260eb1d44acd004e5d01b5c7bbcbc6ab1a6/src/features/search/Search.tsx#L100-L115
- 도서 검색 시 infinite scroll 구현

https://github.com/tedChangMo/cdri-books-kang-chang-mo/blob/4a5ac260eb1d44acd004e5d01b5c7bbcbc6ab1a6/src/components/BookComponent.tsx#L23-L36
- 도서 목록 및 상세 보기 반응형으로 구성


## 라이브러리 선택 이유

* **React 19**
  * useCallback, useMemo 등 별도 메모이제이션 없이 성능 향상에 도움이 되는 점에 적용해 보았습니다.
* **antd & tailwind**
  * 모집 공고에 사용되는 스택으로 명시되어 있어 UI 구현에 채택하였습니다.
* **zustand**
  * 간결하게 사용 가능한 점과, 실시간 UI 적용에 용이하다는 점에서 localStorage 대신 사용했습니다.
 

## 강조하고 싶은 기능

* **API 캐싱**
  * react query 를 사용하여 같은 쿼리스트링의 조건 API를 5분간 캐싱합니다.
* **반응형 컴포넌트**
  * 작은 화면에서도 무리없이 컨텐츠를 활용 가능하도록 구현하였습니다.
