import {
  addToCart,
  AddToCartValues,
  getCart,
  updateCartItemQuantity,
  UpdateCartItemQuantityValues,
} from "@/app/wix-api/cart";
import { wixBrowserClient } from "@/lib/wix-client-browser";
import {
  MutationKey,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { useToast } from "./use-toast";

const queryKey: QueryKey = ["cart"];

// ----------------------------------------------R----------------------------------------------
export function useCart(initialData: currentCart.Cart | null) {
  return useQuery({
    queryKey,
    queryFn: () => getCart(wixBrowserClient),
  });
}

// ---------------------------------------------CUD----------------------------------------------
export function useAddItemToCart() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: addItem, status } = useMutation({
    mutationFn: (values: AddToCartValues) =>
      addToCart(wixBrowserClient, values),
    onSuccess: (data) => {
      toast({ description: "Added to cart, go check!" });
      queryClient.cancelQueries({ queryKey });
      queryClient.setQueryData(queryKey, data.cart);
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Failed to add item to cart, please try again later...",
      });
    },
  });

  return { addItem, status };
}

export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: UpdateCartItemQuantityValues) =>
      updateCartItemQuantity(wixBrowserClient, values),
    onMutate: async ({ productId, newQuantity }) => {
      // Optimistic update (optional)
      await queryClient.cancelQueries({ queryKey });
      const previousState =
        queryClient.getQueryData<currentCart.Cart>(queryKey);

      queryClient.setQueryData<currentCart.Cart>(queryKey, (oldData) => ({
        ...oldData,
        lineItems: oldData?.lineItems?.map((lineItem) =>
          lineItem._id === productId
            ? { ...lineItem, quantity: newQuantity }
            : lineItem,
        ),
      }));

      return { previousState };
    },
    onError: (error, variables, context) => {
      // Rollback to the previous state on error
      queryClient.setQueryData(queryKey, context?.previousState);
      console.error(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    },
    onSettled: () => {
      // Force refetch from the server
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
