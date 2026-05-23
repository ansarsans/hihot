# Hi Hotel Frontend

Next.js (App Router) проект с поддержкой статического экспорта для GitHub Pages.

## Локальный запуск

```bash
npm install
npm run dev
```

Открой: [http://localhost:3000](http://localhost:3000)

## Деплой на GitHub Pages

В проект уже добавлен workflow: [deploy-pages.yml](/C:/Users/user/Desktop/hihope/.github/workflows/deploy-pages.yml)

Что нужно сделать в GitHub:

1. Залить проект в репозиторий (ветка `main`).
2. Открыть `Settings` -> `Pages`.
3. В `Build and deployment` выбрать `Source: GitHub Actions`.
4. Сделать push в `main` или запустить workflow вручную (`Actions` -> `Deploy to GitHub Pages`).

После этого сайт будет доступен по адресу вида:

`https://<username>.github.io/<repo>/`

## Важно

- Для GitHub Pages используется статический экспорт (`output: export` в режиме `GITHUB_PAGES=true`).
- `basePath` и `assetPrefix` автоматически берутся из имени репозитория (`GITHUB_REPOSITORY`).
- Добавлен `public/.nojekyll`, чтобы корректно работали `/_next/*` ассеты.
