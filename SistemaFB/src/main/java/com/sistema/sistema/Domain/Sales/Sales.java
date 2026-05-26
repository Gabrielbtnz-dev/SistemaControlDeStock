package com.sistema.sistema.Domain.Sales;

import com.sistema.sistema.Domain.Cajas.MovimientoDeCaja;
import com.sistema.sistema.Domain.Person.Person;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

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
    @OneToMany(mappedBy = "sales", cascade = CascadeType.ALL)
    private List<ItemsSales> items;
    @OneToMany(mappedBy = "venta")
    private List<MovimientoDeCaja> movimientosCaja;
    private Boolean activo;

    public Sales(){

    }

    public Sales(Person person, BigDecimal valorTotal, BigDecimal valorRegularizado, BigDecimal valorPendiente, String observaciones, Boolean activo){
        this.person = person;
        this.valorTotal = valorTotal;
        this.valorPendiente = valorPendiente;
        this.valorRegularizado = valorRegularizado;
        this.observaciones = observaciones;
        this.activo = activo;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
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

    public List<ItemsSales> getItems() {
        return items;
    }

    public void setItems(List<ItemsSales> items) {
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
