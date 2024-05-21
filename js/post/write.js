const post = document.querySelector('.btn_wrap .on');
const jwt = localStorage.getItem("X-AUTH-TOKEN");
const writer = document.querySelector('.writer');
setWriter(jwt);

async function setWriter(jwt) {
    if (!jwt) {
        return false;
    }

    try {
        const jwtReturn = await axios({
            method: "post",
            url: "http://localhost:8080/user/nickname",
            headers: { "X-AUTH-TOKEN": jwt },
            data: {}, 
        });
        writer.value = jwtReturn.data;

        console.log(jwtReturn.data);
        return true;
    } catch (error) {
        console.error("사용자 닉네임을 가져오는 중 오류가 발생했습니다:", error);
        return false;
    }
}


post.addEventListener('click', async function(){
    const password = document.querySelector('.password').value;
    const title = document.querySelector('.title input').value;
    const content = document.querySelector('.content textarea').value;
    const writer = document.querySelector('.writer').value;

    if (!title || !content || !password) {
        return alert("회원 정보를 입력해주세요.");
    }
    const postData ={
        title: title,
        content: content,
        writer: writer,
        password: password
    };
    
    try{
        const response = await axios({
            method: "post",
            url: `http://localhost:8080/post`,
            headers: { "X-AUTH-TOKEN": jwt },
            data: postData
        });
        if(response.status == 201){
            alert("등록 완료!");
            return window.location.href = "./postList.html";
        }
    } catch(error){
        console.log(error);
        alert("비밀번호가 달라요!");
        return null;
    }
});