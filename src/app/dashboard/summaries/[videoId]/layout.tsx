
const SummarySingleRoute = async ({
    params,
    children,
}: {
    readonly params: any;
    readonly children: React.ReactNode;
})  => {
  return (
    <div>
        <div className="h-full grid gap-4 grid-cols-5 p-4">
            <div className="col-span-3">{children}</div>
            <div className="col-span-2">
                <div>
                    <p>
                        Video will go here
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SummarySingleRoute