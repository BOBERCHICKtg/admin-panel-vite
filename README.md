📋 Содержание
Описание проекта

Технологии

Установка и запуск

Структура проекта

Код проекта

API Документация

Функционал

Решение проблем

Описание проекта
Административная панель на React с авторизацией и управлением постами. Взаимодействует с REST API через прокси-сервер для обхода CORS.

Данные для входа:

Email: test@test.ru

Пароль: khro2ij3n2730

Технологии
React 18 - библиотека для пользовательских интерфейсов

TypeScript - типизация JavaScript

Redux - управление состоянием

Redux-Saga - побочные эффекты и асинхронные действия

React Router v6 - маршрутизация

Axios - HTTP клиент

js-cookie - работа с куками

Express - прокси-сервер

Установка и запуск
Пошаговая инструкция
bash

# 1. Создание проекта с Vite

npm create vite@latest admin-panel -- --template react-ts
cd admin-panel

# 2. Установка зависимостей для React

npm install redux react-redux redux-saga react-router-dom axios js-cookie
npm install --save-dev @types/react-redux @types/react-router-dom @types/js-cookie

# 3. Установка зависимостей для прокси-сервера

npm install express cors axios form-data
npm install -D nodemon

# 4. Запуск прокси-сервера (в первом терминале)

node simple-proxy.mjs

# 5. Запуск React приложения (во втором терминале)

npm run dev
После запуска:

React приложение: http://localhost:5173

Прокси-сервер: http://localhost:3001

Структура проекта
text
admin-panel/
├── src/
│ ├── api/
│ │ ├── axios-instance.ts
│ │ └── endpoints.ts
│ ├── store/
│ │ ├── index.ts
│ │ ├── root-reducer.ts
│ │ ├── root-saga.ts
│ │ ├── auth/
│ │ │ ├── auth-actions.ts
│ │ │ ├── auth-reducer.ts
│ │ │ └── auth-saga.ts
│ │ └── posts/
│ │ ├── posts-actions.ts
│ │ ├── posts-reducer.ts
│ │ └── posts-saga.ts
│ ├── components/
│ │ ├── Login.tsx
│ │ ├── PostsList.tsx
│ │ └── PrivateRoute.tsx
│ ├── App.tsx
│ ├── main.tsx
│ └── vite-env.d.ts
├── simple-proxy.mjs
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
