import { Item } from "@components";

import { idean, capgemini } from "@images";

function Work(): JSX.Element {
    return (
        <>
            <Item
                src={idean}
                title="Idean"
                description="Part of Capgemini Invent"
            />
            <Item
                src={capgemini}
                title="Capgemini Norge AS"
                description="Software Engineering"
            />
        </>
    );
}

export default Work;
