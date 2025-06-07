export interface Column {
  field: string;
  header: string;
}

export interface ExportColumn {
  title: string;
  dataKey: string;
}

export interface ApiResponse {
  header: Header;
}

export interface Header {
  success: boolean;
  err_code: string;
  err_msg: string;
  result: any[];
}

export interface District {
  district_key: string;
  district_en: string;
  district_tc: string | null;
  district_sc: string | null;
}

export interface Bank {
  bank_key: string;
  bank_name_en: string;
  bank_name_tc: string | null;
  bank_name_sc: string | null;
}

export interface Branch {
  branch_key: string;
  bank_key?: string;
  bank_name_en: string;
  bank_name_tc: string | null;
  bank_name_sc: string | null;
  district_key?: string;
  district_en: string;
  district_tc: string | null;
  district_sc: string | null;
  branch_name: string;
  address: string;
  service_hours: string;
  latitude: string;
  longitude: string;
  'barrier-free_access': string;
  'barrier-free_access_code': string;
  is_active?: number;
}
