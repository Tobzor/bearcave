// deps
import { createContext, useContext } from "react";
// locals
import { Bearcave, Refs } from "@types";
import AppContainer, { appContainerFactory } from "../app/AppContainer";

const BearcaveContext = createContext({} as Bearcave);
const createBearcave = (refs: Refs): Bearcave => {
    // having some magic factory things so that apps can call this function
    // and wait for it being set.
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
