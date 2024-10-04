export interface RecordResult {
  recordResultId?: number;
  registrationId?: number;
  patientName?: string;
  patientIdentity?: string;
  createDate?: Date
  voucherCode?: string;
  patientId?: number;
  current?: string;
  history?: string;
  diagnose?: string;
  closed: boolean;
  details?: RecordResultDetail[];
  prescriptions?: Prescription[];
}

export interface RecordResultDetail {
  recordResultDetailId?: number;
  serviceId?: number;
  serviceName?: string;
  result?: string;
  fileUrl?: string;
  userId?: number;
}

export interface Prescription {
  prescriptionId?: number;
  recordResultId?: number;
  prescriptionTemplateId?: number;
  itemId?: number;
  name?: string,
  unit?: string,
  description?: string,
  morning?: number,
  lunch?: number,
  afternoon?: number,
  night?: number,
  days?: number,
  remark?: string,
}

export interface PrescriptionTemplate {
  prescriptionTemplateId?: number;
  description?: string,
  detail?: Prescription[],
}
