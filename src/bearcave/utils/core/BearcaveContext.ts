// deps
import { createContext, useContext, MutableRefObject } from "react";
import { createBrowserHistory, History } from "history";
// locals
import AppContainer, {
    appContainerFactory,
    CreateAppContainer,
} from "../app/AppContainer";

type ExternalRefs = {
    root: MutableRefObject<HTMLDivElement | null>;
    overlay: MutableRefObject<HTMLDivElement | null>;
};
type Refs = ExternalRefs;

type App = {
    container: AppContainer;
};

interface Bearcave {
    history: History;
    refs: Refs;
    app: App;
}

const BearcaveContext = createContext({} as Bearcave);
const createBearcave = (refs: Refs): Bearcave => {
    const history = createBrowserHistory();

    const appContainer = new AppContainer();
    appContainerFactory(appContainer);

    return {
        history,
        refs,
        app: {
            container: appContainer,
        },
    };
};

const useBearcave: () => Bearcave = () => useContext(BearcaveContext);

export { createBearcave, useBearcave, Bearcave };
export default BearcaveContext;
