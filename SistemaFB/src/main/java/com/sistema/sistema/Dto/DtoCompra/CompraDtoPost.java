package com.sistema.sistema.Dto.DtoCompra;

import com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto;
import com.sistema.sistema.Dto.DtoSales.ItemsSalesDto;

import java.math.BigDecimal;
import java.util.List;

public class CompraDtoPost {

    private Long idPerson;
    private BigDecimal valorTotal;
    private BigDecimal valorRegularizado;
    private BigDecimal valorPendiente;
    private String observaciones;
    private List<ItemsCompraPost> items;
    private List<MovimientosDeCajasDto> caja;
    private String namePerson;
    private Boolean activo;

    public CompraDtoPost(){

    }

    public CompraDtoPost( Long idPerson, BigDecimal valorTotal, BigDecimal valorRegularizado, BigDecimal valorPendiente, String observaciones,String namePerson,Boolean activo){
        this.idPerson = idPerson;
        this.valorTotal = valorTotal;
        this.valorPendiente = valorPendiente;
        this.valorRegularizado = valorRegularizado;
        this.observaciones = observaciones;
        this.namePerson = namePerson;
        this.activo = activo;

    }

    public List<ItemsCompraPost> getItems() {
        return items;
    }

    public void setItems(List<ItemsCompraPost> items) {
        this.items = items;
    }

    public Long getIdPerson() {
        return idPerson;
    }

    public void setIdPerson(Long idPerson) {
        this.idPerson = idPerson;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
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

    public List<MovimientosDeCajasDto> getCaja() {
        return caja;
    }

    public void setCaja(List<MovimientosDeCajasDto> caja) {
        this.caja = caja;
    }

    public String getNamePerson() {
        return namePerson;
    }

    public void setNamePerson(String namePerson) {
        this.namePerson = namePerson;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}
