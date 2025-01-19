interface PraramsProps {
    params: {
        videoId: string;
    }
}

const SummaryCardRoute =async (props: Readonly<PraramsProps>) => {
    const params = await props?.params;
    const {videoId} = params;
  return (
    <p>Summary card with go here: {videoId}</p>
  )
}

export default SummaryCardRoute