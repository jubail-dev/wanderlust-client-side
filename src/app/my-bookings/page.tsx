import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyBookingsPage = async() => {

    const session = await auth.api.getSession({
        headers : await headers()
    })
    const user = session?.user

    console.log(user);


    return (
        <div>
            MyBookingsPage
        </div>
    );
};

export default MyBookingsPage;