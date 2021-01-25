import React from 'react'

type Props = {
  children: React.ReactNode
  fallback?: React.ReactNode
  condition: boolean
}

const Conditional: React.FC<Props> = (props) => {
  const { condition, children, fallback = null } = props
  if (condition) return <>{children}</>
  return <>{fallback}</>
}

export default Conditional
