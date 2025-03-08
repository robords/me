import { marked } from "marked";

export default {
  async fetch(request: Request): Promise<Response> {
    // Serve the HTML page for the main content
    if (request.url.endsWith("/")) {
      const htmlContent = await getPageHtml();
      return new Response(htmlContent, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    // Handle loading poems dynamically from GitHub
    const poemName = request.url.split("/").pop();
    if (poemName && poemName !== "index.html") {
      const poemContent = await getPoemContent(poemName);
      return new Response(poemContent, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};

// Function to fetch all poems and return as links in HTML
async function getPageHtml(): Promise<string> {
  const poemFiles = await getPoemFiles();
  let linksHtml = poemFiles
    .map(
      (filename) => `<li><a href="/${filename}">${filename.replace(".md", "")}</a></li>`
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Flipped Bits</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <header>
        <h1>Flipped Bits</h1>
      </header>
      <main>
        <h2>Poem Directory</h2>
        <ul>${linksHtml}</ul>
      </main>
    </body>
    </html>
  `;
}

// Fetch list of poems (get from GitHub's repository)
async function getPoemFiles(): Promise<string[]> {
  // List of files you want to retrieve from GitHub
  // Here, you can hardcode filenames or dynamically fetch file list via GitHub API
  return ["test1.md", "test2.md"]; // Example files, adjust based on actual files
}

// Fetch the content of a specific poem from GitHub and convert it from Markdown to HTML
async function getPoemContent(poemName: string): Promise<string> {
  const githubRawUrl = `https://raw.githubusercontent.com/robords/me/main/src/content/${poemName}`;

  try {
    const response = await fetch(githubRawUrl);

    if (!response.ok) {
      return "Poem not found.";
    }

    const markdownContent = await response.text();
    const htmlContent = marked(markdownContent); // Convert Markdown to HTML
    return htmlContent;
  } catch (error) {
    return "Failed to fetch poem.";
  }
}
