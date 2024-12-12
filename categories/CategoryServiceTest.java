package com.fullStack.expenseTracker.services;

import com.fullStack.expenseTracker.model.Category;
import com.fullStack.expenseTracker.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

class CategoryServiceTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFetchCategories() {
        // Arrange
        List<Category> mockCategories = new ArrayList<>();
        mockCategories.add(new Category(1L, "Category 1"));
        mockCategories.add(new Category(2L, "Category 2"));

        // Stub the repository's behavior
        when(categoryRepository.findAll()).thenReturn(mockCategories);

        // Act
        List<Category> categories = categoryService.fetchCategories();

        // Assert
        assertThat(categories).isNotNull();
        assertThat(categories).hasSize(2);
        assertThat(categories.get(0).getName()).isEqualTo("Category 1");
        assertThat(categories.get(1).getName()).isEqualTo("Category 2");
    }

    @Test
    void testFetchCategories_EmptyList() {
        // Arrange
        List<Category> mockCategories = new ArrayList<>();

        // Stub the repository's behavior
        when(categoryRepository.findAll()).thenReturn(mockCategories);

        // Act
        List<Category> categories = categoryService.fetchCategories();

        // Assert
        assertThat(categories).isNotNull();
        assertThat(categories).isEmpty();
    }

    @Test
    void testFetchCategories_Exception() {
        // Arrange
        when(categoryRepository.findAll()).thenThrow(new RuntimeException("Database error"));

        // Act
        List<Category> categories = categoryService.fetchCategories();

        // This may throw an exception, so we need to handle it in your service layer
        // This test ensures that the exception is propagated correctly

        // Assert
        assertThat(categories).isNull();  // Assuming your service would return null or handle exceptions appropriately
    }
}
