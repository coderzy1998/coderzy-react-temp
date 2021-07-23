import React, { FC, useState } from 'react'
import { ConfigProvider } from 'antd'
import { Provider, observer } from 'mobx-react'

import Store from './store'
import Pages from './Pages'

const App: FC = () => {
  const [store] = useState(new Store())

  return (
    <Provider appStore={store}>
      <React.StrictMode>
        <ConfigProvider>
          <Pages />
        </ConfigProvider>
      </React.StrictMode>
    </Provider>
  )
}

export default observer(App)