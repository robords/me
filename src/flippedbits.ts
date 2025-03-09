export default {
  async fetch(request: Request): Promise<Response> {
    if (request.url.endsWith("/")) {
      const htmlContent = await getPageHtml();
      return new Response(htmlContent, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

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

// Function to generate the full HTML page with navbar & sidebar
async function getPageHtml(): Promise<string> {
  const sidebarHtml = await getSidebar(); // Get sidebar with poem links
  const poemsHtml = await getAllPoemsHtml(); // Fetch and display all poems

  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flipped Bits</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#f6f5f3]">
    ${getNavbar()}  <!-- Include Navbar -->
    ${sidebarHtml} <!-- Include Sidebar -->

    <main class="pt-24 text-center">
        <h1 class="text-4xl font-bold">Hi</h1>
        ${poemsHtml} <!-- All poems included here -->
    </main>

    <script>
        // Sidebar Toggle Logic
        const sidebar = document.getElementById('sidebar');
        const openMenu = document.getElementById('openMenu');
        const closeMenu = document.getElementById('closeMenu');

        openMenu.addEventListener('click', () => {
            sidebar.classList.remove('-translate-x-full');
        });

        closeMenu.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
        });
    </script>

</body>
</html>`;
}

// Function to fetch list of poem files
async function getPoemFiles(): Promise<string[]> {
  return ["poem1.html", "poem2.html"];
}

// Function to fetch the poem content
async function getPoemContent(poemName: string): Promise<string> {
  const poemUrl = `https://raw.githubusercontent.com/robords/me/main/src/content/${poemName}`;

  try {
    const response = await fetch(poemUrl);
    if (!response.ok) return "Poem not found.";
    const htmlContent = await response.text();
    console.log(htmlContent);  // Debug the fetched content
    return htmlContent;
  } catch (error) {
    console.error("Error fetching poem:", error);  // Debug error
    return "Failed to fetch poem.";
  }
}

async function getAllPoemsHtml(): Promise<string> {
  const poemFiles = await getPoemFiles();

  let poemsHtmlArray = await Promise.all(
    poemFiles.map(async (filename) => {
      const poemContent = await getPoemContent(filename);
      const poemId = filename.replace(".html", ""); // Unique ID for scrolling

      return `
      <section id="${poemId}" class="poem-container bg-white shadow-lg rounded-lg p-6 mt-8 mx-auto max-w-3xl">
        <h2 class="text-2xl font-semibold mb-4">${poemId}</h2>
        ${poemContent}
      </section>`;
    })
  );

  return poemsHtmlArray.join(""); // Combine all sections into one HTML string
}


// Function to return the Navbar HTML
function getNavbar(): string {
  return `
  <header class="w-full bg-[#3d3d3f] shadow-md fixed top-0 left-0 z-[50] py-6">
    <div class="container mx-auto flex justify-between items-center px-6">
        <div class="text-2xl font-serif font-semibold text-gray-700">
          <span class="text-[#f6f5f3]">flipped</span><span class="text-[#7dce94] italic">bits</span>
        </div>
        <nav>
            <ul class="flex space-x-8 text-lg text-[#7dce94] font-medium">
                <li><a href="#" class="hover:underline">HOME</a></li>
                <li><a href="#" class="hover:underline">SHOP</a></li>
                <li><a href="#" class="hover:underline">WHOIS</a></li>
            </ul>
        </nav>
        <div class="text-2xl font-serif font-semibold text-gray-700">
          <span class="text-[#7dce94]">flipped</span><span class="text-[#f6f5f3] italic">bits</span>
        </div>
    </div>
  </header>`;
}


// Function to return the Sidebar HTML
async function getSidebar(): Promise<string> {
  const poemFiles = await getPoemFiles();
  let linksHtml = poemFiles
    .map(
      (filename) =>
        `<a href="#${filename.replace(".html", "")}" class="block text-[#f9f8fd] hover:text-[#7dce94]">
          ${filename.replace(".html", "")}
        </a>`
    )
    .join("");

  return `
    <button id="openMenu" class="fixed top-5 left-5 bg-[#3d3d3f] text-[#f9f8fd] p-3 rounded-full focus:outline-none z-[60]">
        ☰
    </button>
  
    <div id="sidebar" class="fixed top-0 left-0 w-64 h-full bg-[#3d3d3f] shadow-lg transform -translate-x-full transition-transform duration-300 z-[70]">
        <div class="p-5 flex justify-between items-center">
            <div class="bg-[#7dce94] w-6 h-6 rounded-full"></div>
            <button id="closeMenu" class="text-2xl text-[#f9f8fd]">×</button>
        </div>
        <nav class="mt-10 space-y-6 text-center text-lg">
            ${linksHtml}
        </nav>
    </div>
  `;
}

