"use client"

import { FormBuilder, type FormField } from "@/components/ui/form-builder"
import { validators } from "@/lib/utils/form-validators"

interface LeadFormProps {
  initialData?: any
  onSubmit: (data: Record<string, any>) => void | Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

const leadFields: FormField[] = [
  {
    name: "contact_name",
    label: "Contact Name",
    type: "text",
    required: true,
    placeholder: "John Doe",
  },
  {
    name: "company_name",
    label: "Company Name",
    type: "text",
    required: true,
    placeholder: "Acme Corp",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "john@acme.com",
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
    name: "source",
    label: "Lead Source",
    type: "select",
    options: [
      { label: "Website", value: "website" },
      { label: "Referral", value: "referral" },
      { label: "Cold Call", value: "cold_call" },
      { label: "Trade Show", value: "trade_show" },
      { label: "Social Media", value: "social_media" },
      { label: "Other", value: "other" },
    ],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "New", value: "new" },
      { label: "Contacted", value: "contacted" },
      { label: "Qualified", value: "qualified" },
      { label: "Unqualified", value: "unqualified" },
    ],
    defaultValue: "new",
  },
  {
    name: "score",
    label: "Lead Score",
    type: "number",
    placeholder: "0-100",
    validation: (value) => {
      if (value < 0 || value > 100) return "Score must be between 0 and 100"
      return null
    },
  },
  {
    name: "estimated_value",
    label: "Estimated Value",
    type: "currency",
    placeholder: "0.00",
  },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    placeholder: "Additional information about this lead",
  },
]

export function LeadForm({ initialData, onSubmit, onCancel, isLoading }: LeadFormProps) {
  const fields = leadFields.map((field) => ({
    ...field,
    defaultValue: initialData?.[field.name] ?? field.defaultValue,
  }))

  return <FormBuilder fields={fields} onSubmit={onSubmit} onCancel={onCancel} isLoading={isLoading} />
}
