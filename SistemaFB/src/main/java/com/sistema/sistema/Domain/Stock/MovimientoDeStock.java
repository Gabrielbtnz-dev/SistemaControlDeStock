package com.sistema.sistema.Domain.Stock;


import com.sistema.sistema.Domain.Compras.ItemCompras;
import com.sistema.sistema.Domain.Sales.ItemsSales;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class MovimientoDeStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_stock")
    private Stock stock;

    @ManyToOne
    @JoinColumn(name = "id_itens_compra")
    private ItemCompras itemCompra;

    @ManyToOne
    @JoinColumn(name = "id_itens_venta")
    private ItemsSales itemsSales;

    private BigDecimal valor;
    private String observacion;
    private BigDecimal cantidad;

    public MovimientoDeStock(){

    }

    public MovimientoDeStock(BigDecimal valor, String observacion, BigDecimal cantidad) {
        this.valor = valor;
        this.observacion = observacion;
        this.cantidad = cantidad;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }

    public ItemCompras getItemCompra() {
        return itemCompra;
    }

    public void setItemCompra(ItemCompras itemCompra) {
        this.itemCompra = itemCompra;
    }

    public ItemsSales getItemsSales() {
        return itemsSales;
    }

    public void setItemsSales(ItemsSales itemsSales) {
        this.itemsSales = itemsSales;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public BigDecimal getCantidad() {
        return cantidad;
    }

    public void setCantidad(BigDecimal cantidad) {
        this.cantidad = cantidad;
    }
}
