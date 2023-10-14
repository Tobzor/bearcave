import { Item } from "@components";

import webstep from "@assets/images/webstep.jpg";
import idean from "@assets/images/idean.jpeg";
import capgemini from "@assets/images/capgemini.jpeg";

function Work(): JSX.Element {
    return (
        <>
            <Item
                src={webstep}
                title="Webstep Stavanger"
                description="Developing for tomorrow"
            />
            <Item
                src={idean}
                title="Idean"
                description="Part of Capgemini Invent"
            />
            <Item
                src={capgemini}
                title="Capgemini Stavanger"
                description="Software Engineering"
            />
        </>
    );
}

export { Work };
