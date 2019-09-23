export interface CatalogsListOptions {
    page?: number;
    pageSize?: number;
}

export interface CatalogModel {
    id: string;
    name: string;
    product: ProductHierarchyModel;
    availability?: AvailabilityHierarchyModel;
    description?: string;
    variant?: VariantHierarchyModel;
}

export type NewCatalogModel = Omit<CatalogModel, 'id'>;

export interface VariantHierarchyModel {
    fields: string[];
    idField: string;
    objectType: string;
}

export interface ProductHierarchyModel {
    idField: string;
    objectType: string;
}

export interface AvailabilityHierarchyModel {
    availableSkusField: string;
    fields: string[];
    objectType: string;
}
