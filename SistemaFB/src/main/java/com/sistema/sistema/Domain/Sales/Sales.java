package com.sistema.sistema.Domain.Sales;

import com.sistema.sistema.Domain.Person.Person;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "ventas")
public class Sales {
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

    public Sales(){

    }

    public Sales(Person person, BigDecimal valorTotal, BigDecimal valorRegularizado, BigDecimal valorPendiente, String observaciones){
        this.person = person;
        this.valorTotal = valorTotal;
        this.valorPendiente = valorPendiente;
        this.valorRegularizado = valorRegularizado;
        this.observaciones = observaciones;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}
