import type { User } from "@/features/users/user.type";
import { useQueryClient } from "@tanstack/react-query";

const ConfigurationsPage = () => {
    // map delle configurazioni con mio user_id
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<User>(['user']);

    if (!user) {
        return <div>Loading...</div>
    }
    return (
        <div className="mt-20 max-w-7xl mx-auto">
            {
                user?.configurations?.map(() => {
                    return (
                        <div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default ConfigurationsPage
