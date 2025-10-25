"use client"

import { FormBuilder, type FormField } from "@/components/ui/form-builder"

interface ProjectFormProps {
  initialData?: any
  companies?: Array<{ id: string; name: string }>
  onSubmit: (data: Record<string, any>) => void | Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

export function ProjectForm({ initialData, companies = [], onSubmit, onCancel, isLoading }: ProjectFormProps) {
  const fields: FormField[] = [
    {
      name: "name",
      label: "Project Name",
      type: "text",
      required: true,
      placeholder: "Enter project name",
    },
    {
      name: "company_id",
      label: "Company",
      type: "select",
      required: true,
      options: companies.map((c) => ({ label: c.name, value: c.id })),
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Describe the project scope and objectives",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { label: "Planning", value: "planning" },
        { label: "Active", value: "active" },
        { label: "On Hold", value: "on_hold" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
      ],
      defaultValue: "planning",
    },
    {
      name: "start_date",
      label: "Start Date",
      type: "date",
      required: true,
    },
    {
      name: "end_date",
      label: "End Date",
      type: "date",
      required: true,
    },
    {
      name: "budget",
      label: "Budget",
      type: "currency",
      placeholder: "0.00",
    },
    {
      name: "progress",
      label: "Progress (%)",
      type: "number",
      placeholder: "0-100",
      validation: (value) => {
        if (value < 0 || value > 100) return "Progress must be between 0 and 100"
        return null
      },
      defaultValue: 0,
    },
  ]

  const fieldsWithDefaults = fields.map((field) => ({
    ...field,
    defaultValue: initialData?.[field.name] ?? field.defaultValue,
  }))

  return <FormBuilder fields={fieldsWithDefaults} onSubmit={onSubmit} onCancel={onCancel} isLoading={isLoading} />
}
