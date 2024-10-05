
# @butility/router

A lightweight and flexible client-side router for building single-page applications (SPAs) with TypeScript. This router allows developers to define routes dynamically and supports HTML files, view classes, and functions for rendering content.

## Features

- **Dynamic Route Matching**: Easily match routes with parameters (e.g., `/user/:id`).
- **Multiple Route Handlers**: Use HTML file paths, view classes, or functions to render content.
- **Custom 404 Handling**: Configure a custom 404 page to handle not found routes.
- **Meta Tags Management**: Set metadata for each route for better SEO.
- **Relative Path Calculation**: Automatically adjusts paths based on the current route.

## Installation

To install the package, you can use npm or CDN:

```bash
npm install @butility/router
```

```html
<!-- To use all the functions and methods -->
<script src="https://unpkg.com/@butility/router@latest/router.js" type="module"></script>
<script src="https://cdn.jsdelivr.net/npm/@butility/router@latest/router.js" type="module"></script>
```


## Usage

### Basic Setup

1. **Import the Router and View**:

WE used typescript for example but for JavaScript just remove the types, other is okay!

```typescript
import Router, { View } from "@butility/router";
import type { Routes } from "@butility/router";
```

2. **Define a View Class** (optional):

```typescript
class UserProfileView extends View {
    public render(params: Record<string, string>) {
        const userId = params.id; // Accessing the :id param
        document.body.innerHTML = `
            <h1>User Profile</h1>
            <p>Welcome, user #${userId}!</p>
        `;
    }
}
```

3. **Define Your Routes**:

```typescript
const routes: Routes = {
    "/": "./index.html",  // HTML file path for the root route
    "/user/:id": new UserProfileView(),  // Using a View class
    "/login": "./login.html" // Another HTML file
};
```

4. **Create an Instance of the Router**:

```typescript
const router = new Router(routes);
```

5. **Set a Custom 404 Route**:

```typescript
router.set404("./404.html");
```

6. **Navigate to Routes Programmatically**:

```typescript
router.navigate("/user/123");  // Navigates to user profile with id 123
```

### Example

Here’s a complete example that uses a function as a route handler:

```typescript
function UserProfileFunction(params: Record<string, string>) {
    const userId = params.id; // Accessing the :id param
    const div = document.createElement("div");
    div.innerHTML = `
        <h1>User Profile</h1>
        <p>Welcome, user #${userId}!</p>
    `;
    return div;
}

const routes: Routes = {
    "/home": "./home.html",
    "/user/:id": UserProfileFunction,
};

const router = new Router(routes);
router.set404("./404.html");
router.navigate("/user/456"); // Navigates to user profile with id 456
```

## API

For `@butility/router` documentation refer to the [docs folder](https://github.com/butility/router/tree/main/docs/api.md).

## Contributing

Feel free to contribute by submitting issues or pull requests to improve this library.

## License

This project is licensed under the [MIT License](LICENSE.md).