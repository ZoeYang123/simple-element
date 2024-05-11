import { makeInstaller } from "@simple-element/utils";
import components from "./components";
import "@simple-element/theme/index.css";

const installer = makeInstaller(components);

export * from "@simple-element/components";
export default installer;
