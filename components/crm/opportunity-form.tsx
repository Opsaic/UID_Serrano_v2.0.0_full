"use client"

import { FormBuilder, type FormField } from "@/components/ui/form-builder"

interface OpportunityFormProps {
  initialData?: any
  companies?: Array<{ id: string; name: string }>
  onSubmit: (data: Record<string, any>) => void | Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

export function OpportunityForm({ initialData, companies = [], onSubmit, onCancel, isLoading }: OpportunityFormProps) {
  const fields: FormField[] = [
    {
      name: "name",
      label: "Opportunity Name",
      type: "text",
      required: true,
      placeholder: "Q1 2025 Project",
    },
    {
      name: "company_id",
      label: "Company",
      type: "select",
      required: true,
      options: companies.map((c) => ({ label: c.name, value: c.id })),
    },
    {
      name: "value",
      label: "Deal Value",
      type: "currency",
      required: true,
      placeholder: "0.00",
    },
    {
      name: "stage",
      label: "Stage",
      type: "select",
      required: true,
      options: [
        { label: "Prospecting", value: "prospecting" },
        { label: "Qualification", value: "qualification" },
        { label: "Proposal", value: "proposal" },
        { label: "Negotiation", value: "negotiation" },
        { label: "Closed Won", value: "closed_won" },
        { label: "Closed Lost", value: "closed_lost" },
      ],
      defaultValue: "prospecting",
    },
    {
      name: "probability",
      label: "Win Probability (%)",
      type: "number",
      required: true,
      placeholder: "0-100",
      validation: (value) => {
        if (value < 0 || value > 100) return "Probability must be between 0 and 100"
        return null
      },
      defaultValue: 50,
    },
    {
      name: "expected_close_date",
      label: "Expected Close Date",
      type: "date",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Describe the opportunity",
    },
  ]

  const fieldsWithDefaults = fields.map((field) => ({
    ...field,
    defaultValue: initialData?.[field.name] ?? field.defaultValue,
  }))

  return <FormBuilder fields={fieldsWithDefaults} onSubmit={onSubmit} onCancel={onCancel} isLoading={isLoading} />
}
