# NewsMonkey

NewsMonkey is a React news application that fetches top headlines from NewsAPI and displays them category-wise with infinite scrolling.

## Features

- Browse headlines across `business`, `entertainment`, `general`, `health`, `science`, `sports`, and `technology`
- Client-side routing with `react-router-dom`
- Top loading bar while news is being fetched
- Infinite scroll for loading more articles
- Fallback image when an article image is missing or fails to load
- Author and published date display for each article

## Tech Stack

- React
- React Router
- NewsAPI
- Bootstrap
- `react-infinite-scroll-component`
- `react-top-loading-bar`
- `react-loader-spinner`

## Project Structure

```text
src/
  App.js          App routes and loading bar
  Navbar.js       Category navigation
  News.js         News fetching and infinite scroll logic
  NewsItem.js     Individual news card
  LoaderComponent.js
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Add environment variable

Create a `.env.local` file in the project root:

```env
REACT_APP_NEWS_API=your_newsapi_key_here
```

This project reads the API key from `process.env.REACT_APP_NEWS_API`.

### 3. Start the development server

```bash
npm start
```

Open `http://localhost:3000` in the browser.

## Available Scripts

### `npm start`

Runs the app in development mode.

### `npm test`

Runs the test suite in watch mode.

### `npm run build`

Builds the app for production into the `build/` folder.

## Routes

- `/` - General headlines
- `/business`
- `/entertainment`
- `/general`
- `/health`
- `/science`
- `/sports`
- `/technology`

## Notes

- `.env.local` is ignored by Git, so your API key stays local.
- News data depends on NewsAPI availability and response limits.
- If an article image is unavailable, the app shows a default placeholder image.

## Future Improvements

- Add search support
- Add country and language filters
- Improve API error handling
- Add bookmarking or saved articles
- Add better empty-state and no-results UI
