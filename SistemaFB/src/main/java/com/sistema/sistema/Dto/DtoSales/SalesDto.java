package com.sistema.sistema.Dto.DtoSales;

import com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto;

import java.math.BigDecimal;
import java.util.List;

public class SalesDto {
    private Long idPerson;
    private BigDecimal valorTotal;
    private BigDecimal valorRegularizado;
    private BigDecimal valorPendiente;
    private String observaciones;
    private List<ItemsSalesDto> items;
    private List<MovimientosDeCajasDto> caja;

    public SalesDto(){

    }

    public SalesDto( Long idPerson, BigDecimal valorTotal, BigDecimal valorRegularizado, BigDecimal valorPendiente, String observaciones){
        this.idPerson = idPerson;
        this.valorTotal = valorTotal;
        this.valorPendiente = valorPendiente;
        this.valorRegularizado = valorRegularizado;
        this.observaciones = observaciones;
    }

    public List<MovimientosDeCajasDto> getCaja() {
        return caja;
    }

    public void setCaja(List<MovimientosDeCajasDto> caja) {
        this.caja = caja;
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

    public List<ItemsSalesDto> getItems() {
        return items;
    }

    public void setItems(List<ItemsSalesDto> items) {
        this.items = items;
    }
}
