export interface CatalogsListOptions {
    filter?: string;
    page?: number;
    pageSize?: number;
}

export type CatalogConfigurationsListOptions = Omit<CatalogsListOptions, 'filter'>;

export interface CatalogFieldsOptions {
    bypassCache?: boolean;
}

export interface CatalogFieldsMapping {
    [name: string]: string;
}

export interface CreateCatalogConfigurationModel {
    id: string;
    name: string;
    product: Omit<CreateProductHierarchyModel, 'fields'>;
    variant?: Omit<CreateVariantHierarchyModel, 'fields'>;
    availability?: Omit<CreateAvailabilityHierarchyModel, 'fields'>;
    fieldsMapping: CatalogFieldsMapping;
}

export interface CatalogConfigurationModel {
    id: string;
    name: string;
    product: HierarchyWithFields<ProductHierarchyModel>;
    variant?: HierarchyWithFields<VariantHierarchyModel>;
    availability?: HierarchyWithFields<AvailabilityHierarchyModel>;
    fieldsMapping: CatalogFieldsMapping;
    associatedCatalogs: IAssociatedCatalogModel[];
}

export interface IAssociatedCatalogModel {
    id: string;
    name: string;
}

export interface BaseCatalogModel {
    id: string;
    name: string;
    description?: string;
    sourceId?: string;
    availabilitySourceId?: string;
    /**
     * @deprecated use `sourceId` and `availabilitySourceId` instead.
     */
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
    /**
     * @deprecated use `configuration.product` instead.
     */
    product: ProductHierarchyModel;
    /**
     * @deprecated use `configuration.variant` instead.
     */
    variant?: HierarchyWithFields<VariantHierarchyModel>;
    /**
     * @deprecated use `configuration.availability` instead.
     */
    availability?: HierarchyWithFields<AvailabilityHierarchyModel>;

    // Have to be optional for backward compatibility.
    catalogConfigurationId?: string;
    configuration?: CatalogConfigurationModel;
}

export type CreateCatalogModel = BaseCatalogModel &
    (
        | {
              product?: CreateProductHierarchyModel;
              variant?: CreateVariantHierarchyModel;
              availability?: CreateAvailabilityHierarchyModel;
              catalogConfigurationId?: never;
          }
        | {
              product?: never;
              variant?: never;
              availability?: never;
              catalogConfigurationId: string;
          }
    );

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
