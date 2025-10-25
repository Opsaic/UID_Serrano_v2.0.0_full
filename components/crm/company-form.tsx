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
