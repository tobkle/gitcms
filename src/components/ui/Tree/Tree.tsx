import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Icon from 'components/ui/Icon'
import Link from 'components/ui/Link'
import { buildTree, toggleStatusTree } from './helpers'
import cn from 'classnames'

export interface Props {
  data: any
}

const Tree: React.FC<Props> = (props: Props): JSX.Element => {
  const { data } = props
  const { All, Index } = data
  const [statusTree, setStatusTree] = useState({})
  const [statusAll, setStatusAll] = useState(false)

  useEffect(() => {
    if (!Index || Object.keys(Index).length === 0) return null
    const value = false
    const treeStatus = buildTree(Index, value)
    setStatusTree(treeStatus)
  }, [Index])

  function toggle(key) {
    const newStatusTree = toggleStatusTree(statusTree, key)
    setStatusTree(newStatusTree)
  }

  function RenderTree({ tree, id }) {
    if (!tree) return null
    return (
      <>
        {Object.keys(tree).map((indice, index) => {
          if (indice === '_open') return null
          if (indice === 'found')
            return tree[indice].map((l, i) => {
              const newKey = i + id
              console.log('key:', newKey)
              return (
                <div key={newKey} className="overflow-hidden ml-2">
                  <Link href={l} label={All[l]} />
                </div>
              )
            })

          return (
            <div key={index + indice}>
              <span
                className="inline-flex"
                id={indice}
                onClick={(e) => toggle(indice)}
              >
                {tree[indice]._open && <IconOpen />}
                {!tree[indice]._open && <IconClose />}
                <span
                  className={cn({
                    'font-semibold': tree[indice]._open,
                  })}
                >
                  {indice.replace(/_/g, ' ')}
                </span>
              </span>
              {tree[indice]._open && (
                <div className="ml-2">
                  <RenderTree tree={tree[indice]} id={id + indice} />
                </div>
              )}
            </div>
          )
        })}
      </>
    )
  }

  return (
    <>
      <h1 className="text-xl font-semibold my-6">Index:</h1>
      <RenderTree tree={statusTree} id="" />
      <RenderAll all={All} statusAll={statusAll} setStatusAll={setStatusAll} />
    </>
  )
}

export default Tree

const IconOpen: React.FC = (): JSX.Element => (
  <Icon className="w-6 h-6" iconname={'ChevronDown'} iconstyle={'solid'} />
)

const IconClose: React.FC = (): JSX.Element => (
  <Icon className="w-6 h-6" iconname={'ChevronRight'} iconstyle={'solid'} />
)

/*
const RenderFound: React.FC = ({ tree, indice, all, id }): JSX.Element => {
  const { asPath } = useRouter()
  // console.log(asPath.split("/").pop())
  return (
    <>
      {tree[indice].map((l, i) => {
        const newKey = uuidv4()
        console.log('key:', newKey)
        return (
          <div key={newKey} className="overflow-hidden ml-2">
            <Link href={l} label={all[l]} />
          </div>
        )
      })}
    </>
  )
}
*/
const RenderAll = ({ all, statusAll, setStatusAll }) => {
  if (!all) return null
  return (
    <>
      <div className="inline-flex" onClick={(e) => setStatusAll(!statusAll)}>
        {statusAll && <IconOpen />}
        {!statusAll && <IconClose />}
        <span className={cn({ 'font-semibold': statusAll })}>All</span>
      </div>
      {statusAll &&
        Object.keys(all).map((l) => (
          <div className="overflow-hidden ml-6" key={l}>
            <Link href={l} label={all[l]} />
          </div>
        ))}
    </>
  )
}
