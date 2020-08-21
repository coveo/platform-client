export interface CatalogsListOptions {
    page?: number;
    pageSize?: number;
}

export interface BaseCatalogModel {
    id: string;
    name: string;
    description?: string;
    scope?: ScopeModel;
}

export interface CatalogModel extends BaseCatalogModel {
    product: ProductHierarchyModel;
    variant?: VariantHierarchyModel;
    availability?: AvailabilityHierarchyModel;
}

export interface CreateCatalogModel extends BaseCatalogModel {
    product: CreateProductHierarchyModel;
    variant?: CreateVariantHierarchyModel;
    availability?: CreateAvailabilityHierarchyModel;
}

export interface ProductHierarchyModel {
    idField: string;
    objectType: string;
    fields: string[];
}

export type CreateProductHierarchyModel = Omit<ProductHierarchyModel, 'fields'>;

export interface VariantHierarchyModel {
    fields: string[];
    idField: string;
    objectType: string;
}

export type CreateVariantHierarchyModel = Omit<VariantHierarchyModel, 'fields'>;

export interface AvailabilityHierarchyModel {
    availableSkusField: string;
    fields: string[];
    idField?: string;
    objectType: string;
}

export type CreateAvailabilityHierarchyModel = Omit<AvailabilityHierarchyModel, 'fields'> & {
    // Override `idField` to make it required
    idField: string;
};

export type ScopeModel =
    | {
          query: string;
      }
    | {
          query?: string;
          sourceIds: string[];
      };
