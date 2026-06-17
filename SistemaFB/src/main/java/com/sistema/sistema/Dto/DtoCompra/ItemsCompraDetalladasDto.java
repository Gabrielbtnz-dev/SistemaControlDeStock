package com.sistema.sistema.Dto.DtoCompra;

import java.math.BigDecimal;

public class ItemsCompraDetalladasDto {

    private BigDecimal precio;
    private BigDecimal valor;
    private BigDecimal cantidad;
    private Long idProducto;
    private Boolean activo;
    private String nomeProduct;


    public ItemsCompraDetalladasDto(){

    }

    public ItemsCompraDetalladasDto(BigDecimal precio, BigDecimal valor, BigDecimal cantidad, Long idProducto, Boolean activo, String nomeProduct){
        this.cantidad = cantidad;
        this.valor = valor;
        this.precio = precio;
        this.idProducto = idProducto;
        this.activo = activo;

        this.nomeProduct = nomeProduct;
    }

    public String getNomeProduct() {
        return nomeProduct;
    }

    public void setNomeProduct(String nomeProduct) {
        this.nomeProduct = nomeProduct;
    }

    public Long getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Long idProducto) {
        this.idProducto = idProducto;
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

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}
