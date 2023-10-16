<h1>Virtual Keyboard PWA</h1>

<p>
   Intuitive and beautiful image editor.
</p>
<figure>
   <img src="https://github.com/ShayanTheNerd/image-editor/blob/main/og-img.webp" alt="Image Editor preview" />
</figure>

<h2>Overview</h2>
<h3>The challenge</h3>
<p>Users should be able to:</p>
<ul>
   <li>See the page in dark/light mode based on their system preferences.</li>
   <li>Upload images from their device by using the prompt window or drag & drop.</li>
   <li>Apply various filters such as grayscale, brightness, blur, saturation, hue rotation, opacity, contrast, and sepia on the image. Each filter has a specific range and value which can be modified using the range slider.</li>
   <li>Flip or rotate the image.</li>
   <li>Reset all filters at once.</li>
   <li>Save the final image to their device.</li>
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
   <li>
      <a href="https://tailwindcss.com">Tailwind CSS</a> - Styling
   </li>
   <li>Vanilla JavaScript</li>
</ul>

<h3>I learned:</h3>
<ul>
   <li>How to receive an image from the user through the prompt widnow or drag & drop, and preview it on the page.</li>
   <li>How to apply various CSS filters, rotations, and flips on an image.</li>
   <li>How to draw a canvas based on the edited image and let the user download it as a new image file with the original format.</li>
</ul>

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

<p>3. Finally, run the <code>dev</code> script to start the dev server:</p>

```sh
pnpm run dev
```

<p>Now, you can preview the project on a local server of your choice. My personal recommendation is the <a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer">Live Server Extension</a>.</p>

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
   <li>Code based on the current libraries, frameworks, and packages included in the project.</li>
   <li>For styling, utilize Tailwind's features as much as possible, but also make sure to use <a href="https://getbem.com">BEM</a> methodology for naming custom CSS classes.</li>
   <li>In case you need to access an HTML element in JavaScript by a class name, prefix the class name with <code>js-</code>. For example, <code>js-submit-btn</code>.</li>
   <li>Add Git commit messages considering <a href="https://www.conventionalcommits.org">Conventional Commits</a>.</li>
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
   <li>Commit all staged changes with a descriptive commit message: <code>git commit -m 'feat: add foo bar baz'</code>.</li>
   <li>Push everything to your feature branch: <code>git push origin feature/branch-name</code>.</li>
   <li>Create a new Pull Request.</li>
</ol>

<h2>License</h2>
<p>
   This project is licensed under <a href="https://github.com/ShayanTheNerd/image-editor/blob/main/LICENSE.md">MIT license</a>. You're free to use it, but a link to this page and mentioning the author's name is mandatory. Created by <a href="https://shayan-zamani.me">Shayan Zamani</a>.
</p>

<br />

<a href="https://github.com/ShayanTheNerd/image-editor#image-editor">back to top ⬆️</a>
