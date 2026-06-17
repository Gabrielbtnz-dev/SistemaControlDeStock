package com.sistema.sistema.Dto.DtoSales;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class SalesDocumentoDto {
    private Long id;

    private BigDecimal valorTotal;
    private BigDecimal valorRegularizado;
    private BigDecimal valorPendiente;

    private String observaciones;
    private Boolean activo;
    private LocalDateTime createdAt;

    private Long personId;
    private String nombre;
    private String documento;
    private Boolean funcionario;
    private Boolean cliente;
    private Boolean contribuyente;
    private String digitoVerificador;
    private List<ItemsSalesDto> items;

    public SalesDocumentoDto(){

    }


    public SalesDocumentoDto(
            Long id,
            BigDecimal valorTotal,
            BigDecimal valorRegularizado,
            BigDecimal valorPendiente,
            String observaciones,
            Boolean activo,
            LocalDateTime createdAt,
            Long personId,
            String nombre,
            String documento,
            Boolean funcionario,
            Boolean cliente,
            Boolean contribuyente,
            String digitoVerificador
    ) {
        this.id = id;
        this.valorTotal = valorTotal;
        this.valorRegularizado = valorRegularizado;
        this.valorPendiente = valorPendiente;
        this.observaciones = observaciones;
        this.activo = activo;
        this.createdAt = createdAt;
        this.personId = personId;
        this.nombre = nombre;
        this.documento = documento;
        this.funcionario = funcionario;
        this.cliente = cliente;
        this.contribuyente = contribuyente;
        this.digitoVerificador = digitoVerificador;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public List<ItemsSalesDto> getItems() {
        return items;
    }

    public void setItems(List<ItemsSalesDto> items) {
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public Boolean getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Boolean funcionario) {
        this.funcionario = funcionario;
    }

    public Boolean getCliente() {
        return cliente;
    }

    public void setCliente(Boolean cliente) {
        this.cliente = cliente;
    }

    public Boolean getContribuyente() {
        return contribuyente;
    }

    public void setContribuyente(Boolean contribuyente) {
        this.contribuyente = contribuyente;
    }

    public String getDigitoVerificador() {
        return digitoVerificador;
    }

    public void setDigitoVerificador(String digitoVerificador) {
        this.digitoVerificador = digitoVerificador;
    }
}
