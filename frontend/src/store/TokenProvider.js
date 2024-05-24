import React, { useState } from 'react'
import TokenContext from './TokenContext'


function TokenProvider({children}) {

    const accessToken = localStorage.getItem("accessToken")

    const [token, setToken] = useState(accessToken)

  return (
    <div>
      <TokenContext.Provider value={{token, setToken}}>
        {children}
      </TokenContext.Provider>
    </div>
  )
}

export default TokenProvider
