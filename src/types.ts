export const Widgets = [
  { value: 'slug', label: 'slug' },
  { value: 'text', label: 'text' },
  { value: 'editor', label: 'editor' },
  { value: 'boolean', label: 'boolean' },
  { value: 'number', label: 'number' },
  { value: 'color', label: 'color' },
  { value: 'date', label: 'date' },
  { value: 'datetime', label: 'datetime' },
  { value: 'time', label: 'time' },
  { value: 'day', label: 'day' },
  { value: 'week', label: 'week' },
  { value: 'month', label: 'month' },
  { value: 'year', label: 'year' },
  { value: 'radio', label: 'radio' },
  { value: 'checkbox', label: 'checkbox' },
  { value: 'file', label: 'file' },
  { value: 'image', label: 'image' },
  { value: 'tel', label: 'tel' },
  { value: 'email', label: 'email' },
  { value: 'password', label: 'password' },
  { value: 'url', label: 'url' },
  { value: 'search', label: 'search' },
  { value: 'range', label: 'range' },
  { value: 'hidden', label: 'hidden' },
]

type ContentTypeWidget = typeof Widgets[number]['value']
/*
export type ContentTypeWidget =
  | 'slug'
  | 'text'
  | 'editor'
  | 'boolean'
  | 'number'
  | 'color'
  | 'date'
  | 'datetime'
  | 'time'
  | 'day'
  | 'week'
  | 'month'
  | 'year'
  | 'radio'
  | 'checkbox'
  | 'file'
  | 'image'
  | 'tel'
  | 'email'
  | 'password'
  | 'url'
  | 'search'
  | 'range'
  | 'hidden'
*/

export type ContentTypeFields = {
  name: string
  label: string
  widget: ContentTypeWidget
  required: boolean | undefined
  default: any | undefined
  placeholder: string | undefined
}

export type ContentTypeType = {
  siteId: number
  name: string
  singular: string | undefined
  plural: string | undefined
  menu: boolean | undefined
  create: boolean | undefined
  read: boolean | undefined
  update: boolean | undefined
  delete: boolean | undefined
  fields: ContentTypeFields[]
}

export interface ContentTypeProps {
  title?: string
  edit?: boolean
  initialField?: ContentTypeFields
  field?: ContentTypeFields
  setField?: (ContentTypeFields) => void
  setEdit?: (arg0: boolean) => void
  contentTypeId: string | string[]
  contentType: ContentTypeType
  setContentType: (arg0: () => ContentTypeType) => void
  show?: boolean
  setShow?: (arg0: boolean) => void
  onSave?: () => void | undefined
  onEdit?: (event: React.MouseEvent<HTMLButtonElement>, name: string) => void
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>, name: string) => void
}

export interface SVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  // id?: string
  // name?: string
  // onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
