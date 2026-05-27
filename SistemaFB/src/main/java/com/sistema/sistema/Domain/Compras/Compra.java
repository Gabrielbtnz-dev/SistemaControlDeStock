package com.sistema.sistema.Domain.Compras;

import com.sistema.sistema.Domain.Cajas.MovimientoDeCaja;
import com.sistema.sistema.Domain.Person.Person;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "compras")
public class Compra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "id_person")
    private Person person;
    @Column(name = "valor_total")
    private BigDecimal valorTotal;
    @Column(name = "valor_regularizado")
    private BigDecimal valorRegularizado;
    @Column(name = "valor_pendiente")
    private BigDecimal valorPendiente;
    private String observaciones;
    @OneToMany(mappedBy = "compra", cascade = CascadeType.ALL)
    private List<ItemCompras> items;
    @OneToMany(mappedBy = "compra")
    private List<MovimientoDeCaja> movimientosCaja;
    private Boolean activo;


    public Compra(){

    }

    public Compra(Person person, BigDecimal valorTotal, BigDecimal valorRegularizado, BigDecimal valorPendiente, String observaciones, Boolean activo){
        this.person = person;
        this.valorTotal = valorTotal;
        this.valorPendiente = valorPendiente;
        this.valorRegularizado = valorRegularizado;
        this.observaciones = observaciones;
        this.activo = activo;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
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

    public List<ItemCompras> getItems() {
        return items;
    }

    public void setItems(List<ItemCompras> items) {
        this.items = items;
    }

    public List<MovimientoDeCaja> getMovimientosCaja() {
        return movimientosCaja;
    }

    public void setMovimientosCaja(List<MovimientoDeCaja> movimientosCaja) {
        this.movimientosCaja = movimientosCaja;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}
