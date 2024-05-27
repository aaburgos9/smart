export interface CatalogoData {
  HN?: CatalogoDataHonduras;
  SV?: CatalogoDataSalvador;
  PA?: CatalogoDataPanama;
}

export interface CatalogoDataHonduras {
  PAISES: Dictionary[];
  DEPARTAMENTOS: Dictionary[];
  MUNICIPIOS: Array<{ value_departamento: string; departamento: string; value: string; municipio: string; label: string; }>;
  COLONIAS: Colonia[];
}

export interface CatalogoDataSalvador {
  ESTADO_CIVIL: Dictionary[];
  PAISES: Dictionary[];
  DEPARTAMENTOS: Departamento[];
  MUNICIPIOS: Municipio[];
}

export interface CatalogoDataPanama {
  PAISES: Dictionary[];
  DEPARTAMENTOS: Departamento[];
  MUNICIPIOS: Municipio[];
  DISTRITOS: Distrito[];
}

export interface Dictionary {
  value: string;
  label: string;
}

export interface Departamento {
  value_pais: string;
  label_pais: string;
  value: string;
  label: string;
}
export interface Municipio {
  value_pais: string;
  label_pais: string;
  value_departamento: string;
  label_departamento: string;
  value: string;
  label: string;
  Abreviatura: string;
}

export interface Distrito {
  value_pais: string;
  label_pais: string;
  value: string;
  label: string;
}

export interface Colonia {
  codigo_colonia: string;
  codigo_departamento: string;
  codigo_municipio: string;
  label: string;
  tipo: string;
}
