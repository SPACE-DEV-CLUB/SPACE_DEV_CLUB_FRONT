import React, { RefObject } from "react"
import { Editor } from "@toast-ui/react-editor"

interface WrappedEditorProps {
  forwardedRef: RefObject<Editor>
}

const WrappedEditor = (props: WrappedEditorProps) => {
  const { forwardedRef } = props

  return <Editor {...props} ref={forwardedRef} usageStatistics={false} />
}

export default WrappedEditor
