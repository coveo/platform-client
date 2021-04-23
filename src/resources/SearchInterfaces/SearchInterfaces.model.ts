interface IAccesses {
    users: string[];
    domains: string[];
}

interface IFacet {
    field: string;
    label: string;
}

interface ISearchInterfaceConfiguration {
    id: string;
    name: string;
    title: string;
    facets: IFacet[];
    accesses: IAccesses;
}
