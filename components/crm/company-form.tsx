"use client"

import { FormBuilder, type FormField } from "@/components/ui/form-builder"
import { validators } from "@/lib/utils/form-validators"

interface CompanyFormProps {
  initialData?: any
  onSubmit: (data: Record<string, any>) => void | Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

const companyFields: FormField[] = [
  {
    name: "name",
    label: "Company Name",
    type: "text",
    required: true,
    placeholder: "Enter company name",
  },
  {
    name: "industry",
    label: "Industry",
    type: "select",
    options: [
      { label: "Technology", value: "technology" },
      { label: "Manufacturing", value: "manufacturing" },
      { label: "Construction", value: "construction" },
      { label: "Retail", value: "retail" },
      { label: "Healthcare", value: "healthcare" },
      { label: "Finance", value: "finance" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "market_vertical",
    label: "Market Vertical",
    type: "select",
    options: [
      { label: "Commercial Construction", value: "Commercial Construction" },
      { label: "Residential Development", value: "Residential Development" },
      { label: "Industrial Manufacturing", value: "Industrial Manufacturing" },
      { label: "Healthcare Facilities", value: "Healthcare Facilities" },
      { label: "Education Institutions", value: "Education Institutions" },
      { label: "Hospitality", value: "Hospitality" },
      { label: "Government & Municipal", value: "Government & Municipal" },
    ],
  },
  {
    name: "account_type",
    label: "Account Type",
    type: "select",
    options: [
      { label: "Standard", value: "standard" },
      { label: "Key Account", value: "key_account" },
      { label: "Strategic Partner", value: "strategic_partner" },
      { label: "Distributor", value: "distributor" },
    ],
    defaultValue: "standard",
  },
  {
    name: "territory",
    label: "Territory",
    type: "select",
    options: [
      { label: "Northeast", value: "Northeast" },
      { label: "Southeast", value: "Southeast" },
      { label: "Midwest", value: "Midwest" },
      { label: "Southwest", value: "Southwest" },
      { label: "West Coast", value: "West Coast" },
      { label: "National", value: "National" },
    ],
    defaultValue: "National",
  },
  {
    name: "preferred_pricing_tier",
    label: "Pricing Tier",
    type: "select",
    options: [
      { label: "Standard", value: "Standard" },
      { label: "Preferred", value: "Preferred" },
      { label: "Premium", value: "Premium" },
      { label: "Enterprise", value: "Enterprise" },
      { label: "Government", value: "Government" },
    ],
    defaultValue: "Standard",
  },
  {
    name: "annual_revenue",
    label: "Annual Revenue",
    type: "number",
    placeholder: "0.00",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "company@example.com",
    validation: validators.email,
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "+1 (555) 000-0000",
    validation: validators.phone,
  },
  {
    name: "website",
    label: "Website",
    type: "text",
    placeholder: "https://example.com",
    validation: validators.url,
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    placeholder: "Enter company address",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Prospect", value: "prospect" },
    ],
    defaultValue: "active",
  },
]

export function CompanyForm({ initialData, onSubmit, onCancel, isLoading }: CompanyFormProps) {
  const fields = companyFields.map((field) => ({
    ...field,
    defaultValue: initialData?.[field.name] ?? field.defaultValue,
  }))

  return <FormBuilder fields={fields} onSubmit={onSubmit} onCancel={onCancel} isLoading={isLoading} />
}
