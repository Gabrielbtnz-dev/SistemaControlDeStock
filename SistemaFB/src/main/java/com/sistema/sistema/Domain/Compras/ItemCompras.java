package com.sistema.sistema.Domain.Compras;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sistema.sistema.Domain.Product.Product;
import com.sistema.sistema.Domain.Stock.MovimientoDeStock;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "items_compra")
public class ItemCompras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private BigDecimal precio;
    private BigDecimal valor;
    private BigDecimal cantidad;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_compra")
    private Compra compra;
    @ManyToOne
    @JoinColumn(name = "id_producto")
    private Product product;
    private Boolean activo;
    @OneToMany( mappedBy = "itemCompra")
    private List<MovimientoDeStock> movimientostock;

    public ItemCompras(){

    }

    public ItemCompras(BigDecimal precio, BigDecimal valor, BigDecimal cantidad, Compra compra,Product product, Boolean activo){
        this.compra = compra;
        this.cantidad = cantidad;
        this.valor = valor;
        this.precio = precio;
        this.product = product;
        this.activo = activo;
    }

    public List<MovimientoDeStock> getMovimientostock() {
        return movimientostock;
    }

    public void setMovimientostock(List<MovimientoDeStock> movimientostock) {
        this.movimientostock = movimientostock;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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

    public Compra getCompra() {
        return compra;
    }

    public void setCompra(Compra compra) {
        this.compra = compra;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}
