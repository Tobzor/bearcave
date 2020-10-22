// deps
import { createBrowserHistory } from "history";
import { createContext, useContext, MutableRefObject } from "react";
// locals
import ContextManager from "../manager/ContextManager";

type ExternalRefs = {
    root: MutableRefObject<HTMLDivElement | null>;
    overlay: MutableRefObject<HTMLDivElement | null>;
};
type Refs = ExternalRefs;

type Managers = {
    context: ContextManager;
};

interface Bearcave {
    refs: Refs;
    managers: Managers;
}

const BearcaveContext = createContext({} as Bearcave);
const createBearcave = (refs: Refs): Bearcave => {
    const history = createBrowserHistory();

    const context = new ContextManager({ history });

    return {
        refs,
        managers: {
            context,
        },
    };
};

const useBearcave: () => Bearcave = () => useContext(BearcaveContext);

export { createBearcave, useBearcave, Bearcave };
export default BearcaveContext;
