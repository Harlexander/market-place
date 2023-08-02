import { getServerSession } from "next-auth"
import { authOptions } from "./authOptions"

export const userId = async () => {
        const session = await getServerSession(authOptions);

        if(!session) {
                throw Error("Invalid User");
        };

        return session.user.id;
}