package com.sistema.sistema.Domain.Stock;

import com.sistema.sistema.Domain.Product.Product;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal cantidad;
    private BigDecimal valor;
    private BigDecimal precio;

    @OneToOne
    @JoinColumn(name = "id_product")
    private Product product;

    @OneToMany(mappedBy = "stock")
    private List<MovimientoDeStock> movimientos;

    public Stock(){

    }

    public Stock(BigDecimal cantidad, BigDecimal valor, BigDecimal precio){
        this.cantidad = cantidad;
        this.valor = valor;
        this.precio = precio;
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

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public List<MovimientoDeStock> getMovimientos() {
        return movimientos;
    }

    public void setMovimientos(List<MovimientoDeStock> movimientos) {
        this.movimientos = movimientos;
    }
}
