package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoSales.SalesDto;
import com.sistema.sistema.Dto.DtoSales.SalesDtoGet;
import com.sistema.sistema.Dto.DtoSales.SalesTotalDelMesyMesAnterior;
import com.sistema.sistema.Service.SalesItemService.SalesItemsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class RestControllerSales {

    private final SalesItemsService salesItemsService;


    public RestControllerSales(SalesItemsService salesItemsService) {
        this.salesItemsService = salesItemsService;
    }

    @GetMapping("/ventasporagno")
    public List<Map<String, Object>> getVentasPorAgno(){
        return salesItemsService.getGraficoVentasPorAgno();
    }

    @GetMapping("/sales")
    public List<SalesDtoGet> getSales(){
        return salesItemsService.getSales();
    }

    @GetMapping("/ventasestadistica")
    public SalesTotalDelMesyMesAnterior getResumenMesMesanterior(){
        return salesItemsService.getTotalVentasMesMesAnterior();
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
