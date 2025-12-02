package com.ecommerce.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "product")

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@Builder
public class Product extends BaseEntity {
	
	@Column(name = "product_name",length = 30)
	private String productName;
	
	@Column(name = "product_description",length = 100)
	private String productDescription;
	
	@Column(name = "product_price")
	private double productPrice;
	
	@Column(name = "product_stock",length = 30)
	private int stock;
	
	@Column(name = "imageUrl")
	private String productImageUrl;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;
}
