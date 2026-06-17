package com.sistema.sistema.Dto.DtoCompra;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class ComprasDetalladasDto {

    private Long idPerson;
    private BigDecimal valorTotal;
    private BigDecimal valorRegularizado;
    private BigDecimal valorPendiente;
    private String observaciones;
    private String namePerson;
    private Long idCompra;
    private Boolean activo;
    private LocalDateTime createdAt;
    private String documento;
    private String digitoVerificador;
    private List<ItemsCompraDetalladasDto> items;

    public ComprasDetalladasDto(){

    }


    public ComprasDetalladasDto(Long idPerson, BigDecimal valorTotal, BigDecimal valorRegularizado, BigDecimal valorPendiente, String observaciones, String namePerson, Long idCompra, Boolean activo, LocalDateTime createdAt, String documento, String digitoVerificador) {
        this.idPerson = idPerson;
        this.valorTotal = valorTotal;
        this.valorRegularizado = valorRegularizado;
        this.valorPendiente = valorPendiente;
        this.observaciones = observaciones;
        this.namePerson = namePerson;
        this.idCompra = idCompra;
        this.activo = activo;
        this.createdAt = createdAt;
        this.documento = documento;
        this.digitoVerificador = digitoVerificador;
    }
/*sistema pasa a ser comercial*/
    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getDigitoVerificador() {
        return digitoVerificador;
    }

    public void setDigitoVerificador(String digitoVerificador) {
        this.digitoVerificador = digitoVerificador;
    }

    public List<ItemsCompraDetalladasDto> getItems() {
        return items;
    }

    public void setItems(List<ItemsCompraDetalladasDto> items) {
        this.items = items;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Long getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(Long idCompra) {
        this.idCompra = idCompra;
    }

    public String getNamePerson() {
        return namePerson;
    }

    public void setNamePerson(String namePerson) {
        this.namePerson = namePerson;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public BigDecimal getValorPendiente() {
        return valorPendiente;
    }

    public void setValorPendiente(BigDecimal valorPendiente) {
        this.valorPendiente = valorPendiente;
    }

    public BigDecimal getValorRegularizado() {
        return valorRegularizado;
    }

    public void setValorRegularizado(BigDecimal valorRegularizado) {
        this.valorRegularizado = valorRegularizado;
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
}
