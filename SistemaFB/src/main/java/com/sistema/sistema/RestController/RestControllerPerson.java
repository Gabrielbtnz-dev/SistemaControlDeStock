package com.sistema.sistema.RestController;

import com.sistema.sistema.Dto.PersonDtoGet;
import com.sistema.sistema.Dto.PersonDtoPost;
import com.sistema.sistema.Dto.PersonDtoUpdate;
import com.sistema.sistema.Service.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class RestControllerPerson {

    private final PersonService personService;

    public RestControllerPerson(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping("/personas")
    public List<PersonDtoGet> getPerson(){
        return personService.getPerson();
    }

    @PostMapping("/addPerson")
    public ResponseEntity<Map<String, Object>> postPerson(@RequestBody PersonDtoPost persondto){
        return personService.postPerson(persondto);
    }

    @PatchMapping("/updatePerson/{id}")
    public ResponseEntity<?> updatePerson(@PathVariable Long id, @RequestBody PersonDtoUpdate persondto){
        return personService.updatePerson(id,persondto);
    }
}