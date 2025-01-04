import ProfileForm from "@/components/forms/ProfileForm";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export default async function AccountRoute() {
    const user = await getUserMeLoader();
    const userData = user.data;
    const userImage = userData?.image;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4">
            Account Page
            <ProfileForm data={userData} className="col-span-3"/>
        </div>
    );
}