import Item from "../item/Item";

function PastProjects(): JSX.Element {
    return (
        <>
            <Item
                src={""}
                title={"Handsy computer vision"}
                description={"Computer vision project"}
            />
            <Item
                src={""}
                title={"Libgdx android game"}
                description={
                    "Gameprogramming for bachelor because much more interesting"
                }
            />

            <Item
                src={""}
                title={"Organisation unit manager"}
                description={"School project dor DHIS 2 @UiO"}
            />

            <Item
                src={""}
                title={"Photo Viewer"}
                description={"School group project for teamwork stuffsies"}
            />
        </>
    );
}

export default PastProjects;
