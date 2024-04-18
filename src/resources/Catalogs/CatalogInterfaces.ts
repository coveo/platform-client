export interface CatalogsListOptions {
    /**
     * Filter that will be matched against the catalog name, description and its configuration name.
     */
    filter?: string;
    /**
     * The 0-based index number of the page of catalogs to retrieve.
     */
    page?: number;
    /**
     * The number of catalogs to list per page.
     */
    pageSize?: number;
    /**
     * List of the unique identifiers of the catalog to show.
     */
    catalogIds?: string[];
    /**
     * List of the unique identifiers of the sources.
     */
    sourceIds?: string[];
    /**
     * If true, catalog will be enriched with field suggestions. This requires a call to SearchAPI
     */
    enrichWithFields?: boolean;
}

export type CatalogConfigurationsListOptions = Omit<CatalogsListOptions, 'filter'>;

export interface CatalogFieldsOptions {
    /**
     * If true, the database cache will be bypassed. This will resolve your fields once, and save them into the database.
     */
    bypassCache?: boolean;
}

export interface CatalogFieldsMapping {
    /**
     * Mapping of index fields to standard commerce fields
     */
    [name: string]: string;
}

export interface CreateCatalogConfigurationModel {
    /**
     * The unique identifier of the catalog configuration.
     */
    id: string;
    /**
     * The name of the catalog configuration.
     */
    name: string;
    /**
     * The configuration product structure
     */
    product: Omit<CreateProductHierarchyModel, 'fields'>;
    /**
     * The configuration variant structure
     */
    variant?: Omit<CreateVariantHierarchyModel, 'fields'>;
    /**
     * The configuration availability structure
     */
    availability?: Omit<CreateAvailabilityHierarchyModel, 'fields'>;
    /**
     * The configuration mapping of index fields to standard commerce fields
     */
    fieldsMapping?: CatalogFieldsMapping;
    /**
     * The host of the storefront to which the listing pages should be associated.
     */
    host?: string;
    /**
     * A concatenation of language, country and currency identifiers.
     */
    locale?: string;
}

export interface CatalogConfigurationModel {
    /**
     * The unique identifier of the catalog configuration.
     */
    id: string;
    /**
     * The name of the catalog configuration.
     */
    name: string;
    /**
     * The configuration product structure
     */
    product: HierarchyWithFields<ProductHierarchyModel>;
    /**
     * The configuration variant structure
     */
    variant?: HierarchyWithFields<VariantHierarchyModel>;
    /**
     * The configuration availability structure
     */
    availability?: HierarchyWithFields<AvailabilityHierarchyModel>;
    /**
     * The configuration mapping of index fields to standard commerce fields
     */
    fieldsMapping?: CatalogFieldsMapping;
    /**
     * Catalogs associated to the configuration
     */
    associatedCatalogs?: IAssociatedCatalogModel[];
    /**
     * The host of the storefront to which the listing pages should be associated.
     */
    host?: string;
    /**
     * A concatenation of language, country and currency identifiers.
     */
    locale?: string;
}

export interface IAssociatedCatalogModel {
    /**
     * The unique identifier of the catalog
     */
    id: string;
    /**
     * The name of the catalog
     */
    name: string;
    /**
     * The source containing catalog products
     */
    sourceId?: string;
    /**
     * The source containing catalog availabilities
     */
    availabilitySourceId?: string;
}

export interface BaseCatalogModel {
    /**
     * The unique identifier of the catalog
     */
    id: string;
    /**
     * The name of the catalog
     */
    name: string;
    /**
     * The description of the catalog
     */
    description?: string;
    /**
     * The source containing catalog products
     */
    sourceId?: string;
    /**
     * The source containing catalog availabilities
     */
    availabilitySourceId?: string;
    /**
     * @deprecated use `sourceId` and `availabilitySourceId` instead.
     */
    scope?: ScopeModel;
}

export type HierarchyWithFields<T extends {fields?: string[]}> = Omit<T, 'fields'> & {
    /**
     * Fields for a specific object type
     */
    fields: string[];
};

interface Updated {
    /**
     * Cache last updated timestamp
     */
    lastUpdated: number;
    /**
     * Cache next update timestamp
     */
    nextUpdate: number;
}

interface Cached<T> extends Updated {
    /**
     * Cached items
     */
    item: T;
}

interface CatalogFieldsModel {
    /**
     * Fields for the product object type
     */
    productFields: string[];
    /**
     * Fields for the variant object type
     */
    variantFields: string[];
    /**
     * Fields for the availability object type
     */
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
    /**
     * The related catalog configuration id
     */
    catalogConfigurationId?: string;
    /**
     * The catalog configuration
     */
    configuration?: CatalogConfigurationModel;
}

export type CreateCatalogModel = BaseCatalogModel &
    (
        | {
              /**
               * @deprecated use `configuration.product` instead.
               */
              product?: CreateProductHierarchyModel;
              /**
               * @deprecated use `configuration.variant` instead.
               */
              variant?: CreateVariantHierarchyModel;
              /**
               * @deprecated use `configuration.availability` instead.
               */
              availability?: CreateAvailabilityHierarchyModel;
              /**
               * The related catalog configuration id
               */
              catalogConfigurationId?: never;
              /**
               * The catalog configuration
               */
              configuration: CreateCatalogConfigurationModel;
          }
        | {
              /**
               * @deprecated use `configuration.product` instead.
               */
              product?: never;
              /**
               * @deprecated use `configuration.variant` instead.
               */
              variant?: never;
              /**
               * @deprecated use `configuration.availability` instead.
               */
              availability?: never;
              /**
               * The related catalog configuration id
               */
              catalogConfigurationId: string;
              /**
               * The catalog configuration
               */
              configuration?: never;
          }
    );

export interface FieldsSuggestionsQueryModel {
    /**
     * Source names for which to retrieve product and variant field suggestions
     */
    sourceNames: string[];
    /**
     * Source names for which to retrievee availability field suggestions
     */
    availabilitySourceNames?: string[];
    /**
     * The product object type
     */
    productObjectType: string;
    /**
     * The variant object type
     */
    variantObjectType?: string;
    /**
     * The availability object type
     */
    availabilityObjectType?: string;
}

export interface FieldsSuggestionsModel {
    /**
     * List of field suggestions
     */
    fields: FieldSuggestions[];
}

export interface FieldSuggestions {
    /**
     * Suggested field name
     */
    name: string;
    /**
     * Example values for the field
     */
    examples: string[];
}

export interface ProductHierarchyModel {
    /**
     * @deprecated `fields` will be ignored by the service on creation or update, but is kept for backward compatibility.
     */
    fields?: string[];
    /**
     * Field used as the unique product identifier
     */
    idField: string;
    /**
     * Product object type
     */
    objectType: string;
}

export type CreateProductHierarchyModel = ProductHierarchyModel;

export interface VariantHierarchyModel {
    /**
     * @deprecated `fields` will be ignored by the service on creation or update, but is kept for backward compatibility.
     */
    fields: string[];
    /**
     * Field used as the unique variant identifier
     */
    idField: string;
    /**
     * Variant object type
     */
    objectType: string;
}

export type CreateVariantHierarchyModel = VariantHierarchyModel;

export interface AvailabilityHierarchyModel {
    /**
     * Field used to contain the list of SKUs for an availability
     */
    availableSkusField: string;
    /**
     * @deprecated `fields` will be ignored by the service on creation or update, but is kept for backward compatibility.
     */
    fields: string[];
    /**
     * Field used as the unique availability identifier
     */
    idField?: string;
    /**
     * Availability object type
     */
    objectType: string;
}

export type CreateAvailabilityHierarchyModel = AvailabilityHierarchyModel & {
    // Override `idField` to make it required
    /**
     * Field used as the unique availability identifier
     */
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

export interface CachedCatalogFieldStatsModel extends Updated {
    /**
     * List of field statistics
     */
    fieldStats: FieldStatsModel[];
}

export interface FieldStatsItemModel {
    /**
     * Number of objects in the catalog with this field
     */
    objectsWithField: number;
    /**
     * Number of objects in the catalog with this type
     */
    objectsWithType: number;
}

export interface FieldStatsModel {
    /**
     * Field name
     */
    fieldName: string;
    /**
     * The field stats for product structure
     */
    product: FieldStatsItemModel;
    /**
     * The field stats for variant structure
     */
    variant: FieldStatsItemModel;
    /**
     * The field stats for availability structure
     */
    availability: FieldStatsItemModel;
}

export interface CatalogFieldStatsOptions {
    /**
     * Wether we need to force a refresh of field statistics. Field statistics are cached and computed on a regular interval.
     */
    forceRefresh?: boolean;
}

export interface CatalogObjectType {
    /**
     * If catalog content exist in source
     */
    hasCatalogContent: boolean;
    /**
     * Object type values seen on catalog content
     */
    objectTypeValues: string[];
}

export interface CatalogMetadata {
    /**
     * Metadata seen on catalog documents with a sample of values.
     */
    metadataValuesByName: {
        [name: string]: string[];
    };
}

export interface CatalogMetadataName {
    /**
     * Metadata name seen on catalog documents.
     */
    metadataNames: string[];
}
