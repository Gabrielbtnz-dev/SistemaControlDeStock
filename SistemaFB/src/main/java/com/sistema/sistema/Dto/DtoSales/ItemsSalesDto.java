package com.sistema.sistema.Dto.DtoSales;

import java.math.BigDecimal;

public class ItemsSalesDto {

    private BigDecimal precio;
    private BigDecimal valor;
    private BigDecimal cantidad;

    public ItemsSalesDto(){

    }

    public ItemsSalesDto(BigDecimal precio, BigDecimal valor, BigDecimal cantidad){
        this.cantidad = cantidad;
        this.valor = valor;
        this.precio = precio;

    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
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

}
