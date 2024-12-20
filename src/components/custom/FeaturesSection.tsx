import { CheckIcon, ClockIcon, CloudIcon } from 'lucide-react'
import React from 'react'

function getIcon(name: string) {
    switch (name) {
        case "CLOCK_ICON":
            return <ClockIcon className="w-12 h-12 mb-4 text-gray-900" />;
        case "CHECK_ICON":
            return <CheckIcon className="w-12 h-12 mb-4 text-gray-900" />;
        case "CLOUD_ICON":
            return <CloudIcon className="w-12 h-12 mb-4 text-gray-900" />;
    
        default:
            return null;
    }
}


interface FeatureProps {
    id: number;
    heading: string;
    subHeading: string;
    icon: string;
}

interface FeaturesSectionProps {
    id: number;
    __component: string;
    title: string;
    description: string;
    features: FeatureProps[];
}

const FeaturesSection = ({
    data
}: {
    readonly data: FeaturesSectionProps
}) => {
    const { features } = data;
    console.dir(features, {depth: null});

  return (
    <div>
        <div className="flex-1">
            <section className="container px-4 py-6 mx-auto md:px-6 lg:py-24">
                <div className="grid gap-8 md:grid-cols-3">
                    {features.map( (feature) => (
                        <div
                            key={feature.id} 
                            className="flex flex-col items-center text-center"
                        >
                            {getIcon(feature.icon)}
                            <h2 className='mb-4 text-2xl font-bold'>{feature.heading}</h2>
                            <p className="text-gray-500">
                                {feature.subHeading}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    </div>
  )
}

export default FeaturesSection