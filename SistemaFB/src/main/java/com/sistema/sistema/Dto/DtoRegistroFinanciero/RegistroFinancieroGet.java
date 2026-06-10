package com.sistema.sistema.Dto.DtoRegistroFinanciero;

import java.math.BigDecimal;
import java.util.Date;

public class RegistroFinancieroGet {
    private Long id;
    private Boolean contado;
    private Date fechaEmision;
    private String moneda;
    private String observacion;
    private String tipo;
    private BigDecimal valor;
    private String nombrePersona;

    public RegistroFinancieroGet(){

    }

    public RegistroFinancieroGet(Long id, Boolean contado, Date fechaEmision, String moneda, String observacion, String tipo, BigDecimal valor, String nombrePersona) {
        this.id = id;
        this.contado = contado;
        this.fechaEmision = fechaEmision;
        this.moneda = moneda;
        this.observacion = observacion;
        this.tipo = tipo;
        this.valor = valor;
        this.nombrePersona = nombrePersona;
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

    public Boolean getContado() {
        return contado;
    }

    public void setContado(Boolean contado) {
        this.contado = contado;
    }

    public Date getFechaEmision() {
        return fechaEmision;
    }

    public void setFechaEmision(Date fechaEmision) {
        this.fechaEmision = fechaEmision;
    }

    public String getMoneda() {
        return moneda;
    }

    public void setMoneda(String moneda) {
        this.moneda = moneda;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getNombrePersona() {
        return nombrePersona;
    }

    public void setNombrePersona(String nombrePersona) {
        this.nombrePersona = nombrePersona;
    }
}
