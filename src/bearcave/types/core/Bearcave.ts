// deps
import { MutableRefObject } from "react";
import { AppContainer } from "@utils";

export type Refs = {
    root: MutableRefObject<HTMLDivElement | null>;
    dialog: MutableRefObject<HTMLDivElement | null>;
};

export type App = {
    container: AppContainer;
};

export interface Bearcave {
    refs: Refs;
    app: App;
}
