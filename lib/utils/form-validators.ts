export const validators = {
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) ? null : "Invalid email address"
  },

  phone: (value: string) => {
    const phoneRegex = /^\+?[\d\s-()]+$/
    return phoneRegex.test(value) ? null : "Invalid phone number"
  },

  url: (value: string) => {
    try {
      new URL(value)
      return null
    } catch {
      return "Invalid URL"
    }
  },

  minLength: (min: number) => (value: string) => {
    return value.length >= min ? null : `Must be at least ${min} characters`
  },

  maxLength: (max: number) => (value: string) => {
    return value.length <= max ? null : `Must be no more than ${max} characters`
  },

  min: (min: number) => (value: number) => {
    return value >= min ? null : `Must be at least ${min}`
  },

  max: (max: number) => (value: number) => {
    return value <= max ? null : `Must be no more than ${max}`
  },

  required: (value: any) => {
    return value ? null : "This field is required"
  },
}
