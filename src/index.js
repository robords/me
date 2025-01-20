export default {
    async fetch(request, env, ctx) {
      return new Response(html, {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
        },
      });
    },
  };
  
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Curt Robords - Senior Capacity Engineer</title>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="bg-gray-50">
      <nav class="bg-white shadow-lg">
          <div class="max-w-6xl mx-auto px-4">
              <div class="flex justify-between items-center py-4">
                  <div class="text-xl font-semibold text-gray-800">Curt Robords</div>
                  <div class="text-gray-600">Senior Capacity Engineer</div>
              </div>
          </div>
      </nav>
  
      <main class="max-w-6xl mx-auto px-4 py-8">
          <!-- Hero Section -->
          <section class="bg-white rounded-lg shadow-md p-8 mb-8">
              <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <!-- Profile Info -->
                  <div class="flex-grow">
                      <h1 class="text-3xl font-bold text-gray-800 mb-4">Curt Robords</h1>
                      <h2 class="text-xl text-gray-600 mb-6">Senior Capacity Planning Engineer at Cloudflare</h2>
                      <p class="text-gray-700 leading-relaxed mb-4">
                          I have years of experience across senior level tech roles, including Senior TPM, senior network and CDN capacity engineer and planner, 
                          with a strong interest in using data science and building software to automate manual work, to enhance strategic planning and enable 
                          accurate long-term forecasting.
                      </p>
                      <div class="text-gray-600">
                          📍 Rochester, New York, United States (Remote)
                      </div>
                  </div>
              </div>
          </section>
  
          <!-- Professional Experience -->
          <section class="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">Professional Experience</h2>
              
              <!-- Cloudflare -->
              <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">Senior Capacity Planning Engineer</h3>
                  <div class="text-gray-600 mb-2">Cloudflare • Dec 2023 - Present</div>
              </div>
  
              <!-- AWS -->
              <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">Senior Technical Program Manager</h3>
                  <div class="text-gray-600 mb-2">Amazon Web Services (AWS) • Feb 2019 - Dec 2023</div>
                  <ul class="list-disc list-inside text-gray-700 space-y-2">
                      <li>Managed the design, launch, and roadmap for capacity forecasting and decision analytics systems for AWS's global CDN</li>
                      <li>Designed and built data pipelines using AWS CDK, Lambda, Glue Crawlers, and Athena</li>
                      <li>Built a Jupyter notebook-based environment for data analysis</li>
                      <li>Led strategic initiatives saving CloudFront over $1.2M/month</li>
                  </ul>
              </div>
  
              <!-- Level 3 Communications -->
              <div class="mb-8">
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">Senior Planner - Backbone</h3>
                  <div class="text-gray-600 mb-2">Level 3 Communications • May 2014 - Sep 2017</div>
                  <ul class="list-disc list-inside text-gray-700 space-y-2">
                      <li>Planned and forecasted demand on IP and IPVPN backbones using R, SQL, and Python</li>
                      <li>Developed strategic plans and budgets for network growth and efficiency</li>
                      <li>Led network integration efforts between acquired companies</li>
                  </ul>
              </div>
          </section>
  
          <!-- Skills & Technologies -->
          <section class="bg-white rounded-lg shadow-md p-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">Skills & Technologies</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div class="bg-gray-100 rounded-lg p-3 text-center text-gray-700">Python</div>
                  <div class="bg-gray-100 rounded-lg p-3 text-center text-gray-700">R</div>
                  <div class="bg-gray-100 rounded-lg p-3 text-center text-gray-700">SQL</div>
                  <div class="bg-gray-100 rounded-lg p-3 text-center text-gray-700">AWS Services</div>
                  <div class="bg-gray-100 rounded-lg p-3 text-center text-gray-700">Data Analysis</div>
                  <div class="bg-gray-100 rounded-lg p-3 text-center text-gray-700">Capacity Planning</div>
                  <div class="bg-gray-100 rounded-lg p-3 text-center text-gray-700">Network Engineering</div>
                  <div class="bg-gray-100 rounded-lg p-3 text-center text-gray-700">Technical Leadership</div>
                  <div class="bg-gray-100 rounded-lg p-3 text-center text-gray-700">Strategic Planning</div>
              </div>
          </section>
      </main>
  
      <footer class="bg-gray-800 text-white mt-12">
          <div class="max-w-6xl mx-auto px-4 py-6 text-center">
              <p>© ${new Date().getFullYear()} Curt Robords. All rights reserved.</p>
          </div>
      </footer>
  </body>
  </html>`;