package com.sistema.sistema.Dto.DtoStock;

import com.sistema.sistema.Domain.Compras.ItemCompras;
import com.sistema.sistema.Domain.Sales.ItemsSales;
import com.sistema.sistema.Domain.Stock.Stock;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.math.BigDecimal;

public class MovimientoDeStockDto {

    private Stock stock;
    private ItemCompras itemCompra;
    private ItemsSales itemsSales;
    private BigDecimal valor;
    private String observacion;
    private BigDecimal cantidad;
    private String tipomovimiento;

    public MovimientoDeStockDto(){

    }

    public MovimientoDeStockDto(Stock stock, ItemCompras itemCompra, ItemsSales itemsSales, BigDecimal valor, String observacion, BigDecimal cantidad, String tipomovimiento) {
        this.stock = stock;
        this.itemCompra = itemCompra;
        this.itemsSales = itemsSales;
        this.valor = valor;
        this.observacion = observacion;
        this.cantidad = cantidad;
        this.tipomovimiento = tipomovimiento;
    }

    public String getTipomovimiento() {
        return tipomovimiento;
    }

    public void setTipomovimiento(String tipomovimiento) {
        this.tipomovimiento = tipomovimiento;
    }

    public ItemsSales getItemsSales() {
        return itemsSales;
    }

    public void setItemsSales(ItemsSales itemsSales) {
        this.itemsSales = itemsSales;
    }

    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }

    public ItemCompras getItemCompra() {
        return itemCompra;
    }

    public void setItemCompra(ItemCompras itemCompra) {
        this.itemCompra = itemCompra;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }
}
