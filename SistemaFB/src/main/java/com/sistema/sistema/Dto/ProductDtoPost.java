package com.sistema.sistema.Dto;

import com.sistema.sistema.Service.Moneda;
import java.math.BigDecimal;

public class ProductDtoPost {

    private String name;
    private BigDecimal price;
    private Moneda moneda;
    private Boolean controlaStock;
    private Boolean activo;

    public ProductDtoPost(){

    }

    public ProductDtoPost(String name,BigDecimal price, Moneda moneda, Boolean controlaStock,Boolean activo){
        this.name = name;
        this.price = price;
        this.moneda = moneda;
        this.controlaStock = controlaStock;
        this.activo = activo;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
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
}
