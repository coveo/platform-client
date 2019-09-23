export interface CatalogsListOptions {
    page?: number;
    pageSize?: number;
}

export interface CatalogModel {
    availability?: AvailabilityHierarchyModel;
    description?: string;
    id?: string;
    name?: string;
    product?: ProductHierarchyModel;
    variant?: VariantHierarchyModel;
}

export interface VariantHierarchyModel {
    fields: string[];
    idField: string;
    objectType: string;
}

export interface ProductHierarchyModel {
    idField?: string;
    objectType?: string;
}

export interface AvailabilityHierarchyModel {
    availableSkusField: string;
    fields: string[];
    objectType: string;
}
