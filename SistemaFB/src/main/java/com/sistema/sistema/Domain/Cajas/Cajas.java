package com.sistema.sistema.Domain.Cajas;

import com.sistema.sistema.Service.Moneda;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table (name = "cuentascajas")
public class Cajas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @Enumerated(EnumType.STRING)
    private Moneda moneda;
    private BigDecimal saldo;
    private Boolean activo;
    @OneToMany(mappedBy = "caja", cascade = CascadeType.ALL)
    private List<MovimientoDeCaja> movimientosCaja;

    public Cajas(){

    }
 
    public Cajas(String name, Moneda moneda, BigDecimal saldo, Boolean activo){
        this.name = name;
        this.moneda = moneda;
        this.saldo = saldo;
        this.activo = activo;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
