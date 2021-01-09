import React from 'react'
import cn from 'classnames'
import { theme } from './../../../../tailwind.config'
const { colors } = theme

/* TODO: Don't know how to get a new type out of an Array of string literals
const twColors = Object.keys(colors) as const
type Colors = typeof twColors
*/

export interface SwatchProps {
  // color?:
  //   | 'black'
  //   | 'white'
  //   | 'rose'
  //   | 'pink'
  //   | 'fuchsia'
  //   | 'purple'
  //   | 'violet'
  //   | 'indigo'
  //   | 'blue'
  //   | 'lightBlue'
  //   | 'cyan'
  //   | 'teal'
  //   | 'emerald'
  //   | 'green'
  //   | 'lime'
  //   | 'yellow'
  //   | 'amber'
  //   | 'orange'
  //   | 'red'
  //   | 'warmGray'
  //   | 'trueGray'
  //   | 'gray'
  //   | 'coolGray'
  //   | 'blueGray'
  // saturation?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  className?: string
}

const Swatch: React.FC<SwatchProps> = ({
  // color = 'indigo',
  // saturation = 500,
  className = '',
}) => {
  // console.log(colors, JSON.stringify(Object.keys(colors)).replace(/,/gm, ' | '))
  return (
    <div>
      <table>
        {Object.keys(colors).map((c) => {
          if (typeof colors[c] === 'string') return null
          return (
            <tr key={c} className="w-full">
              <td className="">{c}</td>
              {Object.keys(colors[c]).map((s) => (
                <td
                  className={`p-5 bg-${c}-${s} text-${
                    Number(s) > 499 ? 'white' : 'black'
                  } text-center ${className}`}
                  key={`${c}-${s}`}
                >
                  <>
                    <div>{s}</div>
                    <div>{colors[c][s]}</div>
                  </>
                </td>
              ))}
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default Swatch
