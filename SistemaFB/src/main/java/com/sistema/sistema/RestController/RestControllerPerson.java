package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.DtoPerson.PersonDtoGet;
import com.sistema.sistema.Dto.DtoPerson.PersonDtoPost;
import com.sistema.sistema.Dto.DtoPerson.PersonDtoUpdate;
import com.sistema.sistema.Service.PersonService.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class RestControllerPerson {

    private final PersonService personService;

    public RestControllerPerson(PersonService personService) {
        this.personService = personService;
    }

    @PreAuthorize("hasAuthority('Dashboard clientes activos')")
    @GetMapping("/personactivos")
    public Long getCountPersonActive(){
        return personService.getCountPerson();
    }

    @PreAuthorize("hasAuthority('Ver todos los clientes')")
    @GetMapping("/personas")
    public List<PersonDtoGet> getPerson(){
        return personService.getPerson();
    }

    @PreAuthorize("hasAuthority('Agregar nuevo cliente')")
    @PostMapping("/addPerson")
    public ResponseEntity<Map<String, Object>> postPerson(@RequestBody PersonDtoPost persondto){
        return personService.postPerson(persondto);
    }

    @PreAuthorize("hasAuthority('Editar datos del cliente')")
    @PatchMapping("/updatePerson/{id}")
    public ResponseEntity<?> updatePerson(@PathVariable Long id, @RequestBody PersonDtoUpdate persondto){
        return personService.updatePerson(id,persondto);
    }
}