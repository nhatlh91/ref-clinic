export interface Registration {
  registrationId?: number;
  createDate?: Date;
  patientId?: number;
  patientIdentity?: string;
  patientName?: string;
  totalAmount?: number;
  services?: RegistrationDetail[];
}

export interface RegistrationDetail {
  registrationDetailId?: number;
  registrationId?: number;
  serviceId?: number;
  serviceName?: string;
  price?: number;
}
