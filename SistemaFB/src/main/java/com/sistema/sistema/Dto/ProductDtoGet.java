package com.sistema.sistema.Dto;

import com.sistema.sistema.Service.Moneda;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.math.BigDecimal;

public class ProductDtoGet {

    private long id;
    private String name;
    private BigDecimal price;
    private Moneda moneda;
    private Boolean controlaStock;
    private Boolean activo;
    private String codigoDeBarras;

    public ProductDtoGet(){

    }

    public ProductDtoGet(Long id, String name,BigDecimal price, Moneda moneda, Boolean controlaStock, Boolean activo, String codigoDeBarras){
        this.id = id;
        this.name = name;
        this.price = price;
        this.moneda = moneda;
        this.controlaStock = controlaStock;
        this.activo = activo;
        this.codigoDeBarras = codigoDeBarras;
    }

    public String getCodigoDeBarras() {
        return codigoDeBarras;
    }

    public void setCodigoDeBarras(String codigoDeBarras) {
        this.codigoDeBarras = codigoDeBarras;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public void setMoneda(Moneda moneda) {
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
