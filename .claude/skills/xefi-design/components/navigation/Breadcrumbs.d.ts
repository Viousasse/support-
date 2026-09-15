import * as React from "react";
export interface Crumb { label: React.ReactNode; href?: string; onClick?: (e: React.MouseEvent) => void; }
export interface BreadcrumbsProps { items: Crumb[]; }
/** Path navigation; the last item is the current (non-interactive) page. */
export declare function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;
