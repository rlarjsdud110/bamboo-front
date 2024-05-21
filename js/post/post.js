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
            url: `http://localhost:8080/post/${postNo}`, // 실제 URL로 수정
            headers: { "X-AUTH-TOKEN": jwt },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null; // 에러 발생 시 null을 반환하거나 적절히 처리
    }
}

// 비동기 함수 호출 후 결과를 받고 사용
async function handlePost() {
    const postData = await findPost();
    if (postData) {
        renderPostInfo(postData);
    } else {
        console.log("게시물을 찾을 수 없습니다.");
    }
}

handlePost(); // 비동기 함수 호출

function renderPostInfo(postData) {
    const postTitle = document.querySelector('.title');
    const postInfo = document.querySelector('.info');
    const postContent = document.querySelector('.content');

    // 제목 렌더링
    postTitle.textContent = postData.title;

    const date = new Date(postData.updatedAt);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    // 게시물 정보 렌더링
    const infoHTML = `
        <dl>
            <dt>번호</dt>
            <dd>${postData.postNo}</dd>
        </dl>
        <dl>
            <dt>글쓴이</dt>
            <dd>${postData.writer}</dd>
        </dl>
        <dl>
            <dt>작성일</dt>
            <dd>${formattedDate}</dd>
        </dl>
        <dl>
            <dt>조회수</dt>
            <dd>${postData.views}</dd>
        </dl>
    `;

    postContent.innerHTML = postData.content.replace(/(?:\r\n|\r|\n)/g, '<br>');
    postInfo.innerHTML = infoHTML;
}

const updateButton = document.querySelector('.btn_wrap .update');
updateButton.addEventListener('click', function () {
    const postNo = getPostNoFromUrl();

    this.href = `update.html?postNo=${postNo}`;
});