package com.sistema.sistema.Dto;

public class PersonDtoUpdate {

    private Boolean activo;
    private Long id;

    public PersonDtoUpdate(){};

    public PersonDtoUpdate(Boolean activo , Long id){
        this.activo = activo;
        this.id = id;
    };

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}
