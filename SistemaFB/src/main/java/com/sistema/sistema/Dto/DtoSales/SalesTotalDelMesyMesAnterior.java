package com.sistema.sistema.Dto.DtoSales;

import java.math.BigDecimal;

public class SalesTotalDelMesyMesAnterior {
    private BigDecimal totalVentaMesActual;
    private BigDecimal totalVentaMesAnterior;
    private BigDecimal porcentaje;
    private Boolean subio;


    public SalesTotalDelMesyMesAnterior(){

    }

    public SalesTotalDelMesyMesAnterior(BigDecimal totalVentaMesActual, BigDecimal totalVentaMesAnterior, BigDecimal porcentaje, Boolean subio) {
        this.totalVentaMesActual = totalVentaMesActual;
        this.totalVentaMesAnterior = totalVentaMesAnterior;
        this.porcentaje = porcentaje;
        this.subio = subio;
    }

    public BigDecimal getTotalVentaMesAnterior() {
        return totalVentaMesAnterior;
    }

    public BigDecimal getPorcentaje() {
        return porcentaje;
    }

    public void setPorcentaje(BigDecimal porcentaje) {
        this.porcentaje = porcentaje;
    }

    public Boolean getSubio() {
        return subio;
    }

    public void setSubio(Boolean subio) {
        this.subio = subio;
    }

    public void setTotalVentaMesAnterior(BigDecimal totalVentaMesAnterior) {
        this.totalVentaMesAnterior = totalVentaMesAnterior;
    }

    public BigDecimal getTotalVentaMesActual() {
        return totalVentaMesActual;
    }

    public void setTotalVentaMesActual(BigDecimal totalVentaMesActual) {
        this.totalVentaMesActual = totalVentaMesActual;
    }
}
