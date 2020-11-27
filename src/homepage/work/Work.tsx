import Item from "../item/Item";
import ItemGroup from "../item/ItemGroup";

import { idean, capgemini } from "@images";

function Work(): JSX.Element {
    return (
        <ItemGroup>
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
        </ItemGroup>
    );
}

export default Work;
