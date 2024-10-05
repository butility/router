# @butility/router

## API Documentation

### `Router(routes: Routes)`

- **Description**: Initializes the router with a defined set of routes.
- **Parameters**:
  - `routes` (Routes): A mapping of route paths to corresponding HTML file paths, view instances, or functions for rendering content.

### `set404(handler: RouteHandler | string)`

- **Description**: Configures a custom 404 error page.
- **Parameters**:
  - `handler`: Can be either:
    - A string representing the path to an HTML file (e.g., `./404.html`).
    - An instance of a View class.
    - A function that returns an HTML element.

### `navigate(path: string)`

- **Description**: Programmatically navigates to the specified route.
- **Parameters**:
  - `path` (string): The route path to navigate to (e.g., `/user/123`).
- **Behavior**: Updates the browser's history and loads the corresponding route content.

### `meta(route: string, meta: RouteMeta)`

- **Description**: Sets metadata for a specific route to enhance SEO.
- **Parameters**:
  - `route` (string): The route path for which metadata is being set.
  - `meta` (RouteMeta): An object containing the metadata, including:
    - `title` (string): The title of the page.
    - `description` (string): A brief description of the page's content.

## Type Definitions

### `Routes`

- **Description**: A type definition representing the routes within the router.
- **Structure**: A mapping where each key is a route path and each value can be:
  - A string (HTML file path).
  - An instance of a View class.
  - A function that returns an HTML element.

### `RouteHandler`

- **Description**: Represents the handler for a route.
- **Types**:
  - `string`: Path to an HTML file.
  - `View`: An instance of a View class that renders content.
  - `function`: A function that generates and returns an HTML element.

### `RouteMeta`

- **Description**: A type for storing metadata associated with routes.
- **Properties**:
  - `title` (string): The title for the route, useful for browser tab display and SEO.
  - `description` (string): A summary of the route's content for search engines and previews.

## Important Notice

### Index Route Behavior

The router automatically serves the HTML file that contains the router script, eliminating the need for an explicit route definition for the index path (`"/"`). For instance, you do not need to include a route like `"/": "./index.html"`.

To include JavaScript functionality in your HTML, you can use the following script tags:

```html
<script src="./router-config.js" type="module"></script> <!-- Imports the router configuration -->
<script src="./index.js" type="module"></script> <!-- Contains your HTML generation JavaScript code -->
```