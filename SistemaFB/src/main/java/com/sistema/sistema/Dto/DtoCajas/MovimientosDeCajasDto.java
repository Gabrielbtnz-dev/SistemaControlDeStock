package com.sistema.sistema.Dto.DtoCajas;

import com.sistema.sistema.Service.Enum.Moneda;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class MovimientosDeCajasDto {

    private Long idCaja;
    private String tipoMovimiento;
    private BigDecimal monto;
    private Moneda moneda;
    private String descripcion;
    private LocalDateTime fecha;
    private String nombreCaja;
    private Long idVenta;
    private Long idCompra;
    private Long idRegistroFinanciero;

    public MovimientosDeCajasDto() {}

    public MovimientosDeCajasDto(Long idCaja,
                                 String tipoMovimiento,
                                 BigDecimal monto,
                                 Moneda moneda,
                                 String descripcion,
                                 LocalDateTime fecha,
                                 String nombreCaja,
                                 Long idVenta,
                                 Long idCompra, Long idRegistroFinanciero) {
        this.idCaja = idCaja;
        this.tipoMovimiento = tipoMovimiento;
        this.monto = monto;
        this.moneda = moneda;
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.nombreCaja = nombreCaja;
        this.idVenta = idVenta;
        this.idCompra = idCompra;
        this.idRegistroFinanciero = idRegistroFinanciero;
    }

    public Long getIdRegistroFinanciero() {
        return idRegistroFinanciero;
    }

    public void setIdRegistroFinanciero(Long idRegistroFinanciero) {
        this.idRegistroFinanciero = idRegistroFinanciero;
    }

    public Long getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(Long idCompra) {
        this.idCompra = idCompra;
    }

    public Long getIdVenta() {
        return idVenta;
    }

    public void setIdVenta(Long idVenta) {
        this.idVenta = idVenta;
    }

    public String getNombreCaja() {
        return nombreCaja;
    }

    public void setNombreCaja(String nombreCaja) {
        this.nombreCaja = nombreCaja;
    }

    public Long getIdCaja() {
        return idCaja;
    }

    public void setIdCaja(Long idCaja) {
        this.idCaja = idCaja;
    }

    public String getTipoMovimiento() {
        return tipoMovimiento;
    }

    public void setTipoMovimiento(String tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
    }

    public BigDecimal getMonto() {
        return monto;
    }

    public void setMonto(BigDecimal monto) {
        this.monto = monto;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}
