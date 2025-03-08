export default {
  async fetch(request: Request): Promise<Response> {
    // Serve the HTML page for the main content (the directory page)
    if (request.url.endsWith("/")) {
      const htmlContent = await getPageHtml();
      return new Response(htmlContent, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    // Handle loading poems dynamically
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
      (filename) => `<li><a href="/${filename}">${filename.replace(".html", "")}</a></li>`
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

// Function to fetch list of poems in the poems directory
async function getPoemFiles(): Promise<string[]> {
  // Simulate fetching poem filenames from "poems" directory (adjust this for your real setup)
  return ["poem1.html", "poem2.html"];
}

// Function to fetch the content of a specific poem and return HTML content
async function getPoemContent(poemName: string): Promise<string> {
  const poemUrl = `https://raw.githubusercontent.com/robords/me/main/src/content/${poemName}`;

  try {
    const response = await fetch(poemUrl);

    if (!response.ok) {
      return "Poem not found.";
    }

    // Fetch the content of the poem (which is now HTML)
    const htmlContent = await response.text();
    return htmlContent;
  } catch (error) {
    return "Failed to fetch poem.";
  }
}

