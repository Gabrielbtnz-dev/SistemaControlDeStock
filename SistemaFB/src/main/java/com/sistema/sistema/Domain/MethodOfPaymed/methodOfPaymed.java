package com.sistema.sistema.Domain.MethodOfPaymed;

import com.sistema.sistema.Service.Moneda;
import jakarta.persistence.*;

@Entity
@Table (name = "tipo_cobro_pago")
public class methodOfPaymed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @Enumerated(EnumType.STRING)
    private Moneda moneda;

    public methodOfPaymed(){

    }
 
    public methodOfPaymed(String name, Moneda moneda){
        this.name = name;
        this.moneda = moneda;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
