import { Item } from "@components";
import { uio, uis } from "@images";

function Education(): JSX.Element {
    return (
        <>
            <Item
                src={uio}
                title={"University of Oslo"}
                description={"Informatics: Programming and networks"}
            />
            <Item
                src={uis}
                title={"University of Stavanger"}
                description={"Bachelor in Computer Science"}
            />
        </>
    );
}

export { Education };
