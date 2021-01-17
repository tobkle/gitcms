import React from 'react'
import dynamic from 'next/dynamic'

export interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  displayname?: string
  className?: string
  iconname: string
  iconstyle: string
}

// eslint-disable-next-line react/display-name
const Icon = React.forwardRef<HTMLImageElement, IconProps>(
  (props: IconProps, ref: React.ForwardedRef<HTMLImageElement>) => {
    const { displayname = 'icon', iconname, iconstyle, ...rest } = props
    const DynamicIcon = dynamic(
      import(`components/icons/${iconstyle}/${iconname}.tsx`)
    )
    return <DynamicIcon {...rest} />
    // return <DynamicIcon ref={ref} displayname={displayname} {...rest} />
  }
)

export default Icon
