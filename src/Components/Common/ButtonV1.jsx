import React from 'react'

const ButtonV1 = ({ButonV1bg ,ButonV1Text ,ButtonV1Clock}) => {
  return (
    <>
        <button onClick={ButtonV1Clock} className={`py-3 px-8 ${ButonV1bg} font-poppins font-semibold test-[16px] text-[#fff] rounded-lg`}>{ButonV1Text}</button>
    </>
  )
}

export default ButtonV1