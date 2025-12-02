package com.ecommerce.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDTO {

    @NotBlank(message = "Product name required")
    private String productName;

    @NotBlank(message = "Product description required")
    private String productDescription;

    @Positive(message = "Price must be positive")
    private double productPrice;

    @PositiveOrZero(message = "Stock must be positive")
    private int stock;

    @NotBlank(message = "Image URL required")
    private String productImageUrl;

    @NotNull(message = "Category ID required")
    private Long categoryId;
}
