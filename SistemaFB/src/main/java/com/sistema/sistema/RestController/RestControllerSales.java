package com.sistema.sistema.RestController;

import com.sistema.sistema.Domain.Sales.Sales;
import com.sistema.sistema.Dto.DtoSales.SalesDto;
import com.sistema.sistema.Service.SalesItemsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerSales {

    private final SalesItemsService salesItemsService;

    public RestControllerSales(SalesItemsService salesItemsService) {
        this.salesItemsService = salesItemsService;
    }

    @PostMapping("/addSales")
    public ResponseEntity<?> addSales(@RequestBody SalesDto sales) {
        return salesItemsService.addSales(sales);
    }
}
