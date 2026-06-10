package com.sistema.sistema.Dto.DtoRegistroFinanciero;

import com.sistema.sistema.Domain.Cajas.MovimientoDeCaja;
import com.sistema.sistema.Domain.Person.Person;
import com.sistema.sistema.Dto.DtoCajas.MovimientosDeCajasDto;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public class RegistroFinancieroDtoPost {

    private long id;
    private BigDecimal valor;
    private Date fechaEmison;
    private String observacion;
    private Boolean contado;
    private String tipoOperacion;
    private String moneda;
    private Long idPerson;
    private List<MovimientosDeCajasDto> movimientoCajas;

    public RegistroFinancieroDtoPost(){

    }

    public RegistroFinancieroDtoPost(long id, BigDecimal valor, Date fechaEmison, String observacion, Boolean contado, String tipoOperacion, String moneda, Long idPerson, List<MovimientosDeCajasDto> movimientoCajas) {
        this.id = id;
        this.valor = valor;
        this.fechaEmison = fechaEmison;
        this.observacion = observacion;
        this.contado = contado;
        this.tipoOperacion = tipoOperacion;
        this.moneda = moneda;
        this.movimientoCajas = movimientoCajas;
    }

    public List<MovimientosDeCajasDto> getMovimientoCajas() {
        return movimientoCajas;
    }

    public void setMovimientoCajas(List<MovimientosDeCajasDto> movimientoCajas) {
        this.movimientoCajas = movimientoCajas;
    }

    public Long getIdPerson() {
        return idPerson;
    }

    public void setIdPerson(Long idPerson) {
        this.idPerson = idPerson;
    }

    public String getMoneda() {
        return moneda;
    }

    public void setMoneda(String moneda) {
        this.moneda = moneda;
    }

    public String getTipoOperacion() {
        return tipoOperacion;
    }

    public void setTipoOperacion(String tipoOperacion) {
        this.tipoOperacion = tipoOperacion;
    }

    public Boolean getContado() {
        return contado;
    }

    public void setContado(Boolean contado) {
        this.contado = contado;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public Date getFechaEmison() {
        return fechaEmison;
    }

    public void setFechaEmison(Date fechaEmison) {
        this.fechaEmison = fechaEmison;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
