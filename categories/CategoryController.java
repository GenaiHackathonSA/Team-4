package com.fullStack.expenseTracker.controllers;

import com.fullStack.expenseTracker.dtos.ApiResponseDto;
import com.fullStack.expenseTracker.services.CategoryService;
import com.fullStack.expenseTracker.utils.ApiResponseStatus;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/spendwise/category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/getAll")
    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN"})
    public ResponseEntity<ApiResponseDto<?>> getAllCategories() {
        return categoryService.getCategories();
    }

    // New method for listing categories
    @GetMapping("/list")
    @RolesAllowed({"ROLE_USER", "ROLE_ADMIN"})
    public ResponseEntity<ApiResponseDto<?>> listCategories() {
        try {
            // Fetch categories from the service
            return ResponseEntity.ok(
                new ApiResponseDto<>(
                    ApiResponseStatus.SUCCESS,
                    HttpStatus.OK,
                    categoryService.fetchCategories()
                )
            );
        } catch (Exception e) {
            // Log error and return an appropriate error response
            // (Logging should be implemented properly according to your chosen logging framework)
            // Logger.error("Failed to fetch categories", e); // example of logging the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDto<>(ApiResponseStatus.ERROR, HttpStatus.INTERNAL_SERVER_ERROR, "Unable to fetch categories. Please try again later."));
        }
    }

    // New method for creating a category
    @PostMapping("/create")
    @RolesAllowed({"ROLE_ADMIN"})
    public ResponseEntity<ApiResponseDto<?>> createCategory(@RequestBody CategoryDto categoryDto) {
        try {
            // Validate the input (Here you can add more detailed validations)
            if (categoryDto == null || categoryDto.getName() == null || categoryDto.getName().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponseDto<>(ApiResponseStatus.ERROR, HttpStatus.BAD_REQUEST, "Category name is required."));
            }

            // Call the service to create the category
            categoryService.createCategory(categoryDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponseDto<>(ApiResponseStatus.SUCCESS, HttpStatus.CREATED, "Category created successfully."));
        } catch (Exception e) {
            // Log error and return an appropriate error response
            // Logger.error("Failed to create category", e); // example of logging the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponseDto<>(ApiResponseStatus.ERROR, HttpStatus.INTERNAL_SERVER_ERROR, "Unable to create category. Please try again later."));
        }
    }
}
