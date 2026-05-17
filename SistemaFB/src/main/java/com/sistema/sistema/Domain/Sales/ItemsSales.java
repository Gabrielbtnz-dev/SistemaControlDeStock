package com.sistema.sistema.Domain.Sales;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "items_sales")
public class ItemsSales {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private BigDecimal precio;
    private BigDecimal valor;
    private BigDecimal cantidad;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_venta")
    private Sales sales;

    public ItemsSales(){

    }

    public ItemsSales(BigDecimal precio, BigDecimal valor, BigDecimal cantidad, Sales sales){
        this.sales = sales;
        this.cantidad = cantidad;
        this.valor = valor;
        this.precio = precio;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public Sales getSales() {
        return sales;
    }

    public void setSales(Sales sales) {
        this.sales = sales;
    }
}
