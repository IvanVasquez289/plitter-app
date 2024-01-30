import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const usePosts = () => {

    const { data, error, isLoading, mutate } = useSWR('/api/posts', fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
}

export default usePosts;