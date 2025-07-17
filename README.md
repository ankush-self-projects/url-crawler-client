# URL Crawler Client

A modern, TypeScript-based React application for managing and monitoring crawled URLs. Features include:

- User authentication with JWT
- Dashboard with sortable, searchable, and paginated URL table
- Add new URLs for crawling
- Bulk actions (delete, crawl)
- Material UI for a clean, responsive interface
- Comprehensive linting and testing setup

---

# Getting Started

## 1. Install Dependencies

```
npm ci
```

## 2. Run Locally (Development)

```
npm run dev
```

- The app will be available at the URL printed in the terminal (usually http://localhost:5173).

## 3. Lint and Check Code

```
npm run lint
```

## 4. Run Tests

```
npm test
```

## 5. Build for Production

```
npm run build
```

- The production build will be output to the `dist/` directory.

## 6. Preview Production Build Locally

```
npm run preview
```

- This serves the `dist/` build locally (default: http://localhost:4173).

## 7. Build and Run with Docker

```
docker build -t url-crawler-client .
docker run --rm -p 4173:4173 url-crawler-client
```

- This will serve your production build at [http://localhost:4173](http://localhost:4173).
