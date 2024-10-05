import { head, meta, body, setAttribute, setHTML } from '@butility/dom';
import { View } from '@/core/view';
import type { Routes, RouteHandler, RouteMeta } from '@/types/router';

export class Router {
    private routes: Routes;
    private defaultRoute: RouteHandler | null = null;
    private metas: Record<string, RouteMeta> = {};

    constructor(routes: Routes) {
        this.routes = routes;
        window.onpopstate = () => this.loadRoute(window.location.pathname);
    }

    // Set 404 handler
    public set404(handler: RouteHandler) {
        this.defaultRoute = handler;
    }

    // Load and render the route based on the current path
    public loadRoute(path: string) {
        const { handler, params } = this.matchDynamicRoute(path) || {};
        if (handler) {
            this.render(handler, params);
        } else if (this.defaultRoute) {
            this.render(this.defaultRoute);
        }
        this.updateMeta(path);
    }

    // Programmatically navigate to a specific route
    public navigate(path: string) {
        history.pushState({}, '', path);
        this.loadRoute(path);
    }

    // Set metadata for a route
    public meta(route: string, meta: RouteMeta) {
        this.metas[route] = meta;
    }

    // Match dynamic routes like /user/:id
    private matchDynamicRoute(
        path: string,
    ): { handler: RouteHandler; params: Record<string, string> } | null {
        for (const route in this.routes) {
            const regex = this.pathToRegex(route);
            const match = path.match(regex);
            if (match) {
                const params = this.extractParams(route, match);
                return { handler: this.routes[route], params };
            }
        }
        return null;
    }

    // Extract params from dynamic routes
    private extractParams(
        route: string,
        match: RegExpMatchArray,
    ): Record<string, string> {
        const values = match.slice(1); // Skip the full match
        const keys = Array.from(route.matchAll(/:(\w+)/g)).map(
            (result) => result[1],
        );

        return keys.reduce(
            (params, key, index) => {
                params[key] = values[index];
                return params;
            },
            {} as Record<string, string>,
        );
    }

    // Convert route with params like /user/:id to a regex
    private pathToRegex(route: string): RegExp {
        return new RegExp(`^${route.replace(/:\w+/g, '([^/]+)')}$`);
    }

    // Render the appropriate route handler
    private render(handler: RouteHandler, params: Record<string, string> = {}) {
        if (typeof handler === 'string') {
            // Adjust path for file loading
            const adjustedPath = this.getAdjustedPath(
                handler,
                window.location.pathname,
            );

            // Fetch HTML file
            fetch(adjustedPath)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('404 Not Found');
                    }
                    return response.text();
                })
                .then((html) => {
                    setHTML(document.body, html);
                })
                .catch(() => {
                    // Handle 404 or other errors here
                    if (this.defaultRoute) {
                        this.render(this.defaultRoute);
                    }
                });
        } else if (handler instanceof View) {
            handler.render(params);
        } else if (typeof handler === 'function') {
            const element = handler(params);
            setHTML(document.body, '');
            body(element);
        }
    }

    // Get adjusted path based on current URL
    private getAdjustedPath(handler: string, currentPath: string): string {
        // Check if the current path includes a directory that needs to be navigated back
        const segments = currentPath.split('/').filter(Boolean);

        // If the route is nested like /user/myusername
        if (segments.length > 1) {
            const baseDir = segments.slice(0, -1).join('/'); // Get all but the last segment
            return `../${handler}`; // Adjust to go back one directory
        }

        return handler; // Return original handler if in the root
    }

    // Update meta tags for the current route
    private updateMeta(path: string) {
        const metaData = this.metas[path];
        if (metaData) {
            if (metaData.title) document.title = metaData.title;
            if (metaData.description) {
                const descMeta = document.querySelector(
                    "meta[name='description']",
                ) as HTMLElement;
                if (descMeta) {
                    setAttribute(descMeta, { content: metaData.description });
                } else {
                    head(
                        meta({
                            name: 'description',
                            content: metaData.description,
                        }),
                    );
                }
            }
            if (metaData.keywords) {
                metaData.keywords.forEach((keyword) => {
                    head(meta({ name: 'keywords', content: keyword }));
                });
            }
        }
    }
}
