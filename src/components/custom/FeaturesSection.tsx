import { CheckIcon, ClockIcon, CloudIcon } from 'lucide-react'
import React from 'react'

const FeaturesSection = () => {
  return (
    <div>
        <div className="flex-1">
            <section className="container px-4 py-6 mx-auto md:px-6 lg:py-24">
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                        <ClockIcon className='w-12 h-12 mb-4 text-gray-900'/>
                        <h2 className='mb-4 text-2xl font-bold'>Save Time</h2>
                        <p className="text-gray-500">
                            No need to watch the entire video. Get the summary and save time.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <CheckIcon className='w-12 h-12 mb-4 text-gray-900'/>
                        <h2 className="mb-4 text-2xl font-bold">Accurate Summaries</h2>
                        <p className="text-gray-500">
                            Our AI-powered tool provides accurate summaries of your videos.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <CloudIcon  className='w-12 h-12 mb-4 text-gray-900'/>
                        <h2 className="mb-4 text-2xl font-bold">Cloud Based</h2>
                        <p className="text-gray-500">
                            Access your video summaries from anywhere at any time.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default FeaturesSection