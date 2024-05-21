# SpringBoot-Project-BAMBOO
스프링 부트 + HTML, CSS, JS로 만든 게시판 사이트


## 📝 프로젝트 소개
장난스러운 대화를 하고싶어서 만든 익명 게시판 사이트입니다. 
<br>

### ⚙️ 개발 환경
- `Java 17`
- **IDE** : IntelliJ
- **Framework** : Springboot(2.x)
- **Database** : MySQL-8.0
- **ORM** : JPA

## 📌 주요 기능
#### 로그인 
- DB값 검증
- ID찾기, PW찾기
- 로그인 시 JWT(RefreshToken, AccessToken) 생성

#### 회원가입
- 이메일 중복 체크
- 닉네임 중복 체크

#### 게시글 CRUD
- 조회수, 생성날짜, 닉네임, 제목
- 클릭시 게시글 내용, 조회수 증가
- 댓글기능구현...
- 게시글 수정시 비밀번호 체크

