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

export type HierarchyWithFields<T extends {fields?: string[]}> = Omit<T, 'fields'> & {
    fields: string[];
};

interface Cached<T> {
    item: T;
    lastUpdated: number;
    nextUpdate: number;
}

interface CatalogFieldsModel {
    productFields: string[];
    variantFields: string[];
    availabilityFields: string[];
}

export type CachedCatalogFieldsModel = Cached<CatalogFieldsModel>;

export interface CatalogModel extends BaseCatalogModel {
    product: ProductHierarchyModel;
    variant?: HierarchyWithFields<VariantHierarchyModel>;
    availability?: HierarchyWithFields<AvailabilityHierarchyModel>;
}

export interface CreateCatalogModel extends BaseCatalogModel {
    product: CreateProductHierarchyModel;
    variant?: CreateVariantHierarchyModel;
    availability?: CreateAvailabilityHierarchyModel;
}

export interface ProductHierarchyModel {
    /**
     * @deprecated `fields` will be ignored by the service on creation or update, but is kept for backward compatibility.
     */
    fields?: string[];
    idField: string;
    objectType: string;
}

export type CreateProductHierarchyModel = ProductHierarchyModel;

export interface VariantHierarchyModel {
    /**
     * @deprecated `fields` will be ignored by the service on creation or update, but is kept for backward compatibility.
     */
    fields: string[];
    idField: string;
    objectType: string;
}

export type CreateVariantHierarchyModel = VariantHierarchyModel;

export interface AvailabilityHierarchyModel {
    availableSkusField: string;
    /**
     * @deprecated `fields` will be ignored by the service on creation or update, but is kept for backward compatibility.
     */
    fields: string[];
    idField?: string;
    objectType: string;
}

export type CreateAvailabilityHierarchyModel = AvailabilityHierarchyModel & {
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
