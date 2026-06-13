package com.sistema.sistema.Domain.ResgistroFinanciero;

import com.sistema.sistema.Domain.Cajas.MovimientoDeCaja;
import com.sistema.sistema.Domain.Person.Person;
import com.sistema.sistema.Service.Enum.Moneda;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
@Entity
@Table(name = "registro_financiero ")
public class RegistroFinanciero {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private BigDecimal valor;
    private LocalDate fechaEmison;
    private String observacion;
    private Boolean contado;
    private String tipoOperacion;
    @Enumerated(EnumType.STRING)
    private Moneda moneda;
    @ManyToOne
    @JoinColumn(name = "id_person")
    private Person person;
    @OneToMany(mappedBy = "registroFinanciero")
    private List<MovimientoDeCaja> movimientosCaja;
    private Boolean activo;

    public RegistroFinanciero(){

    }

    public RegistroFinanciero(BigDecimal valor, LocalDate fechaEmison, String observacion, Boolean contado, String tipoOperacion, Moneda moneda) {
        this.valor = valor;
        this.fechaEmison = fechaEmison;
        this.observacion = observacion;
        this.contado = contado;
        this.tipoOperacion = tipoOperacion;
        this.moneda = moneda;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public LocalDate getFechaEmison() {
        return fechaEmison;
    }

    public void setFechaEmison(LocalDate fechaEmison) {
        this.fechaEmison = fechaEmison;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public Boolean getContado() {
        return contado;
    }

    public void setContado(Boolean contado) {
        this.contado = contado;
    }

    public String getTipoOperacion() {
        return tipoOperacion;
    }

    public void setTipoOperacion(String tipoOperacion) {
        this.tipoOperacion = tipoOperacion;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }

    public List<MovimientoDeCaja> getMovimientosCaja() {
        return movimientosCaja;
    }

    public void setMovimientosCaja(List<MovimientoDeCaja> movimientosCaja) {
        this.movimientosCaja = movimientosCaja;
    }
}
