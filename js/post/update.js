const jwt = localStorage.getItem("X-AUTH-TOKEN");

function getPostNoFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('postNo');
}

async function findPost() {
    const postNo = getPostNoFromUrl();
    try {
        const response = await axios({
            method: "GET",
            url: `http://localhost:8080/post/${postNo}`, 
            headers: {"X-AUTH-TOKEN": jwt}
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null; 
    }
}

async function handlePost() {
    const postData = await findPost();
    if (postData) {
        renderPostInfo(postData);
    } else {
        console.log("게시물을 찾을 수 없습니다.");
    }
}

handlePost();

function renderPostInfo(postData) {
    const postTitle = document.querySelector('.title input');
    const writerInput = document.querySelector('.info dd input[type="text"]');
    const postContent = document.querySelector('.content textarea');

    postTitle.value = postData.title;
    writerInput.value = postData.writer;
    postContent.innerHTML = postData.content;
}

const updateButton = document.querySelector('.btn_wrap .on');
updateButton.addEventListener('click',async function () {
    
    const postNo = getPostNoFromUrl();
    const password = document.querySelector('.password').value;
    if (!password) {
        return alert("비밀번호를 입력해주세요.");
    }

    const updatePost = {
        title: document.querySelector('.title input').value,
        content: document.querySelector('.content textarea').value,
        password: password
    };
    try {
        const response = await axios({
            method: "put",
            url: `http://localhost:8080/post/${postNo}`,
            headers: {"X-AUTH-TOKEN": jwt},
            data: updatePost
        });
        if(response.status == 200){
            alert("수정완료!");
            return window.location.href = `post.html?postNo=${postNo}`;
        }

    } catch (error) {
        console.error(error);
        alert("비밀번호가 달라요!");
        return null;
    }
});