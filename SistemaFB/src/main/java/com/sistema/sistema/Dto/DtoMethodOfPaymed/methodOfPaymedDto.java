package com.sistema.sistema.Dto.DtoMethodOfPaymed;

import com.sistema.sistema.Service.Moneda;

public class methodOfPaymedDto {

    private Long id;
    private String name;
    private Moneda moneda;

    public methodOfPaymedDto(){

    }

    public methodOfPaymedDto( Long id, String name, Moneda moneda){
        this.id = id;
        this.name = name;
        this.moneda = moneda;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }
}
