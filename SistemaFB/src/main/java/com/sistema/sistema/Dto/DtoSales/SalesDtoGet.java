package com.sistema.sistema.Dto.DtoSales;

import com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto;

import java.math.BigDecimal;
import java.util.List;

public class SalesDtoGet {
    private Long idPerson;
    private BigDecimal valorTotal;
    private BigDecimal valorRegularizado;
    private BigDecimal valorPendiente;
    private String observaciones;
    private String namePerson;
    private Long idVenta;
    private Boolean activo;

    public SalesDtoGet(){

    }

    public SalesDtoGet(Long idPerson, BigDecimal valorTotal, BigDecimal valorRegularizado, BigDecimal valorPendiente, String observaciones, String namePerson,Long idVenta, Boolean activo){
        this.idPerson = idPerson;
        this.valorTotal = valorTotal;
        this.valorPendiente = valorPendiente;
        this.valorRegularizado = valorRegularizado;
        this.observaciones = observaciones;
        this.namePerson = namePerson;
        this.idVenta = idVenta;
        this.activo = activo;

    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Long getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(Long idVenta) {
        this.idVenta = idVenta;
    }

    public String getNamePerson() {
        return namePerson;
    }

    public void setNamePerson(String namePerson) {
        this.namePerson = namePerson;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public Long getIdPerson() {
        return idPerson;
    }

    public void setIdPerson(Long idPerson) {
        this.idPerson = idPerson;
    }

    public BigDecimal getValorRegularizado() {
        return valorRegularizado;
    }

    public void setValorRegularizado(BigDecimal valorRegularizado) {
        this.valorRegularizado = valorRegularizado;
    }

    public BigDecimal getValorPendiente() {
        return valorPendiente;
    }

    public void setValorPendiente(BigDecimal valorPendiente) {
        this.valorPendiente = valorPendiente;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

}
