const btnSignUp = document.querySelector(".signup");

btnSignUp.addEventListener("click", signup);

async function signup() {
    const email = document.querySelector(".email").value;
    const password = document.querySelector(".password").value;
    const nickname = document.querySelector(".nickname").value;

    // 2. #email, #password, nickname 값 확인 (정규표현식 확인)
    const emailRegExp = /^[a-z]+[a-z0-9]{5,29}@[a-z0-9.-]+\.[a-z]{2,}$/i;
    const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; // 비밀번호 정규식 8-16 문자, 숫자 조합
    const nicknameRegExp = /^[가-힣|a-z|A-Z|0-9|]{2,10}$/; // 닉네임 정규식 2-10 한글, 숫자 또는 영문

    if (!emailRegExp.test(email)) {
        return alert("이메일 형식: 영문자로 시작하는 영문자 또는 숫자 6-20");
    }
    if (!passwordRegExp.test(password)) {
        return alert("비밀번호 형식: 8-16 문자, 숫자 조합");
    }
    if (!nicknameRegExp.test(nickname)) {
        return alert("닉네임 형식 2-10 한글, 숫자 또는 영문");
    }

    // 3. 회원가입 API 요청
    try {
        const userData = {
            email: email,
            password: password,
            nickname: nickname
        };

        const signUpReturn = await axios({
            method: "post",
            url: `http://localhost:8080/user`,
            headers: {},
            data: userData
        });

        // 4. 요청이 성공적이지 않다면, alert message
        if (signUpReturn.status === 200) {
            if (signUpReturn.data) {
                alert(signUpReturn.data);
            }
            return location.replace("./postList.html");
        } else {
            return alert("요청에 문제가 생겼습니다.");
        }
    } catch (error) {
        console.error(error);
        return alert("요청에 문제가 생겼습니다.");
    }
}