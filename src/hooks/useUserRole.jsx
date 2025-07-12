import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useAxiosSecure } from "./useAxiosSecure";

export const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = null,
    isPending: roleLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    enabled: !!user?.email && !authLoading,
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data?.role;
    },
  });

  return {
    role,
    loading: authLoading || roleLoading,
    error,
    isError,
    refetch,
  };
};
