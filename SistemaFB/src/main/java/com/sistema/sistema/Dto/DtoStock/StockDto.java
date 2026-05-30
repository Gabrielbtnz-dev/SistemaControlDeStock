package com.sistema.sistema.Dto.DtoStock;

import com.sistema.sistema.Domain.Product.Product;
import com.sistema.sistema.Domain.Stock.MovimientoDeStock;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

public class StockDto {

    private BigDecimal cantidad;
    private BigDecimal valor;
    private BigDecimal precio;
    private Product product;
    private List<MovimientoDeStock> movimientos;

    public StockDto(){

    }

    public StockDto(BigDecimal cantidad, BigDecimal valor, BigDecimal precio, Product product, List<MovimientoDeStock> movimientos){
        this.cantidad = cantidad;
        this.valor = valor;
        this.precio = precio;
        this.product = product;
        this.movimientos = movimientos;
    }

    public List<MovimientoDeStock> getMovimientos() {
        return movimientos;
    }

    public void setMovimientos(List<MovimientoDeStock> movimientos) {
        this.movimientos = movimientos;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }
}
