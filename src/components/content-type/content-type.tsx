import React from 'react'
import { ContentTypeProps } from 'types'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Form from 'components/ui/Form'
import Input from 'components/ui/Input'
import Button from 'components/ui/Button'
import AddField from './add-field'
import Modal from 'components/ui/Modal'
import SelectorIcon from 'components/icons/selector'
import PencilIcon from 'components/icons/pencil'
import TrashIcon from 'components/icons/trash'

const ContentType: React.FC<ContentTypeProps> = (props): JSX.Element => {
  const {
    contentType,
    setContentType,
    onSave,
    onEdit,
    onDelete,
    edit,
    setEdit,
    show,
    setShow,
    initialField,
    field,
    setField,
  } = props

  const onChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    if (edit && key === 'name') return null
    setContentType(() => ({
      ...contentType,
      [key]: value,
    }))
  }

  // reorder after drag and drop
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  // drag and drop style
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles
    userSelect: 'none',
    // change colour if dragging
    background: isDragging ? '#5046e4' : 'white',
    color: isDragging ? 'white' : 'black',
    // styles we need to apply on draggables
    ...draggableStyle,
  })

  // after dragging
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const _fields = reorder(
      contentType.fields,
      result.source.index,
      result.destination.index
    )

    setContentType(() => {
      const newContentType = { ...contentType }
      newContentType.fields = _fields
      return newContentType
    })
    //setItems(_items)
  }

  return (
    <>
      <Form onSubmit={onSave} h1="Content Type">
        <Input
          name="name"
          type="text"
          label="Name"
          value={contentType.name}
          onChange={onChange}
          className="w-full"
        />
        <Input
          name="singular"
          type="text"
          label="Singular"
          value={contentType.singular}
          onChange={onChange}
          className="w-full"
        />
        <Input
          name="plural"
          type="text"
          label="Plural"
          value={contentType.plural}
          onChange={onChange}
          className="w-full"
        />

        <div className="flex">
          <Input
            name="menu"
            type="checkbox"
            label="Menu"
            checked={contentType.menu}
            onChange={onChange}
          />
          <Input
            name="create"
            type="checkbox"
            label="Create"
            checked={contentType.create}
            onChange={onChange}
          />
          <Input
            name="read"
            type="checkbox"
            label="Read"
            checked={contentType.read}
            onChange={onChange}
          />
          <Input
            name="update"
            type="checkbox"
            label="Update"
            checked={contentType.update}
            onChange={onChange}
          />
          <Input
            name="delete"
            type="checkbox"
            label="Delete"
            checked={contentType.delete}
            onChange={onChange}
          />
        </div>

        <h2 className="block col-span-12 text-xl my-4">Fields:</h2>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="block col-span-12 overflow-hidden"
              >
                {contentType.fields &&
                  contentType.fields.map((item, index) => (
                    <Draggable
                      key={item.name}
                      draggableId={item.name}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="font-semibold border-2 border-gray-100 rounded-lg my-1 py-2 px-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            id={item.name}
                            key={item.name}
                            className="flex justify-between items-center"
                          >
                            <span>
                              <button data-name={item.name}>
                                <SelectorIcon className="w-4 hover:cursor-move" />
                              </button>
                            </span>

                            <span className="flex">
                              {item.name}
                              <button
                                data-name={item.name}
                                onClick={(e) => onEdit(e, item.name)}
                              >
                                <PencilIcon className="ml-4 w-4" />
                              </button>
                            </span>

                            <span className="flex justify-between">
                              <button
                                data-name={item.name}
                                onClick={(e) => onDelete(e, item.name)}
                              >
                                <TrashIcon className="w-4 block" />
                              </button>
                            </span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Button
          type="button"
          variant="white"
          className="my-4"
          onClick={(e) => {
            setField(initialField)
            setEdit(false)
            setShow(true)
          }}
        >
          Add Field...
        </Button>

        <Button type="submit" variant="primary" className="w-full my-4">
          Save
        </Button>
      </Form>

      <Modal show={show} setShow={setShow} className="">
        <AddField
          edit={edit}
          field={field}
          contentTypeId={contentType.name}
          contentType={contentType}
          setContentType={setContentType}
          show={show}
          setShow={setShow}
          onSave={onSave}
        />
      </Modal>
    </>
  )
}

export default ContentType
