export enum SearchType {
    All = "all",
    Tag = "tag",
    Doc = "doc",
    File = "file",
}

export interface SearchResult {
    [key: string]: any;
}

export type Search = {
    [param: string]: any;
};

export interface BaseSearchFilters {
    contractor: string | null;
    system: string | null;
    discipline: string | null;
    location: string | null;
    project: string | null;
    po: string | null;
}

const DEFAULT_TAKE_VALUE = 50;

export default abstract class BaseSearch {
    protected searchType: SearchType;
    protected skip = 0;
    protected take = DEFAULT_TAKE_VALUE;

    constructor(searchType: SearchType) {
        this.searchType = searchType;
    }

    protected async parseUrlAsync(): Promise<Search | null> {
        console.log("PARSING SEARCH: ", window.location.search);
        const search = new URLSearchParams(window.location.search);
        console.log("SEARCH = ", search);
        return null;
    }
}

export class AllSearch extends BaseSearch {
    constructor() {
        super(SearchType.All);

        console.log(this.parseUrlAsync());
    }
}
