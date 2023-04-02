import { Item } from "@components";

import uio from "@assets/images/uio.png";
import uis from "@assets/images/uis.png";

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
