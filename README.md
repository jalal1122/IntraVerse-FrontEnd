# IntraVerse Frontend Client

IntraVerse Frontend Client is the production-ready MERN stack client-side application powering the IntraVerse blog platform. Built with React (v19.1.0), Vite (v7.0.4), and Tailwind CSS (v4.1.11), it offers a highly interactive, responsive, and aesthetically premium user interface for viewing posts, managing personal blogs, composing rich content via CKEditor, posting chronological comments, and configuring interface themes.

This client is optimized for seamless local development and is fully configured for hosting on platforms such as Netlify or Vercel.

---

## 🏗️ Architecture & Tech Stack

The frontend follows a modern, Redux-managed structure with distinct pages, components, features, and styling configuration.

*   **Core Framework**: React (v19.1.0)
*   **Build Tool & Dev Server**: Vite (v7.0.4)
*   **State Management**: Redux Toolkit & React Redux (v9.2.0)
    *   `postsSlice`: Public post queries, trending lists, post loading, and comment creation.
    *   `userSlice`: Session handling, cookie parsing, and auth status tracking.
    *   `adminSlice`: Administrator controls for posts CRUD operations.
    *   `colorSlice`: Global theme mode and color mapping.
*   **Routing**: React Router v7 (`react-router` v7.7.1) for single-page routing and auth-guard protection.
*   **Styling & UI**:
    *   Tailwind CSS (v4.1.11) with `@tailwindcss/vite` integration.
    *   Styled Components (`styled-components` v6.1.19) for dynamic style overrides.
    *   React Icons (`react-icons` v5.5.0) for visual glyphs.
*   **Rich Text Editor**: CKEditor 5 React integration (`@ckeditor/ckeditor5-react` and `@ckeditor/ckeditor5-build-classic`).
*   **API Interception & HTTP**: Axios (v1.11.0) with interceptors verifying authentication token expirations and automating token refresh routing.
*   **Metadata & SEO**: React Head (v3.4.2) for injecting page title and header tags.

---

## 🌟 Core Features

*   **Premium Interactive Interface & Dashboard**:
    *   Responsive Hero block displaying prominent banner items.
    *   Dynamic Search bar querying endpoints on key input.
    *   Double-column dashboard formatting featuring trending lists and the newest posts.
*   **Redux-Powered Global State Management**:
    *   Slices for user sessions, public post queries, comments, theme toggling, and dashboard CRUD.
    *   Axios interceptors capturing HTTP `401` errors, dispatching thunks to regenerate cookies, and routing to login upon expired credentials.
*   **Aesthetic Theme Customization**:
    *   Global theme slice detecting system preferences and keeping preferences in localStorage.
    *   *Theme Mapping*: Light mode outputs a sleek dark background (`#181A2A`) with white text, while Dark mode maps to a bright theme (white background with black text).
*   **Fully Guard-Protected Routes**:
    *   `checkAuth` wrapper verifying cookie existence before mounting `MyBlogs`, `CreatePost`, and `EditPost` views.
*   **Rich Content Creation & Editing (Admin Mode)**:
    *   WYSIWYG blog editing via CKEditor 5.
    *   Custom tags input components separating tags into searchable lists.
    *   File field handler supporting image previews before publishing.
*   **Dynamic Commenting Feeds**:
    *   Comments component that fetches and maps discussions per post ID.
*   **SEO Meta Integration**:
    *   Custom SEO component utilizing React Head to dynamically write titles and meta tags for specific articles.

---

## 📁 Project Structure

Below is the directory structure highlighting the role of each directory in the client codebase:

```text
IntraVerse-FrontEnd/
├── public/                  # Static assets (favicons, manifest files, logos)
├── src/
│   ├── app/
│   │   └── store.js         # Redux store configuring user, colors, posts, and admin reducers
│   ├── assets/              # Client-side graphics, placeholders, and static images
│   ├── Components/          # Global layout and content widgets
│   │   ├── Header/          # Main header, RightSideIcons, and SearchBar
│   │   ├── DashBoard_Components/ # Hero sections, newest posts feeds, and sidebar
│   │   ├── MyBlogs_Components/   # AdminPost controls, BlogEditor, and TagsInput field
│   │   ├── Post Details_Components/ # Post view, Comments feed, and MakeComments form
│   │   ├── Footer.jsx       # Premium footer with social/legal links
│   │   ├── Loader.jsx       # App-wide loading spinner
│   │   ├── SEO.jsx          # React Head wrapper for indexable headers
│   │   └── Router.jsx       # Route configuration mapping path components
│   ├── features/            # Redux Slices & API request layers
│   │   ├── Colors/          # colorSlice managing themes and layout colors
│   │   ├── Posts/           # postsSlice & postsService handling public post actions
│   │   ├── User/            # userSlice & userService handling logins/logouts
│   │   └── admin/           # adminSlice & adminService handling creator controls
│   ├── Pages/               # Route components
│   │   ├── Dashboard.jsx    # Home feeds view
│   │   ├── Login.jsx        # Login credential page
│   │   ├── Register.jsx     # Registration form (disabled/commented out)
│   │   ├── MyBlogs.jsx      # Managed post list for authenticated users
│   │   ├── PostDetails.jsx  # Single post container view
│   │   ├── About.jsx        # About page content
│   │   ├── Contact.jsx      # Contact form submission page
│   │   ├── PrivacyPolicy.jsx # User terms and policies
│   │   └── TermsOfService.jsx
│   ├── utils/               # Axios configuration and error-handling interceptors
│   ├── App.jsx              # Main App node applying style changes from Redux Color slice
│   ├── index.css            # Core styles and Tailwind directives
│   └── main.jsx             # Entry point bootstrapping the App
├── .env.local               # Environment configurations for local execution
├── .env.production          # Environment configurations for production builds
├── netlify.toml             # Redirect mapping for Netlify router rewrites
├── vercel.json              # Redirect mapping for Vercel router rewrites
├── vite.config.js           # Vite build and tailwind plugin integrations
└── package.json             # NPM client scripts and dependencies
```

---

## ⚙️ Prerequisites & Environment Variables

### Prerequisites

To build and run the client, make sure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18.x or higher recommended)
*   [npm](https://www.npmjs.com/) (v9.x or higher)
*   Running instance of the [IntraVerse API Backend](https://github.com/jalal1122/IntraVerse-Api-BackEnd.git)

### Environment Variables

Create `.env.local` (for development) and `.env.production` (for production builds) files in the root folder based on these variables:

| Variable | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| `VITE_APP_API_URL` | Yes | `https://intraaversebackend.vercel.app` | Base API target URL for Axios connections (e.g. `http://localhost:5000` in dev). |
| `VITE_APP_NODE_ENV` | Yes | `development` | Targeted environment mode (`development` or `production`). |
| `VITE_CLOUDINARY_CLOUD_NAME` | Yes | - | Your Cloudinary Cloud Name identifier. |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Yes | - | Configured upload preset in your Cloudinary console. |
| `VITE_CLOUDINARY_FOLDER` | Yes | - | Cloudinary directory path to store uploads. |

---

## 🚀 Local Development & Installation

Follow these steps to set up and run the client application locally:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/jalal1122/IntraVerse-FrontEnd.git
    cd IntraVerse-FrontEnd
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create `.env.local` inside the project root:
    ```env
    VITE_APP_API_URL=http://localhost:5000
    VITE_APP_NODE_ENV=development
    VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
    VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
    VITE_CLOUDINARY_FOLDER=your_folder
    ```

4.  **Start the Local Server**:
    Run Vite development server:
    ```bash
    npm run dev
    ```

5.  **Access the Application**:
    Open [http://localhost:5173](http://localhost:5173) in your browser. Ensure the Backend API is active at the URL configured in `VITE_APP_API_URL`.

6.  **Build for Production**:
    Compile an optimized production build inside the `dist` directory:
    ```bash
    npm run build
    ```

---

## 🔌 Connected API Endpoints

The frontend client communicates with the API Backend via the following routes (relative to `VITE_APP_API_URL`):

### 🔑 Session & Auth
*   `POST /api/user/login` - Authenticate credentials and download session.
*   `GET /api/user/logout` - Clear cookies and terminate session.
*   `GET /api/user/refresh-token` - Request new JWT keys on session timeout.
*   `POST /api/user/register` - Create new user credentials.

### 📝 Posts CRUD
*   `GET /api/posts` - Fetch paginated public posts (queries: `search`, `category`, `tag`).
*   `GET /api/post/:id` - Fetch details for a specific post.
*   `POST /api/post` - Create a post (Requires authentication, uses Form Data upload).
*   `PUT /api/post/:id` - Update a post (Requires authentication, uses Form Data upload).
*   `DELETE /api/post/:id` - Remove a post. (Requires authentication)
*   `GET /api/posts/trending` - Fetch current trending posts.
*   `GET /api/admin/posts` - Retrieve posts authored by current admin. (Requires authentication)

### 💬 Comments
*   `GET /api/comments/:postId` - Fetch comment list for an article.
*   `POST /api/comments/:postId` - Publish a comment.
