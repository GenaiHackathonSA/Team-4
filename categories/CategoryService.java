package com.fullStack.expenseTracker.services;

import com.fullStack.expenseTracker.models.Category;
import com.fullStack.expenseTracker.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface CategoryService {
    ResponseEntity<ApiResponseDto<?>> getCategories();
    List<Category> fetchCategories(); // Adding the fetchCategories signature
}

package com.fullStack.expenseTracker.services.impls;

import com.fullStack.expenseTracker.models.Category;
import com.fullStack.expenseTracker.repositories.CategoryRepository;
import com.fullStack.expenseTracker.services.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ResponseEntity<ApiResponseDto<?>> getCategories() {
        return ResponseEntity.ok(
                new ApiResponseDto<>(
                        ApiResponseStatus.SUCCESS,
                        HttpStatus.OK,
                        categoryRepository.findAll()
                )
        );
    }

    @Override
    public List<Category> fetchCategories() { // Implementation of fetchCategories
        try {
            List<Category> categories = categoryRepository.findAll();
            log.info("Fetched categories: {}", categories);
            return categories;
        } catch (Exception e) {
            log.error("Error fetching categories", e);
            throw new RuntimeException("Could not fetch categories, please try again later."); // Robust error handling
        }
    }
}
