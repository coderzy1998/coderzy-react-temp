import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Loading: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}><Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></div>
  )
}

export default Loading