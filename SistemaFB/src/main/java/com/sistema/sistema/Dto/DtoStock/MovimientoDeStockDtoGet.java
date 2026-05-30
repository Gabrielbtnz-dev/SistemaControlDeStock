package com.sistema.sistema.Dto.DtoStock;

import com.sistema.sistema.Domain.Compras.ItemCompras;
import com.sistema.sistema.Domain.Sales.ItemsSales;
import com.sistema.sistema.Domain.Stock.Stock;
import com.sistema.sistema.Service.Enum.Moneda;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class MovimientoDeStockDtoGet {

    private Long idStock;
    private String nombreProduct;
    private String nombreCliente;
    private BigDecimal valor;
    private String observacion;
    private BigDecimal cantidad;
    private String tipomovimiento;
    private Long idCompra;
    private Long idVenta;
    private Moneda moneda;
    private LocalDateTime createdAt;

    public MovimientoDeStockDtoGet(){

    }

    public MovimientoDeStockDtoGet(Long idStock, String nombreProduct, String nombreCliente, BigDecimal valor, String observacion, BigDecimal cantidad, String tipomovimiento, Long idCompra, Long idVenta, Moneda moneda, LocalDateTime createdAt) {
        this.idStock = idStock;
        this.nombreProduct = nombreProduct;
        this.nombreCliente = nombreCliente;
        this.valor = valor;
        this.observacion = observacion;
        this.cantidad = cantidad;
        this.tipomovimiento = tipomovimiento;
        this.idCompra = idCompra;
        this.idVenta = idVenta;
        this.moneda = moneda;
        this.createdAt = createdAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }

    public Long getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(Long idCompra) {
        this.idCompra = idCompra;
    }

    public Long getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(Long idVenta) {
        this.idVenta = idVenta;
    }

    public Long getIdStock() {
        return idStock;
    }

    public void setIdStock(Long idStock) {
        this.idStock = idStock;
    }

    public String getNombreProduct() {
        return nombreProduct;
    }

    public void setNombreProduct(String nombreProduct) {
        this.nombreProduct = nombreProduct;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
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

    public String getTipomovimiento() {
        return tipomovimiento;
    }

    public void setTipomovimiento(String tipomovimiento) {
        this.tipomovimiento = tipomovimiento;
    }
}
