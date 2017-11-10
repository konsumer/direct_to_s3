import React from 'react'

import ReactS3Uploader from 'react-s3-uploader'

const onUploadStart = (file, next) => {
  console.log('start', file)
  next(file)
}

const onUploadProgress = info => console.log('progress', info)
const onUploadError = info => console.error('error', info)
const onUploadFinish = info => console.log('finish', info)

export const App = () => (
  <div className='App'>
    <ReactS3Uploader
      signingUrl='/s3/sign'
      preprocess={onUploadStart}
      onProgress={onUploadProgress}
      onError={onUploadError}
      onFinish={onUploadFinish}
      uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
    />
  </div>
)

export default App
