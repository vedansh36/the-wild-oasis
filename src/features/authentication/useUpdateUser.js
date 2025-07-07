import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updataeCurrentUser } from "../../services/apiAuth";
export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updataeCurrentUser,
    onSuccess: ({user}) => {
      toast.success("User account updated successfully");
      queryClient.setQueryData(["user"],user)
    //   queryClient.invalidateQueries({ queryKey: "user" });
    },
    onError: (err) => toast.error(err.message),
  });

  return {updateUser,isUpdating}
}
