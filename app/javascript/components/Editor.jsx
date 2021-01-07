import React, { useState } from 'react'
import * as ReactMarkdown from 'react-markdown'

const Editor = () => {
  const [text, setText] = useState()
  return (
    <>
      <div className="left-content">
        <form className="create-message-button">
          <textarea value={ text } onChange={(e) => {setText(e.target.value)}} type="text" placeholder="共有したいメッセージを入力" className="input-message-area" />
        </form>
        <div className="preview">
          <ReactMarkdown source={text} />
        </div>
      </div>
    </>
  )
}

export default Editor

