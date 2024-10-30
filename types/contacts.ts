export type ContactsResponse = {
  count: number;
  results: Array<ContactType>;
};

export type ContactType = {
  type?: string;
  merged?: null;
  recid?: number;
  customer?: string;
  class_id?: string;
  class_name?: string;
  related?: Array<any>;
  created_by?: string;
  created_by_name?: string;
  approved_estimate_total?: number;
  approved_invoice_total?: number;
  approved_invoice_due?: number;
  last_estimate?: number;
  last_estimate_date_estimate?: number;
  last_estimate_date_created?: number;
  last_estimate_number?: string;
  last_estimate_jnid?: string;
  last_invoice_date_invoice?: number;
  last_invoice_date_created?: number;
  last_invoice_number?: number;
  last_invoice_jnid?: string;
  last_invoice?: number;
  last_budget_gross_profit?: number;
  last_budget_gross_margin?: number;
  last_budget_revenue?: number;
  open_edge_id?: string;
  date_created?: number;
  date_updated?: number;
  date_status_change?: number;
  owners?: [
    {
      id?: string;
    },
  ];
  subcontractors?: Array<any>;
  location?: {
    id?: 1;
  };
  is_active?: boolean;
  is_archived?: boolean;
  first_name?: string;
  display_name?: string;
  last_name?: string;
  company?: string;
  description?: string;
  email?: string;
  home_phone?: string;
  mobile_phone?: string;
  work_phone?: string;
  fax_number?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state_text?: string;
  country_name?: string;
  zip?: string;
  website?: string;
  is_sub_contractor?: boolean;
  record_type?: number;
  record_type_name?: string;
  status?: number;
  status_name?: string;
  source?: string;
  source_name?: string;
  sales_rep?: string;
  sales_rep_name?: string;
  color?: string;
  color_shade?: string;
  fieldassists?: Array<any>;
  is_user?: boolean;
  number?: string;
  tags?: [];
  jnid?: string;
  attachment_count?: number;
  geo?: {
    lat?: number;
    lon?: number;
  };
  task_count?: number;
  date_start?: number;
  date_end?: number;
  external_id?: string;
  cf_date_1?: number;
  cf_date_2?: number;
  cf_boolean_1?: boolean;
  cf_boolean_3?: boolean;
  actual_time?: number;
  estimated_time?: number;
  image_id?: string;
  rules?: Array<any>;
  is_lead?: boolean;
  is_closed?: boolean;
  disable_auto_text?: boolean;
  sunlightStatusAndId?: string;
  sunlightEvents?: string;
  "Project Date"?: number;
  "Estimate Date"?: number;
  "Work Order Completed"?: boolean;
  "Deposit Collected"?: boolean;
};

export enum AllStatusNames {
  INCOMING_ISSUE = "Incoming Issue",
  INCOMING_RESIDENTIAL_RETAIL = "Incoming Residential Retail",
  CUSTOMER_CONTACTED = "Customer Contacted",
  ESTIMATE_SCHEDULED = "Estimate Scheduled",
  ESTIMATE_SENT = "Estimate Sent",
  SOLD = "Sold",
  PROJECT_PLANNING = "Project Planning",
  PRODUCTION_SCHEDULED = "Production Scheduled",
  PRODUCTION_IN_PROCESS = "Production In Process",
  PROJECT_COMPLETED = "Project Completed",
  PRODUCTION_LIMBO = "Production Limbo",
  PENDING_PAYMENTS = "Pending Payments",
  THANK_YOU_EMAIL_REVIEW = "Thank You Email/Review",
  WARRANTY_SUBMITTAL = "Warranty Submittal",
  PAID_AND_CLOSED = "Paid & Closed",
  ACTIVE = "Active",
  ISSUE_RESOLVED = "Issue Resolved",
  PROJECT_LIMBO = "Project Limbo",
  DID_NOT_PAY = "Did Not Pay",
  LOST_RESIDENTIAL_RETAIL = "Lost Residential Retail",
}

export enum RepeatCustomerStatusNames {
  ACTIVE = "Active",
  CUSTOMER_CONTACTED = "Customer Contacted",
  ESTIMATE_SCHEDULED = "Estimate Scheduled",
  ESTIMATE_SENT = "Estimate Sent",
  PROJECT_LIMBO = "Project Limbo",
  SOLD = "Sold",
  PROJECT_PLANNING = "Project Planning",
  PRODUCTION_SCHEDULED = "Production Scheduled",
  PRODUCTION_IN_PROCESS = "Production In Process",
  PROJECT_COMPLETED = "Project Completed",
  PRODUCTION_LIMBO = "Production Limbo",
  PENDING_PAYMENTS = "Pending Payments",
  DID_NOT_PAY = "Did Not Pay",
  THANK_YOU_EMAIL_REVIEW = "Thank You Email/Review",
  WARRANTY_SUBMITTAL = "Warranty Submittal",
  PAID_AND_CLOSED = "Paid & Closed",
}

export enum IssueStatusNames {
  INCOMING_ISSUE = "Incoming Issue",
  PROJECT_PLANNING = "Project Planning",
  PRODUCTION_SCHEDULED = "Production Scheduled",
  PRODUCTION_IN_PROCESS = "Production In Process",
  ISSUE_RESOLVED = "Issue Resolved",
}

export enum OtherStatusNames {
  INCOMING_RESIDENTIAL_RETAIL = "Incoming Residential Retail",
  CUSTOMER_CONTACTED = "Customer Contacted",
  ESTIMATE_SCHEDULED = "Estimate Scheduled",
  ESTIMATE_SENT = "Estimate Sent",
  PRODUCTION_LIMBO = "Production Limbo",
  LOST_RESIDENTIAL_RETAIL = "Lost Residential Retail",
  SOLD = "Sold",
  PROJECT_PLANNING = "Project Planning",
  PRODUCTION_SCHEDULED = "Production Scheduled",
  PRODUCTION_IN_PROCESS = "Production In Process",
  PROJECT_COMPLETED = "Project Completed",
  PROJECT_LIMBO = "Project Limbo",
  PENDING_PAYMENTS = "Pending Payments",
  DID_NOT_PAY = "Did Not Pay",
  THANK_YOU_EMAIL_REVIEW = "Thank You Email/Review",
  WARRANTY_SUBMITTAL = "Warranty Submittal",
  PAID_AND_CLOSED = "Paid & Closed",
}

export enum ContactTypeNames {
  REPEAT_CUSTOMER = "Repeat Customer",
  ISSUE = "Issue",
  SHINGLE_ROOF = "Shingle Roof",
  SMALL_ROOF = "Small Roof",
  SERVICE_AND_REPAIR = "Service & Repair",
  SHINGLE_ROOF_AND_GUTTER = "Shingle Roof & Gutter",
  SHINGLE_ROOF_AND_FLAT_ROOF = "Shingle Roof & Flat Roof",
  FLAT_ROOF = "Flat Roof",
  GUTTER = "Gutter",
  METAL_ROOF = "Metal Roof",
  SIDING_GUTTER_SOFFIT_AND_FASCIA = "Siding, Gutter, Soffit, & Fascia",
  GUTTER_SOFFIT_AND_FASCIA = "Gutter, Soffit, & Fascia",
  SOFFIT_AND_FASCIA = "Soffit, & Fascia",
  SIDING = "Siding",
  SHINGLE_ROOF_GUTTER_SOFFIT_AND_FASCIA = "Shingle Roof, Siding, Gutter, Soffit, & Fascia",
}
