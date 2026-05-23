# Blog Admin Dashboard

- The administrative dashboard for the [Blog-API](https://github.com/sagar-shrigadi/Blog-API).
- It allows authors and adminis to log in, manage the lifecycle of blog posts (drafting, editing, publishing), and moderate user comments.

## 🔗 Live

- Live (client) site can be found [here](https://blog-api-client.pages.dev/)
- The source code for blog-api (REST API) can be found [here](https://github.com/sagar-shrigadi/Blog-API).
- The source code for blog-api-client can be found [here](https://github.com/sagar-shrigadi/Blog-API-Client).

## 🚀 Features

- **Content Management:** Create new blog posts and edit existing entries.
- **Rich Text Editing:** Integrated [TinyMCE](https://www.tiny.cloud/docs/tinymce/latest/) Editor to provide a powerful, feature-rich content creation and editing experience.
- **Publishing Controls:** Toggle visibility with instant Publish/Unpublish controls.
- **Comment Moderation:** Edit or Delete any comments.

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Styling:** Tailwind CSS

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git@github.com:sagar-shrigadi/Blog-API-CMS.git
cd blog-admin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configuration

- Create a `.env` file in the root directory and add the variable from .env.example file.

### 4. Start the Application

```bash
npm run dev
```
