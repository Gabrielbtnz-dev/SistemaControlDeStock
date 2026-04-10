package com.sistema.sistema.Domain;

import jakarta.persistence.*;

@Entity
@Table(name="person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nombre;
    private String documento;
    @Column(name="digitoverificador")
    private String digitoVerificador;
    private Boolean funcionario;
    private Boolean cliente;
    private Boolean contribuyente;
    private Boolean activo;

    public Person(){
    }

    public Person(String nombre, String documento, String digitoVerificador, Boolean funcionario, Boolean cliente, Boolean contribuyente, Boolean activo){

        this.nombre = nombre;
        this.documento = documento;
        this.digitoVerificador = digitoVerificador;
        this.funcionario = funcionario;
        this.cliente = cliente;
        this.contribuyente = contribuyente;
        this.activo = activo;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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

    public Boolean getContribuyente() {
        return contribuyente;
    }

    public void setContribuyente(Boolean contribuyente) {
        this.contribuyente = contribuyente;
    }

    public Boolean getCliente() {
        return cliente;
    }

    public void setCliente(Boolean cliente) {
        this.cliente = cliente;
    }
}
