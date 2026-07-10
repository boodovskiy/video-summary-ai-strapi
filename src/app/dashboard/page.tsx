import { SummaryForm } from "@/components/forms/SummaryForm"
import { LogoutButton } from "@/components/custom/LogoutButton"
import { getUserMeLoader } from "@/data/services/get-user-me-loader"

export const maxDuration = 60;

const DashboardRoute = async () => {
  const { data: user } = await getUserMeLoader();

  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen bg-gray-100 p-6 dark:bg-gray-900">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold">Create a video summary</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Credits available: {typeof user?.credits === "number" ? user.credits : 0}
          </p>
        </div>
        <SummaryForm />
        <LogoutButton />
    </div>
  )
}

export default DashboardRoute
