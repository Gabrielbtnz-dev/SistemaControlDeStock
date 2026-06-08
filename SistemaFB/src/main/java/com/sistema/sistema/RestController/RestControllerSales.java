package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoSales.SalesDto;
import com.sistema.sistema.Dto.DtoSales.SalesDtoGet;
import com.sistema.sistema.Dto.DtoSales.SalesTotalDelMesyMesAnterior;
import com.sistema.sistema.Service.SalesItemService.SalesItemsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class RestControllerSales {

    private final SalesItemsService salesItemsService;


    public RestControllerSales(SalesItemsService salesItemsService) {
        this.salesItemsService = salesItemsService;
    }

    @PreAuthorize("hasAuthority('Dashboard ventas')")
    @GetMapping("/ventasporagno")
    public List<Map<String, Object>> getVentasPorAgno(){
        return salesItemsService.getGraficoVentasPorAgno();
    }

    @PreAuthorize("hasAuthority('Ver todas las ventas)")
    @GetMapping("/sales")
    public List<SalesDtoGet> getSales(){
        return salesItemsService.getSales();
    }

    @PreAuthorize("hasAuthority('Dashboard estadisticas de venta')")
    @GetMapping("/ventasestadistica")
    public SalesTotalDelMesyMesAnterior getResumenMesMesanterior(){
        return salesItemsService.getTotalVentasMesMesAnterior();
    }

    @PreAuthorize("hasAuthority('Crear nueva venta')")
    @PostMapping("/addSales")
    public ResponseEntity<?> addSales(@RequestBody SalesDto sales) {
        return salesItemsService.addSales(sales);
    }

    @PreAuthorize("hasAuthority('Eliminar ventas')")
    @DeleteMapping("/deletesales/{id}")
    public ResponseEntity<?> deleteSales(@PathVariable Long id){
        return salesItemsService.deleteSales(id);
    }
}
