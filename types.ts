
export enum DocumentType {
  TECHNICAL_PROPOSAL = 'Technical Proposal',
  FUNCTIONAL_SPEC = 'Functional Spec (EF)',
  TECHNICAL_SPEC = 'Technical Spec (ET)',
  COMBINED_SPEC = 'Combined Spec (EF+ET)'
}

export enum SAPModule {
  SD = 'SD',
  MM = 'MM',
  FI = 'FI',
  CO = 'CO',
  PP = 'PP',
  PM = 'PM',
  QM = 'QM',
  ABAP = 'ABAP',
  BASIS = 'BASIS',
  EWM = 'EWM',
  TM = 'TM'
}

export interface ProjectDetails {
  title: string;
  client: string;
  type: DocumentType;
  modules: SAPModule[];
  description: string;
  includeAbap: boolean;
  testPlan: boolean;
  effortEstimation: boolean;
  effortBreakdown: boolean;
}

export interface GeneratedDocument {
  id: string;
  content: string;
  timestamp: number;
}
