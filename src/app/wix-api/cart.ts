import { getWixClient } from "@/lib/wix-client.base";

export async function getCart() {
  const wixClient = getWixClient();

  try {
    // no prarms, directly get the whole cart
    return await wixClient.currentCart.getCurrentCart();
  } catch (error) {
    // no cart found
    if ((error as any).details.applicationError.code === "OWNED_CART_NOT_FOUND")
      return null;
    else {
      throw error;
    }
  }
}
