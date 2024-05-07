<h1>Online Image Editor</h1>

<blockquote>
   <p>
      Easily edit your images in just a few clicks.
   </p>
</blockquote>

<figure>
   <img src="https://github.com/ShayanTheNerd/image-editor/blob/main/og-img.webp" alt="Online Image Editor preview" />
</figure>

<h2>Overview</h2>
<h3>The challenge</h3>
<p>Users should be able to:</p>
<ul>
   <li>view the optimal layout for the site depending on their device's screen size;</li>
   <li>upload images from their device by drag & drop or using the prompt window;</li>
   <li>apply various filters such as brightness, grayscale, blur, hue-rotation, opacity, contrast, saturation, and sepia on the image (each filter has a specific range and value which can be modified using the range slider);</li>
   <li>flip or rotate the image;</li>
   <li>reset all filters at once;</li>
   <li>download and save the final image on their device.</li>
</ul>

<h3>Links</h3>
<ul>
   <li>
      <a href="https://shayanthenerd.github.io/image-editor">Project homepage</a>
   </li>
   <li>
      <a href="https://github.com/ShayanTheNerd/image-editor">GitHub repository</a>
   </li>
   <li>
      <a href="https://github.com/ShayanTheNerd/image-editor/issues">Issues</a>
   </li>
   <li>
      <a href="https://github.com/ShayanTheNerd/image-editor/pulls">Pull requests</a>
   </li>
   <li>
      <a href="https://github.com/ShayanTheNerd?tab=repositories">My other projects</a>
   </li>
</ul>

<h2>My process</h2>
<h3>Built with:</h3>
<ul>
   <li>Semantic HTML</li>
   <li>Modern Vanilla CSS</li>
   <li>
      <a href="https://www.typescriptlang.org">TypeScript</a>
   </li>
   <li>
      <a href="https://astro.build">Astro</a> - JavaScript Framework
   </li>
</ul>

<h3>I learned how to:</h3>

- utilize TypeScript to add basic typing annotations;
- leverage Astro for static site generation (SSG) and deploy it on <a href="https://pages.github.com">GitHub Pages</a>;
- customize `<input type="range" />` to have a consistent appearance across all major browsers;
- benefit modern Vanilla CSS features such as nesting, custom media queries, media query ranges, and cascade layers using <a href="https://lightningcss.dev">Lightning CSS</a>;
- receive an image from the user through drag & drop or the prompt widnow; then, preview it on the page;
- apply CSS filters, rotations, and flips on an image;
- draw a canvas based on an image and let the user download it as a new image file.

<h2>Development setup</h2>
<p>1. First, you need to clone the project:</p>

```sh
git clone https://github.com/ShayanTheNerd/image-editor.git
```

<p>
   Alternatively, you can copy the source of the project directly to your local environment using <a href="https://github.com/Rich-Harris/degit">Degit</a>:
</p>

```sh
pnpm i -g degit

degit https://github.com/ShayanTheNerd/image-editor new-project-folder
```

<p>2. Then, install required packages:</p>

```sh
pnpm i
```

<p>3. Finally, run the <code>dev</code> script to start the dev server and locally preview the project in development mode:</p>

```sh
pnpm run dev
```

<h2>Deployment and production</h2>
<p>Before deploying the project or creating a new pull request, run the following commands and make sure there are no errors:</p>

```sh
pnpm run format

pnpm run build
```

<h2>Style Guide</h2>
<p>If you want to develop this project, please stick to these rules:</p>
<ul>
   <li>Follow the current architecture, coding paradigm, and project folder structure.</li>
   <li>Follow the current character case principals for ids, classes, variables, file and folder names, etc.</li>
   <li>Code based on the current tools, frameworks, and packages included in the project.</li>
   <li>Add Git commit messages considering <a href="https://conventional-emoji-commits.site/quick-summary/summary">Conventional Commits</a>.</li>
</ul>

<h2>Contribution</h2>
<p>Your contribution is always welcome, please follow these steps:</p>
<ol>
   <li>
      <a href="https://github.com/ShayanTheNerd/image-editor/fork">Fork the project</a>.
   </li>
   <li>Create your feature branch: <code>git checkout -b feature/branch-name</code>.</li>
   <li>Make sure to follow instructions in the <a href="https://github.com/ShayanTheNerd/image-editor#style-guide">style guide</a> section.</li>
   <li>Stage all changes you made: <code>git add -A</code>.</li>
   <li>Commit all staged changes with a descriptive commit message: <code>git commit -m '✨ feat: add foo bar baz'</code>.</li>
   <li>Push everything to your feature branch: <code>git push origin feature/branch-name</code>.</li>
   <li>Create a new Pull Request.</li>
</ol>

<h2>License</h2>
<p>
   This project is licensed under <a href="https://github.com/ShayanTheNerd/image-editor/blob/main/LICENSE.md">BSD 3 Clause License</a>. Created by <a href="https://shayan-zamani.me">Shayan Zamani</a>.
</p>
