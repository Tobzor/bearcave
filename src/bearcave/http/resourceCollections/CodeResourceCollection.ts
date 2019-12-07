import BaseResourceCollection from "./BaseResourceCollection";
import { combineUrls, addParams } from "../../utils/url";
import { url } from "inspector";

// Get
export interface IndependentCodeParams {
    useCache?: boolean;
    isValid?: boolean;
    value?: string;
}

export interface DependentCodeParams extends IndependentCodeParams {
    parentValue: string | number;
}

export type CodeParams = DependentCodeParams | IndependentCodeParams;

// Import
export type ImportCodeOperation = "insert" | "update" | "insert-or-update";
export interface ImportCodeParams {
    commit?: boolean;
    operation?: ImportCodeOperation;
    userName?: string;
}

export default class CodeResourceCollection extends BaseResourceCollection {
    private combineCodeUrls(codeType: CodeTableType, codeParams?: CodeParams) {
        const url = combineUrls(this.getBaseUrl(), this.instCode(), codeType);

        const combinedCodeParams: CodeParams = {
            useCache: true,
            isValid: false,
            ...codeParams,
        };

        return addParams(url, combinedCodeParams);
    }

    private combineCodeImportUrls(codeType: CodeTableType, importParams?: ImportCodeParams) {
        const url = combineUrls(this.getBaseUrl(), this.instCode(), codeType);

        const combinedImportParams: ImportCodeParams = {
            commit: false,
            operation: "insert-or-update",
            ...importParams,
        };

        return addParams(url, combinedImportParams);
    }

    getResource(codeType: CodeTableType, codeParams?: CodeParams): string {
        const url = this.combineCodeUrls(codeType, codeParams);
        return url;
    }

    getImportResource(codeType: CodeTableType, importParams?: ImportCodeParams): string {
        const url = this.combineCodeImportUrls(codeType, importParams);
        return url;
    }
}

export type CodeTableType = DependentCodeTableType | IndependentCodeTableType;

// Requires parentValue
export enum DependentCodeTableType {
    DocFormat = "doc-format",
    DocSearchValue = "doc-search-value",
    DocType = "doc-type",
    PipingClassSize = "piping-class-size",
    SubSystem = "sub-system",
    TagFormat = "tag-format",
    TagSearchValue = "tag-search-value",
    TagType = "tag-type",
}

export enum IndependentCodeTableType {
    BlastRating = "blast-rating",
    CableCode = "cable-code",
    CableSegregation = "cable-segregation",
    CableSpec = "cable-spec",
    CableVoltLevel = "cable-volt-level",
    Contractor = "contractor",
    Discipline = "discipline",
    DocCategory = "doc-category",
    DocClass = "doc-class",
    DocCompany = "doc-company",
    DocFileFormat = "doc-file-format",
    DocGroup = "doc-group",
    DocObjectType = "doc-object-type",
    DocPriority = "doc-priority",
    DocRevAcceptance = "doc-rev-acceptance",
    DocRevStatus = "doc-rev-status",
    DocSearchType = "doc-search-type",
    DocSize = "doc-size",
    DocSource = "doc-source",
    DuctFunctionCode = "duct-function-code",
    ExClass = "ex-class",
    FireArea = "fire-area",
    FireRating = "fire-rating",
    GasGroup = "gas-group",
    HeatTraceType = "heat-trace-type",
    HwTypical = "hw-typical",
    InletOutletConnection = "inlet-outlet-connection",
    InsulationClass = "insulation-class",
    LineSize = "line-size",
    Location = "location",
    NdtClass = "ndt-class",
    NodeIdentifier = "node-identifier",
    PedCategory = "ped-category",
    PenetrationLocation = "penetration-location",
    PipingClass = "piping-class",
    PlantIdentificator = "plant-identificator",
    Priority = "priority",
    ProductCode = "product-code",
    Protection = "protection",
    Po = "po",
    Project = "project",
    SignalLevel = "signal-level",
    SignalType = "signal-type",
    SilRequirement = "sil-requirement",
    SiteCode = "site-code",
    SupplyCode = "supply-code",
    System = "system",
    MainSystem = "main-system",
    TagCategory = "tag-category",
    TagStatus = "tag-status",
    TagRefType = "tag-ref-type",
    TagSearchType = "tag-search-type",
    TemperatureClass = "temperature-class",
    TestMedium = "test-medium",
    ValveDatash = "valve-datash",
    ValvePosition = "valve-position",
    ValveRating = "valve-rating",
    ValveSize = "valve-size",
}
