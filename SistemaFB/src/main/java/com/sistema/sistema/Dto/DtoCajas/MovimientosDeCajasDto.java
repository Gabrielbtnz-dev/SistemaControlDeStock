package com.sistema.sistema.Dto.DtoCajas;

import com.sistema.sistema.Domain.Cajas.Cajas;
import com.sistema.sistema.Domain.Sales.Sales;
import com.sistema.sistema.Service.Moneda;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class MovimientosDeCajasDto {

    private String tipoMovimiento;
    private BigDecimal monto;
    private Moneda moneda;
    private String descripcion;
    private LocalDateTime fecha;

    public MovimientosDeCajasDto(){

    }

    public MovimientosDeCajasDto(Sales venta, Cajas caja, String tipoMovimiento, BigDecimal monto, Moneda moneda, String descripcion, LocalDateTime fecha){
        this.tipoMovimiento = tipoMovimiento;
        this.monto = monto;
        this.moneda = moneda;
        this.descripcion = descripcion;
        this.fecha = fecha;

    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

    public String getTipoMovimiento() {
        return tipoMovimiento;
    }

    public void setTipoMovimiento(String tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
    }
}
