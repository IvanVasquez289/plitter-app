import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useUserPosts = (userId: string) => {
    const { data, error, isLoading, mutate } = useSWR(userId ? `/api/posts/userPosts/${userId}` : null, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default useUserPosts;