import { createContext, useContext, MutableRefObject } from "react";

type ExternalRefs = {
    root: MutableRefObject<HTMLDivElement | null>;
    overlay: MutableRefObject<HTMLDivElement | null>;
};
type Refs = ExternalRefs;

interface Bearcave {
    refs: Refs;
}

const BearcaveContext = createContext({} as Bearcave);

const createBearcave = (refs: Refs): Bearcave => {
    return {
        refs,
    };
};

const useBearcave: () => Bearcave = () => useContext(BearcaveContext);

export { createBearcave, useBearcave, Bearcave };
export default BearcaveContext;
