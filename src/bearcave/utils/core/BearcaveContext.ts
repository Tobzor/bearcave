// deps
import { createContext, useContext } from "react";
// locals
import { Bearcave, Refs } from "@types";
import AppContainer, { appContainerFactory } from "../app/AppContainer";

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

export { createBearcave, useBearcave };
export default BearcaveContext;
