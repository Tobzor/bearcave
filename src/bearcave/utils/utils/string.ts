type ClassNameDynamic = {
    [key: string]: boolean;
};

export function classnames(
    ...parts: (string | ClassNameDynamic | undefined | boolean)[]
): string | undefined {
    const classes = parts
        .filter(Boolean)
        .reduce<string[]>((classes, part) => {
            if (part) {
                if (Array.isArray(part)) {
                    console.log("classnames does not support array yet!");
                } else if (typeof part === "object") {
                    for (const key in part) {
                        if (part[key]) {
                            classes.push(key);
                        }
                    }
                } else if (
                    typeof part === "string" ||
                    typeof part === "number"
                ) {
                    classes.push(part);
                }
            }

            return classes;
        }, [])
        .join(" ");

    if (classes) {
        return classes;
    }

    return undefined;
}

export function capitalize(str: string): string {
    return str.replace(/^\w/, (c) => c.toUpperCase());
}
