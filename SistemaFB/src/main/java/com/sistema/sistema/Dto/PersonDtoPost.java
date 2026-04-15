package com.sistema.sistema.Dto;
public class PersonDtoPost {
    private String nombre;
    private String documento;
    private String digitoVerificador;
    private Boolean funcionario;
    private Boolean cliente;
    private Boolean contribuyente;

    public PersonDtoPost(){
    };


    public PersonDtoPost(String nombre, String documento, String digitoVerificador, Boolean funcionario, Boolean cliente, Boolean contribuyente){

        this.nombre = nombre;
        this.documento = documento;
        this.digitoVerificador = digitoVerificador;
        this.funcionario = funcionario;
        this.cliente = cliente;
        this.contribuyente = contribuyente;
    }


    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getDigitoVerificador() {
        return digitoVerificador;
    }

    public void setDigitoVerificador(String digitoVerificador) {
        this.digitoVerificador = digitoVerificador;
    }

    public Boolean getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Boolean funcionario) {
        this.funcionario = funcionario;
    }

    public Boolean getCliente() {
        return cliente;
    }

    public void setCliente(Boolean cliente) {
        this.cliente = cliente;
    }

    public Boolean getContribuyente() {
        return contribuyente;
    }

    public void setContribuyente(Boolean contribuyente) {
        this.contribuyente = contribuyente;
    }
}
