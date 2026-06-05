package com.sistema.sistema.Dto.DtoStock;

import java.math.BigDecimal;

public class AjusteDeStockDtoPost {
    private Long id;
    private BigDecimal cantidad;
    private BigDecimal precio;
    private BigDecimal valor;
    private String tipo;

    public AjusteDeStockDtoPost() {

    }

    public AjusteDeStockDtoPost(BigDecimal cantidad, BigDecimal precio, BigDecimal valor, String tipo) {
        this.cantidad = cantidad;
        this.precio = precio;
        this.valor = valor;
        this.tipo = tipo;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
