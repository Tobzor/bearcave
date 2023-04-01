import { Item } from "@components";


import idean from "@assets/images/idean.jpeg"
import capgemini from "@assets/images/capgemini.jpeg";

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

export { Work };
