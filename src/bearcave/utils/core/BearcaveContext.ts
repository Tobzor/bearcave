// deps
import { createContext, useContext, MutableRefObject } from "react";
// locals
import locales from "@locales";

type ExternalRefs = {
    root: MutableRefObject<HTMLDivElement | null>;
    overlay: MutableRefObject<HTMLDivElement | null>;
};
type Refs = ExternalRefs;

type Locales = {
    [key: string]: any;
};

function getLocales(): any {
    return locales.no;
}

interface Bearcave {
    refs: Refs;
    locales: Locales;
}

const BearcaveContext = createContext({} as Bearcave);
const createBearcave = (refs: Refs): Bearcave => {
    const locales = getLocales();

    return {
        refs,
        locales,
    };
};

const useBearcave: () => Bearcave = () => useContext(BearcaveContext);

export { createBearcave, useBearcave, Bearcave };
export default BearcaveContext;
