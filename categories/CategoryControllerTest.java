package com.fullStack.expenseTracker.controllers;

import com.fullStack.expenseTracker.services.CategoryService;
import com.fullStack.expenseTracker.dtos.ApiResponseDto;
import com.fullStack.expenseTracker.dtos.ApiResponseStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class CategoryControllerTest {

    @InjectMocks
    private CategoryController categoryController;

    @Mock
    private CategoryService categoryService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testListCategories() {
        // Arrange
        List<Object> mockCategories = Collections.emptyList();
        when(categoryService.fetchCategories()).thenReturn(mockCategories);
        
        // Act
        ResponseEntity<ApiResponseDto<?>> responseEntity = categoryController.getCategories();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(ApiResponseStatus.SUCCESS, responseEntity.getBody().getStatus());
        assertEquals(mockCategories, responseEntity.getBody().getData());
    }
    
    @Test
    public void testListCategories_UserStory() {
        // Arrange
        List<Object> mockCategories = Collections.singletonList(new Object()); // Example category object
        when(categoryService.fetchCategories()).thenReturn(mockCategories);
        
        // Act
        ResponseEntity<ApiResponseDto<?>> responseEntity = categoryController.getCategories();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(ApiResponseStatus.SUCCESS, responseEntity.getBody().getStatus());
        assertEquals(mockCategories, responseEntity.getBody().getData());
    }
}
