package com.sistema.sistema.Domain.Cajas;

import com.sistema.sistema.Domain.Compras.Compra;
import com.sistema.sistema.Domain.Sales.Sales;
import com.sistema.sistema.Service.Enum.Moneda;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "movimiento_caja")
public class MovimientoDeCaja {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "id_ventas")
    private Sales venta;
    @ManyToOne
    @JoinColumn(name = "id_caja")
    private Cajas caja;
    @Column(name = "tipo_movimiento")
    private String tipoMovimiento;
    private BigDecimal monto;
    @Enumerated(EnumType.STRING)
    private Moneda moneda;
    private String descripcion;
    private LocalDateTime fecha;
    @ManyToOne
    @JoinColumn(name = "id_compra")
    private Compra compra;

    public MovimientoDeCaja(){

    }

    public MovimientoDeCaja(Sales venta, Cajas caja, String tipoMovimiento, BigDecimal monto, Moneda moneda, String descripcion, LocalDateTime fecha){
        this.venta = venta;
        this.caja = caja;
        this.tipoMovimiento = tipoMovimiento;
        this.monto = monto;
        this.moneda = moneda;
        this.descripcion = descripcion;
        this.fecha = fecha;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Sales getVenta() {
        return venta;
    }

    public void setVenta(Sales venta) {
        this.venta = venta;
    }

    public Cajas getCaja() {
        return caja;
    }

    public void setCaja(Cajas caja) {
        this.caja = caja;
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
