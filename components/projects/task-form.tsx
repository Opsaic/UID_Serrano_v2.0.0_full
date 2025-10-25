"use client"

import { FormBuilder, type FormField } from "@/components/ui/form-builder"

interface TaskFormProps {
  initialData?: any
  projects?: Array<{ id: string; name: string }>
  assignees?: Array<{ id: string; full_name: string }>
  onSubmit: (data: Record<string, any>) => void | Promise<void>
  onCancel?: () => void
  isLoading?: boolean
}

export function TaskForm({ initialData, projects = [], assignees = [], onSubmit, onCancel, isLoading }: TaskFormProps) {
  const fields: FormField[] = [
    {
      name: "name",
      label: "Task Name",
      type: "text",
      required: true,
      placeholder: "Enter task name",
    },
    {
      name: "project_id",
      label: "Project",
      type: "select",
      required: true,
      options: projects.map((p) => ({ label: p.name, value: p.id })),
    },
    {
      name: "assigned_to",
      label: "Assign To",
      type: "select",
      options: assignees.map((a) => ({ label: a.full_name, value: a.id })),
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Describe the task",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { label: "To Do", value: "todo" },
        { label: "In Progress", value: "in_progress" },
        { label: "In Review", value: "in_review" },
        { label: "Completed", value: "completed" },
        { label: "Blocked", value: "blocked" },
      ],
      defaultValue: "todo",
    },
    {
      name: "priority",
      label: "Priority",
      type: "select",
      required: true,
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
        { label: "Urgent", value: "urgent" },
      ],
      defaultValue: "medium",
    },
    {
      name: "due_date",
      label: "Due Date",
      type: "date",
    },
    {
      name: "estimated_hours",
      label: "Estimated Hours",
      type: "number",
      placeholder: "0",
    },
  ]

  const fieldsWithDefaults = fields.map((field) => ({
    ...field,
    defaultValue: initialData?.[field.name] ?? field.defaultValue,
  }))

  return <FormBuilder fields={fieldsWithDefaults} onSubmit={onSubmit} onCancel={onCancel} isLoading={isLoading} />
}
