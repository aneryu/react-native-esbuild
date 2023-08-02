export interface ExportInfo {
  index: number;
  code: string;
  export_specifiers: string[];
  file_location: string;
}

export interface AdditionalInfo {
  undefined_variables: string[];
}

export interface ImportInfo {
  index: number;
  specifiers: string[];
}
