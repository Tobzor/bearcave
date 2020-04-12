import { createContext, useContext, MutableRefObject } from "react";

type ExternalRefs = {
    overlay: MutableRefObject<HTMLDivElement | null>;
};
type Refs = ExternalRefs;

interface Bearcave {}

const BearcaveContext = createContext({} as Bearcave);

const createBearcave = (refs: Refs) => {
    return {
        refs,
    };
};

const useBearcave: () => Bearcave = () => useContext(BearcaveContext);

export { createBearcave, useBearcave, Bearcave };
export default BearcaveContext;
