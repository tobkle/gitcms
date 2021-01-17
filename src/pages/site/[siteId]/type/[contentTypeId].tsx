import React from 'react'
import { useRouter } from 'next/router'
import { useSite } from 'hooks/use-site'
import Header from 'components/header'
import { get } from 'lib/fetch'
import { URL_CONTENT_TYPE } from 'config/url'
import { ContentType } from 'components/content-type'
import { ContentTypeType, ContentTypeFields } from 'types'
import { post } from 'lib/fetch'
import { URL_CONTENT_TYPE_DEFINE } from 'config/url'

type ContentTypeFieldsResponse = {
  success: boolean
  data: undefined | ContentTypeType
  message: string | undefined
}

interface ContentTypeResponse {
  success: boolean
  message: string | undefined
  data: ContentTypeType | undefined
}

const initialField: ContentTypeFields = {
  name: '',
  label: '',
  widget: 'text',
  placeholder: 'text',
  default: '',
  required: false,
}

const initialContent = {
  siteId: 0,
  name: '',
  plural: '',
  singular: '',
  menu: true,
  create: true,
  read: true,
  update: true,
  delete: true,
  fields: [],
}

const ContentTypeForId: React.FC = (): JSX.Element => {
  // get the current route query parameters
  const router = useRouter()
  // get the current website we are defining content types for
  const { site } = useSite()
  // edit = true, if we edit an existing field, false if we add a new field
  const [edit, setEdit] = React.useState<boolean>(false)
  // current field we are working on
  const [field, setField] = React.useState<ContentTypeFields>(initialField)
  // the current content type id
  const [contentTypeId, setContentTypeId] = React.useState<string | string[]>(
    ''
  )
  // the complete current content type definition
  const [contentType, setContentType] = React.useState<ContentTypeType>(
    initialContent
  )
  // show/hide the Field Modal Window
  const [showModal, setShowModal] = React.useState<boolean>(false)

  React.useEffect(() => {
    const getContentType = async (
      siteId: number,
      contentTypeId: string | string[]
    ): Promise<void> => {
      try {
        // reading the content type from github using siteId and contentTypeId
        const response: ContentTypeFieldsResponse = await get(
          `${URL_CONTENT_TYPE}?siteId=${siteId}&contentTypeId=${contentTypeId}`
        )
        if (response?.data) {
          setContentType((_contentType) => ({
            ..._contentType,
            ...response.data,
            siteId: Number(siteId),
            name: contentTypeId.toString(),
            singular: contentTypeId.toString(),
            plural: contentTypeId.toString(),
          }))
        }
      } catch (error) {
        console.error(error.message)
      }
    }
    // get the current router query parameters, waiting for the query params
    if (!contentType.name && router.asPath !== router.route) {
      // now we are able to get the current route query params
      const { siteId, contentTypeId } = router.query
      // now reading the current content type data from github
      setContentTypeId(contentTypeId)
      getContentType(Number(siteId), contentTypeId)
    }
  }, [router, site, contentType])

  // Save the current content type to github using siteId and contentTypeId
  const onSave = async () => {
    try {
      const response = await post<ContentTypeResponse>(
        URL_CONTENT_TYPE_DEFINE,
        contentType
      )
      if (response?.success) {
        console.log('saved content type')
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  // open modal window to edit current field in edit mode
  const onEdit = (e: React.MouseEvent<HTMLButtonElement>, name: string) => {
    e.preventDefault()
    const field = contentType.fields
      .filter((field) => field.name === name)
      .pop()
    if (field) {
      setField(field)
      setEdit(true)
      setShowModal(true)
    }
  }

  // delete the current field
  const onDelete = (e: React.MouseEvent<HTMLButtonElement>, name: string) => {
    e.preventDefault()
    setContentType(() => {
      const newContentType = { ...contentType }
      newContentType.fields = newContentType.fields.filter(
        (field) => field.name !== name
      )
      return newContentType
    })
  }

  // without a site we have no data to show
  if (!site) return null

  return (
    <div>
      <Header />

      <div className="mx-auto max-w-2xl">
        <ContentType
          contentTypeId={contentTypeId}
          contentType={contentType}
          setContentType={setContentType}
          show={showModal}
          setShow={setShowModal}
          edit={edit}
          setEdit={setEdit}
          initialField={initialField}
          field={field}
          setField={setField}
          onSave={onSave}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </div>
  )
}

export default ContentTypeForId
