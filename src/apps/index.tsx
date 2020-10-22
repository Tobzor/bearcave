// deps
import React, { useEffect, useMemo, useState } from "react";
// locals
import { BearcaveContent, BearcaveFooter, BearcaveNav } from "@components";
import { useBearcave } from "@utils";

import Home from "./homepage";
import Trippin from "./trippin";

const BearcaveApps: React.FC = () => {
    const [hasRegistered, setHasRegistered] = useState(false);
    const {
        managers: { context },
    } = useBearcave();

    function registerApps() {
        if (!hasRegistered) {
            Home();
            Trippin();
            setHasRegistered(true);
        }
    }

    const App = useMemo(() => {
        registerApps();

        return context.getCurrentApp();
    }, [window.location, hasRegistered]);

    return (
        <>
            <BearcaveNav />
            <BearcaveContent>
                <App />
            </BearcaveContent>
            <BearcaveFooter />
        </>
    );
};

export default BearcaveApps;
