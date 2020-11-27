import ItemGroup from "../item/ItemGroup";
import Item from "../item/Item";
import { uio, uis } from "@images";

function Education(): JSX.Element {
    return (
        <ItemGroup>
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
        </ItemGroup>
    );
}

export default Education;
