/// <reference types="vite/client" />
// global.d.ts (假设你有一个全局声明文件)

declare module "*.tsx" {
    import { FunctionComponent } from "react";
    const component: FunctionComponent;
    export default component;
}
