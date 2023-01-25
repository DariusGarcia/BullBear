import { ColorRing } from 'react-loader-spinner'

import React from 'react'

const Spinner = () => {
  return (
    <div className='w-full flex justify-center items-center'>
      <ColorRing
        visible={true}
        height='80'
        width='80'
        ariaLabel='blocks-loading'
        wrapperStyle={{}}
        wrapperClass='blocks-wrapper'
        colors={['#3eb2ce', '#334155', '#76b4ff', '#1e40af', '#23272f']}
      />
    </div>
  )
}

export default Spinner
