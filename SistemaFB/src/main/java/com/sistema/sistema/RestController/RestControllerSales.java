package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoSales.SalesDto;
import com.sistema.sistema.Dto.DtoSales.SalesDtoGet;
import com.sistema.sistema.Service.SalesItemService.SalesItemsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RestControllerSales {

    private final SalesItemsService salesItemsService;

    public RestControllerSales(SalesItemsService salesItemsService) {
        this.salesItemsService = salesItemsService;
    }

    @GetMapping("/sales")
    public List<SalesDtoGet> getSales(){
        return salesItemsService.getSales();
    }

    @PostMapping("/addSales")
    public ResponseEntity<?> addSales(@RequestBody SalesDto sales) {
        return salesItemsService.addSales(sales);
    }

    @DeleteMapping("/deletesales/{id}")
    public ResponseEntity<?> deleteSales(@PathVariable Long id){
        return salesItemsService.deleteSales(id);
    }
}
