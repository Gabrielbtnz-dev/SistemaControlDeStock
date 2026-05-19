package com.sistema.sistema.Dto.DtoMethodOfPaymed;

import com.sistema.sistema.Service.Moneda;

import java.math.BigDecimal;

public class CajasDto {

    private Long id;
    private String name;
    private Moneda moneda;
    private BigDecimal saldo;
    private Boolean activo;

    public CajasDto(){

    }

    public CajasDto(Long id, String name, Moneda moneda, BigDecimal saldo, Boolean activo){
        this.id = id;
        this.name = name;
        this.moneda = moneda;
        this.saldo = saldo;
        this.activo = activo;

    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
