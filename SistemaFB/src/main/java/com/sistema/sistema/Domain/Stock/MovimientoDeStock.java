package com.sistema.sistema.Domain.Stock;


import com.sistema.sistema.Domain.Compras.ItemCompras;
import com.sistema.sistema.Domain.Sales.ItemsSales;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "movimiento_de_stock")
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
    private String tipomovimiento;
    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public MovimientoDeStock(){

    }

    public MovimientoDeStock(BigDecimal valor, String observacion, BigDecimal cantidad, String tipomovimiento) {
        this.valor = valor;
        this.observacion = observacion;
        this.cantidad = cantidad;
        this.tipomovimiento = tipomovimiento;
    }

    public LocalDateTime getCreated_at() {
        return createdAt;
    }

    public void setCreated_at(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getTipomovimiento() {
        return tipomovimiento;
    }

    public void setTipomovimiento(String tipomovimiento) {
        this.tipomovimiento = tipomovimiento;
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
