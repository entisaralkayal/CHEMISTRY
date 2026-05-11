# Netlify Deployment Guide

This project is now prepared for Netlify hosting.

## What changed for Netlify

- The React app builds to `dist/`
- API routes are handled by `netlify/functions/api.js`
- Student results are stored in Netlify Blobs after deployment
- CSV and Excel export still work from the teacher dashboard

## Upload options

### Option 1: Connect a Git repository

1. Push this project to GitHub.
2. In Netlify, choose **Add new site**.
3. Select your repository.
4. Netlify will read `netlify.toml` automatically.
5. Deploy the site.

### Option 2: Manual upload

1. Upload the included Netlify-ready ZIP or this project folder to GitHub first.
2. Connect the repository in Netlify.

Manual drag-and-drop of only `dist/` is not enough, because the project also needs the Netlify Function in `netlify/functions/`.

## Build settings

These are already defined in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

## Persistent student results

In the deployed Netlify site, results are saved with Netlify Blobs rather than SQLite. This keeps:

- student quiz submissions
- dashboard analytics
- CSV export
- Excel export

available after new deploys.

## Teacher access

- Teacher dashboard password: `2030`

## Local development

- `npm run build` builds the frontend
- `npm start` still runs the original local Node/SQLite version

The Netlify function also supports local fallback storage in `data/netlify-results.json` for verification.
