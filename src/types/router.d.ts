export type RouteHandler =
    | string
    | HTMLElement
    | ((params: Record<string, string>) => HTMLElement);
export type Routes = Record<string, RouteHandler>;

export type RouteMeta = {
    title?: string;
    description?: string;
    keywords: string[];
};
