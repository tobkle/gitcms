import React from 'react'
import s from './Form.module.css'

interface FormProps {
  h1?: string
  className?: string
  children?: React.ReactNode
  onSubmit: (...args: any[]) => void
}

const Form: React.FC<FormProps> = (props): JSX.Element => {
  const { h1 = 'Title', className = '', children, onSubmit } = props
  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={onSubmit}>
        <h1 className={s.h1}>{h1}</h1>
        {children}
      </form>
    </div>
  )
}

export default Form
