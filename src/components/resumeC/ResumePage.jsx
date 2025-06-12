import React from 'react'
import { useParams } from 'react-router-dom'

function ResumePage() {
  const params = useParams();
  return (
    <div>ResumePage
      <p>{params.id}</p>
    </div>
  )
}

export default ResumePage