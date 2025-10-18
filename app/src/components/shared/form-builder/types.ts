export interface FormStructure {
  title?: string
  description?: string
  orientation?: 'vertical' | 'horizontal'
  includeHeader?: boolean
  fieldsets: Fieldset[]
}

export interface Fieldset {
  title?: string
  description?: string
  includeHeader?: boolean
  rows: FieldsetRow[]
}

export interface FieldsetRow {
  className?: string
  fields: Field[]
}

export enum FieldVariant {
  TEXT = 'text',
  EMAIL = 'email',
  TEL = 'tel',
  NUMBER = 'number',
  URL = 'url',
  PASSWORD = 'password',
  DATE = 'date',
  SELECT = 'select',
  MULTI_SELECT = 'multi_select',
  CHECKBOX = 'checkbox',
  CHECK = 'check',
  RADIO = 'radio',
  SWITCH = 'switch',
  TEXTAREA = 'textarea',
  IMAGE = 'image',
  IMAGE_GALLERY = 'image_gallery',
  FILE = 'file',
  EMPTY = 'empty',
  CUSTOM = 'custom',
}

export interface Field<T = any> {
  id: string
  label?: string
  className?: string
  wrapperClassName?: string
  variant: FieldVariant
  required?: boolean
  description?: string
  placeholder?: string
  hidden?: boolean
  error?: string
  props?: T
}

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface EmailFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface TelFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface UrlFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface NumberFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// export interface DateFieldProps extends BaseFieldProps {
//   value?: Date | null
//   onDateChange?: (e: Date | null) => void
//   nullable?: boolean
// }

// export interface SelectOption {
//   label: string
//   value: string | number
// }

// export interface SelectFieldProps extends BaseFieldProps {
//   value?: string | null
//   onValueChange?: (value: string) => void
//   options?: SelectOption[]
// }

// export interface MultiSelectFieldProps extends BaseFieldProps {
//   value?: SelectOption[]
//   onChange?: (value: SelectOption[]) => void
//   options?: SelectOption[]
//   creatable?: boolean
// }

// export interface CheckboxFieldProps extends BaseFieldProps {
//   checked?: boolean
//   defaultChecked?: boolean
//   onCheckedChange?: (e: CheckedState) => void
// }

// export interface SwitchFieldProps extends BaseFieldProps {
//   checked?: boolean
//   defaultChecked?: boolean
//   onCheckedChange?: (e: boolean) => void
// }

export interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resizable?: boolean
}

// export interface ImageFieldProps extends BaseFieldProps {
//   image?: File | null
//   accept?: string
//   progress?: number
//   placeholder?: string
//   fallback?: string
//   onFileChange?: (e: File) => void
//   onUpload?: (file: File, onProgress: (percent: number) => void) => void
// }

// export interface SingleFileFieldProps extends BaseFieldProps {
//   file?: File | null
//   accept?: string
//   progress?: number
//   onFileChange?: (e: File) => void
//   onUpload?: (file: File, onProgress: (percent: number) => void) => void
// }

// export interface ImageGalleryFieldProps extends BaseFieldProps {
//   images: ImageFile[]
//   onFilesChange?: (e: ImageFile[]) => void
//   onUpload?: (file: File, onProgress: (percent: number) => void) => void
// }

// export interface ImageFile {
//   id: string
//   image?: File | null
//   url?: string
//   name: string
//   progress: number
// }

export interface CustomFieldProps {
  className?: string
  children: React.ReactNode
}

export interface EmptyFieldProps {}
