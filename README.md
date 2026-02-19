# Samuele Felici - Personal Landing Page

This is a static landing page built with React, Tailwind CSS, and Vite, designed for GitHub Pages deployment.

## Project Structure

- `client/src`: Source code (React components, styles).
- `client/public`: Static assets (images, CV, robots.txt, sitemap.xml).
- `dist`: The output folder after running the build command (this is what you deploy).

## Deployment to GitHub Pages

You have two main options to deploy this to GitHub Pages.

### Option 1: Manual Deployment (Easiest)

1.  Run the build command locally:
    ```bash
    npm run build
    ```
    This creates a `dist` folder with your static site.

2.  Push the contents of the `dist` folder to your GitHub repository's `main` or `gh-pages` branch.
    *   If you are initializing a new repo, you might want to just copy the contents of `dist` to a new folder, initialize git there, and push.

### Option 2: GitHub Actions (Automated)

1.  Push this entire project to a GitHub repository.
2.  Go to Settings > Pages.
3.  Source: GitHub Actions.
4.  Configure a static site workflow to build `npm run build` and publish the `dist` directory.

## Custom Domain Setup (samuelefelici.com)

1.  Go to your GitHub Repository > Settings > Pages.
2.  Under "Custom domain", enter `samuelefelici.com`.
3.  Click Save. This will create a `CNAME` file in your root (or you can create it manually in `client/public/CNAME` with the content `samuelefelici.com`).
4.  Go to your DNS provider (where you bought the domain).
5.  Add the following records:
    *   **A Record**: `@` points to `185.199.108.153`
    *   **A Record**: `@` points to `185.199.109.153`
    *   **A Record**: `@` points to `185.199.110.153`
    *   **A Record**: `@` points to `185.199.111.153`
    *   **CNAME Record**: `www` points to `samuelefelici.github.io` (replace with your actual GitHub username).

## Editing Content

- **Text/Content**: Edit the files in `client/src/components/sections/`.
- **Styling**: Tailwind classes are used throughout. Global theme colors are in `client/src/index.css`.
- **Assets**: Put images and PDFs in `client/public/assets/`.

## Scripts

- `npm run dev`: Start local development server.
- `npm run build`: Build for production (outputs to `dist`).
