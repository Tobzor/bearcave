// deps
import { createContext, useContext, MutableRefObject } from "react";
// locals
import AppContainer, { appContainerFactory } from "../app/AppContainer";

type ExternalRefs = {
    root: MutableRefObject<HTMLDivElement | null>;
    dialog: MutableRefObject<HTMLDivElement | null>;
};
type Refs = ExternalRefs;

type App = {
    container: AppContainer;
};

interface Bearcave {
    refs: Refs;
    app: App;
}

const BearcaveContext = createContext({} as Bearcave);
const createBearcave = (refs: Refs): Bearcave => {
    const appContainer = new AppContainer();
    appContainerFactory(appContainer);

    return {
        refs,
        app: {
            container: appContainer,
        },
    };
};

const useBearcave: () => Bearcave = () => useContext(BearcaveContext);

export { createBearcave, useBearcave, Bearcave };
export default BearcaveContext;
