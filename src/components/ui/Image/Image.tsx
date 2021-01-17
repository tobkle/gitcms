import Image from 'next/image'

export interface ImageProps {
  src: string
  layout?: 'fill' | 'responsive' | 'fixed' | 'intrinsic'
  width?: number
  height?: number
}

const Img: React.FC<ImageProps> = (props: ImageProps): JSX.Element => {
  const { src, layout, width, height, ...rest } = props

  let layoutOverwrite = layout
  if (!src) return null

  if (layout !== 'fill' && (!width || !height)) {
    layoutOverwrite = 'fill'
  }

  switch (layoutOverwrite) {
    case 'fill':
      return <Image src={src} layout={layoutOverwrite} {...rest} />

    default:
      return (
        <Image
          src={src}
          layout={layoutOverwrite}
          width={width}
          height={height}
          {...rest}
        />
      )
  }
}

export default Img
