import { Label } from "@/components/ui/label";
import { checkInStock, cn } from "@/lib/utils";
import { products } from "@wix/stores";
import React from "react";

interface ProductDetailsProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
}

export default function ProductOptions({
  product,
  selectedOptions,
  setSelectedOptions,
}: ProductDetailsProps) {
  return (
    <div className="space-y-2.5">
      {/* map all options like color and size */}
      {product.productOptions?.map((option) => (
        <fieldset key={option.name} className="space-y-1.5">
          {/* option name: color/size */}
          <legend>
            <Label asChild>
              <span>{option.name}</span>
            </Label>
          </legend>

          {/* map each option's choice like black/brown/blue */}
          <div className="flex flex-wrap items-center gap-1.5">
            {option.choices?.map((choice) => (
              <div key={choice.description}>
                {/* make it a radio button so that customer can click */}
                <input
                  type="radio"
                  id={choice.description}
                  name={option.name}
                  value={choice.description}
                  disabled={
                    !checkInStock(product, {
                      ...selectedOptions,
                      [option.name || ""]: choice.description || "",
                    })
                  }
                  checked={
                    // select the option that passed in by default
                    selectedOptions[option.name || "name"] ===
                    choice.description
                  }
                  onChange={() =>
                    setSelectedOptions({
                      ...selectedOptions,
                      // then call the parent to change the selected radio if customer choose a different one
                      [option.name || ""]: choice.description || "",
                    })
                  }
                  className="peer hidden"
                />
                {/* what shown on the radio button: color and choice name */}
                <Label
                  htmlFor={choice.description}
                  className={cn(
                    "min-2-14 flex cursor-pointer items-center justify-center gap-1.5 border p-2 peer-checked:border-primary",
                    !checkInStock(product, {
                      ...selectedOptions,
                      [option.name || ""]: choice.description || "",
                    }) && "opacity-0",
                  )}
                >
                  {option.optionType === products.OptionType.color && (
                    // the radio round button
                    <span
                      className="size-4 rounded-full border"
                      style={{ backgroundColor: choice.value }}
                    />
                  )}
                  {choice.description}
                </Label>
              </div>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
