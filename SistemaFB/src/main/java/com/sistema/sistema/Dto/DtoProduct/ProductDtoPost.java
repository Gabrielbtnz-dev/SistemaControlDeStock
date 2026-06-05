package com.sistema.sistema.Dto.DtoProduct;

import com.sistema.sistema.Service.Enum.Moneda;
import java.math.BigDecimal;

public class ProductDtoPost {

    private String name;
    private BigDecimal price;
    private Moneda moneda;
    private Boolean controlaStock;
    private Boolean activo;
    private String codigoDeBarras;


    public ProductDtoPost(){

    }

    public ProductDtoPost(String name, BigDecimal price, Moneda moneda, Boolean controlaStock, Boolean activo, String codigoDeBarras){
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
