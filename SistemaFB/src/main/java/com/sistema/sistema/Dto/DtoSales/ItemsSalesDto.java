package com.sistema.sistema.Dto.DtoSales;

import com.sistema.sistema.Domain.Product.Product;

import java.math.BigDecimal;

public class ItemsSalesDto {

    private BigDecimal precio;
    private BigDecimal valor;
    private BigDecimal cantidad;
    private Long idProducto;

    public ItemsSalesDto(){

    }

    public ItemsSalesDto(BigDecimal precio, BigDecimal valor, BigDecimal cantidad, Long idProducto){
        this.cantidad = cantidad;
        this.valor = valor;
        this.precio = precio;
        this.idProducto = idProducto;

    }

    public Long getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
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
