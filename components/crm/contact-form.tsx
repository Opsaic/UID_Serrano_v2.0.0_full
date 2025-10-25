"use client"

import { FormBuilder, type FormField } from "@/components/ui/form-builder"
import { validators } from "@/lib/utils/form-validators"

interface ContactFormProps {
  initialData?: any
  companies?: Array<{ id: string; name: string }>
  onSubmit: (data: Record<string, any>) => void | Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

export function ContactForm({ initialData, companies = [], onSubmit, onCancel, isLoading }: ContactFormProps) {
  const fields: FormField[] = [
    {
      name: "first_name",
      label: "First Name",
      type: "text",
      required: true,
      placeholder: "John",
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      required: true,
      placeholder: "Doe",
    },
    {
      name: "company_id",
      label: "Company",
      type: "select",
      options: companies.map((c) => ({ label: c.name, value: c.id })),
    },
    {
      name: "title",
      label: "Job Title",
      type: "text",
      placeholder: "Sales Manager",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      placeholder: "john.doe@example.com",
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
      name: "mobile",
      label: "Mobile",
      type: "text",
      placeholder: "+1 (555) 000-0000",
      validation: validators.phone,
    },
    {
      name: "notes",
      label: "Notes",
      type: "textarea",
      placeholder: "Additional information",
    },
  ]

  const fieldsWithDefaults = fields.map((field) => ({
    ...field,
    defaultValue: initialData?.[field.name] ?? field.defaultValue,
  }))

  return <FormBuilder fields={fieldsWithDefaults} onSubmit={onSubmit} onCancel={onCancel} isLoading={isLoading} />
}
