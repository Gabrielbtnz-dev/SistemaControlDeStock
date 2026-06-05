package com.sistema.sistema.Dto.DtoProduct;

import com.sistema.sistema.Service.Enum.Moneda;

import java.math.BigDecimal;

public class ProductDtoGet {

    private long id;
    private String name;
    private BigDecimal price;
    private String moneda;
    private Boolean controlaStock;
    private Boolean activo;
    private String codigoDeBarras;
    private BigDecimal valorEnStock;
    private BigDecimal precioStock;
    private BigDecimal cantidad;

    public ProductDtoGet(){

    }

    public ProductDtoGet(Long id, String name, BigDecimal price, String moneda, Boolean controlaStock, Boolean activo, String codigoDeBarras, BigDecimal valorEnStock, BigDecimal precioStock, BigDecimal cantidad){
        this.id = id;
        this.name = name;
        this.price = price;
        this.moneda = moneda;
        this.controlaStock = controlaStock;
        this.activo = activo;
        this.codigoDeBarras = codigoDeBarras;
        this.valorEnStock = valorEnStock;
        this.precioStock = precioStock;
        this.cantidad = cantidad;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }

    public BigDecimal getValorEnStock() {
        return valorEnStock;
    }

    public void setValorEnStock(BigDecimal valorEnStock) {
        this.valorEnStock = valorEnStock;
    }

    public BigDecimal getPrecioStock() {
        return precioStock;
    }

    public void setPrecioStock(BigDecimal precioStock) {
        this.precioStock = precioStock;
    }

    public String getCodigoDeBarras() {
        return codigoDeBarras;
    }

    public void setCodigoDeBarras(String codigoDeBarras) {
        this.codigoDeBarras = codigoDeBarras;
    }

    public String getMoneda() {
        return moneda;
    }

    public void setMoneda(String moneda) {
        this.moneda = moneda;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Boolean getControlaStock() {
        return controlaStock;
    }

    public void setControlaStock(Boolean controlaStock) {
        this.controlaStock = controlaStock;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}
