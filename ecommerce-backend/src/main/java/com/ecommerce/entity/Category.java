package com.ecommerce.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "category")

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@Builder
public class Category extends BaseEntity {

	@Column(name = "category_name", length = 30)
	private String name;

	@Column(name = "category_description", length = 100)
	private String discription;
	
	@OneToMany(mappedBy = "category")
	private List<Product> products = new ArrayList<>();

}
