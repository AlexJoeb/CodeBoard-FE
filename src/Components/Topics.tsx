import React, { FC, ReactElement } from 'react'
import { Topics as TopicList } from '../utils/vars';

const Topics: FC = (): ReactElement => {

  

  return (
    <ul className='w-full min-h-24 my-6 flex flex-wrap'>
      { TopicList?.length >= 1 && TopicList.map((topic, indx) => <li key={indx} className={`cursor-pointer rounded-lg mr-2 mb-2 py-2 px-4 text-lg font-bold ${topic?.bgcolor ? topic.bgcolor : 'bg-gray-400'} ${topic?.textcolor ? topic.textcolor : 'text-white'}`.trim()}>{topic.title}</li>)}
    </ul>
  )
}
export default Topics;