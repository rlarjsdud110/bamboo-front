const btnSignIn = document.querySelector(".signIn");

btnSignIn.addEventListener("click", signIn);

async function signIn(event) {
	const email = document.querySelector(".email").value;
	const password = document.querySelector(".password").value;

	// 2. #email, #password 값 확인 (두 값이 모두 입력 되어 있지 않으면 return)
	if (!email || !password) {
		return alert("회원 정보를 입력해주세요.");
	}

    const userData = {
        email: email,
        password: password
    };

    const signInReturn = await axios({
        method: "post",
        url: `http://localhost:8080/user/login`,
        headers: {},
        data: userData
    });

	const signInStatus = signInReturn.status === 200;
	if(!signInStatus){
		return alert("아이디 혹은 비밀번호가 틀렸습니다.");
	}

	const jwt = signInReturn.data;
	localStorage.setItem("X-AUTH-TOKEN", jwt.accessToken);
    localStorage.setItem("R-AUTH-TOKEN", jwt.refreshToken);
	alert("로그인이 완료되었습니다.");
	return window.location.href = `postList.html`;
}