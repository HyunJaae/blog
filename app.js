// posts 폴더의 Markdown 파일을 읽어오는 함수
async function loadMarkdown(file) {
  try {
    const response = await fetch(`posts/${file}`);
    if (!response.ok) {
      throw new Error("Failed to fetch the Markdown file");
    }
    const markdown = await response.text();
    // marked.js를 사용해 Markdown을 HTML로 변환
    document.getElementById("content").innerHTML = marked.parse(markdown);
  } catch (error) {
    console.error(error);
    document.getElementById("content").innerHTML =
      "<p>Failed to load content.</p>";
  }
}

// 초기화: 기본 파일을 로드
loadMarkdown("post01.md");