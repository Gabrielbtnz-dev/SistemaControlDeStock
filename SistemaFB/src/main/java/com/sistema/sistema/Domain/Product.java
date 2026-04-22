package com.sistema.sistema.Domain;

import com.sistema.sistema.Service.Moneda;
import jakarta.persistence.*;

import java.math.BigDecimal;
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private BigDecimal price;
    @Enumerated(EnumType.STRING)
    private Moneda moneda;
    @Column(name = "controla_stock")
    private Boolean controlaStock;
    private Boolean activo;
    @Column(name = "codigo_de_barras")
    private String codigoDeBarras;

    public Product(){

    }

    public Product(String name,BigDecimal price, Moneda moneda, Boolean controlaStock, Boolean activo,String codigoDeBarras){
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }

    public Boolean getControlaStock() {
        return controlaStock;
    }

    public void setControlaStock(Boolean controlaStock) {
        this.controlaStock = controlaStock;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}
