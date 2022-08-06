import { useEffect } from "react";

function Todo(): JSX.Element {
    useEffect(() => {
        // could do things
        console.log("This is TODO app");
    }, []);

    return <div>TODO</div>;
}

export default Todo;
