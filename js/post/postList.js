const jwt = localStorage.getItem("X-AUTH-TOKEN");
console.log(jwt);
let postData;
const postsPerPage = 10;

async function getPostAll(jwt) {
    try {
        const response = await axios({
			method: "GET",
			url: `http://localhost:8080/post`,
			headers: { "X-AUTH-TOKEN": jwt }
		});
        return response.data;
    } catch (err) {
        console.log(err);
    }
}
// async function setBoardList() {
//     postData = await getPostAll();
//     const totalPosts = postData.length;
//     const numPages = Math.ceil(totalPosts / postsPerPage); // 총 페이지 수

//     renderPosts(0, Math.min(totalPosts, postsPerPage));
//     addPageButtons(numPages);
// }
async function setBoardList(jwt) {
    postData = await getPostAll(jwt);
    postData.sort((a, b) => {
        // b.updatedAt - a.updatedAt를 사용하여 최신 날짜가 맨 위로 오도록 정렬
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    const totalPosts = postData.length;
    const numPages = Math.ceil(totalPosts / postsPerPage); // 총 페이지 수

    renderPosts(0, Math.min(totalPosts, postsPerPage));
    addPageButtons(numPages);
}

setBoardList(jwt);

function renderPosts(startIndex, endIndex) {
    const boardsContainer = document.querySelector('.board_list');

    // 이전 페이지의 포스트만 삭제
    const postsToRemove = Array.from(boardsContainer.querySelectorAll('.board'));
    postsToRemove.forEach(post => post.remove());

    // 새로운 포스트 추가
    for (let i = startIndex; i < endIndex; i++) {
        const post = postData[i];
        const newDiv = document.createElement('div');
        newDiv.classList.add('board');
        const date = new Date(post.updatedAt);
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        newDiv.innerHTML = `
            <div class="num">${post.postNo}</div>
            <div class="title"><a href="post.html?postNo=${post.postNo}">${post.title}</a></div>
            <div class="writer">${post.writer}</div>
            <div class="date">${formattedDate}</div>
            <div class="count">${post.views}</div>
        `;

        boardsContainer.appendChild(newDiv);
    }
}
function addPageButtons(numPages) {
    const pageButtons = document.querySelector('.board_page');
    pageButtons.innerHTML = ''; // 기존 버튼 초기화

    for (let i = 1; i <= numPages; i++) {
        const button = document.createElement('a');
        button.textContent = i;
        button.classList.add('num');
        if (i === 1) { // 첫 번째 페이지가 선택된 상태로 시작
            button.classList.add('on');
        }
        button.addEventListener('click', function () {
            // 클릭된 페이지 버튼에 on 클래스 추가
            const currentButton = document.querySelector('.board_page a.num.on');
            if (currentButton) {
                currentButton.classList.remove('on');
            }
            this.classList.add('on');
            // 해당 페이지의 데이터를 보여주는 함수 호출
            const startIndex = (i - 1) * postsPerPage;
            const endIndex = Math.min(startIndex + postsPerPage, postData.length);
            renderPosts(startIndex, endIndex);
        });
        pageButtons.appendChild(button);
    }
}