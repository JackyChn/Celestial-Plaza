import { addToCart, AddToCartValues, getCart } from "@/app/wix-api/cart";
import { wixBrowserClient } from "@/lib/wix-client-browser";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { currentCart } from "@wix/ecom";
import { useToast } from "./use-toast";

const queryKey: QueryKey = ["cart"];

export function useCart(initialData: currentCart.Cart | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKey,
    queryFn: () => getCart(wixBrowserClient),
  });

  return { data, isLoading, error };
}

export function useAddItemToCart() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: addItem, status } = useMutation({
    mutationFn: (values: AddToCartValues) =>
      addToCart(wixBrowserClient, values),
    onSuccess: (data) => {
      toast({ description: "Added to cart, go check!" });
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
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
